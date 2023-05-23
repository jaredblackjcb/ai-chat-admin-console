from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests
from .serializers import CustomTokenObtainPairSerializer, UserSerializer, UserSerializerWithToken
from .models import CustomUser
import logging
from emails.send_emails import send_welcome_email

# Create your views here.
logger = logging.getLogger(__name__)

#Login view
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    
    try:
        #Create a user in the database, setting username and email to 'email' and encrypting password
        user = CustomUser.objects.create(
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        logger.info("User registered with email %s" % data['email'])
        try:
            send_welcome_email(data['email'], data['first_name'])
        except:
            logger.error("Welcome email could not be sent for user %s" % data['email'])
    except:
        message = {'detail': 'User with this email address already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def googleAuth(request):
    token = request.data.get('token')

    try:
        # Verify the Google ID token
        id_info = id_token.verify_oauth2_token(token, requests.Request())

        if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Invalid token')

        # Get email from the Google ID token
        email = id_info['email']

        try:
            # Fetch user data from the DB
            user = CustomUser.objects.get(username=email)
        except CustomUser.DoesNotExist:
            # Pass None to generate a random password (required by Django)
            random_password = make_password(None)  
            # Create a new user using the data from the Google ID token
            user, created = CustomUser.objects.get_or_create(username=email, 
                                                         email=email,
                                                         password=random_password,
                                                         first_name=id_info['given_name'],
                                                         last_name=id_info['family_name'])

        # Generate token or perform any additional logic for Google Sign-In
        serializer = UserSerializerWithToken(user)

        # Return the response
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ValueError:
        return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)