from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Override the validate method to add additional data to the api token
    def validate(self, attrs):
        # generates refresh and access values
        data = super().validate(attrs)
        # custom fields to return
        data['username'] = self.user.username
        data['email'] = self.user.email
        return data
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Encode custom claims into the JWT tokens
        # token['customField'] = user.customField #must be a JSON serializable type
        token['username'] = user.username
        # ...

        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')