from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .pinecone_utils import PineconeUtils

# Create your views here.
@api_view(['POST'])
@parser_classes([MultiPartParser])
# @permission_classes([IsAuthenticated])
def encode_files(request):
    headers = request.headers
    namespace = headers['namespace']

    files = request.FILES
    # Process the list of uploaded files here
    # Each file in 'files' is accessible like a regular file upload:
    pinecone_utils = PineconeUtils(namespace=namespace)

    # Convert documents to vectors and upload to pinecone index
    pinecone_utils.encode_documents(files.values())
        
    return Response({'message': f'{len(files)} files uploaded successfully'})
