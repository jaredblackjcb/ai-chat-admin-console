from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Namespace, File, FileNamespace
from .pinecone_utils import PineconeUtils

# Create your views here.
@api_view(['POST'])
@parser_classes([MultiPartParser])
# @permission_classes([IsAuthenticated])
def encode_files(request):
    try:
        headers = request.headers
        user_id = request.headers['userId']
        namespace = headers['namespace']

        files = request.FILES
        file_names = [file.name for file in files.values()]
            
        # Insert the file names and namespaces into the database
        namespace, created = Namespace.objects.get_or_create(user_id=user_id, namespace=namespace)
        created_files = []
        for file_name in file_names:
            file, created = File.objects.get_or_create(user_id=user_id, file_name=file_name)
            created_files.append(file)
        for file in created_files:
            FileNamespace.objects.get_or_create(file=file, namespace=namespace)
        # Process the list of uploaded files here
        # Each file in 'files' is accessible like a regular file upload:
        pinecone_utils = PineconeUtils(namespace=(namespace + user_id))

        # Convert documents to vectors and upload to pinecone index
        pinecone_utils.encode_documents(files.values())
    except:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_201_CREATED)
