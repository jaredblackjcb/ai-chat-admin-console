from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Namespace, File, FileNamespace, ChatDataSource
from .pinecone_utils import PineconeUtils
from .serializers import ChatDataSourceSerializer

# Create your views here.
@api_view(['POST'])
@parser_classes([MultiPartParser])
# @permission_classes([IsAuthenticated])
def encode_files(request):
    try:
        headers = request.headers
        user_id = headers['userId']
        namespace = headers['namespace'] # should not be in headers

        files = request.FILES
        file_names = [file.name for file in files.values()]
            
        # Insert the file names and namespaces into the database
        namespace_inserted, created = Namespace.objects.get_or_create(user_id=user_id, namespace=namespace)
        created_files = []
        for file_name in file_names:
            data_source_inserted, created = ChatDataSource.objects.get_or_create(user_id=user_id, file_name=file_name, namespace=namespace)

        # Process the list of uploaded files
        pinecone_utils = PineconeUtils(user_id=user_id, namespace=namespace)

        # Convert documents to vectors and upload to pinecone index
        pinecone_utils.encode_documents(files.values())
        response = get_user_data_sources(user_id)
    except:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(response)

@api_view(['POST'])
def add_namespaces(request):
    user_id = request.headers['userId']
    namespaces = request.data['namespaces']
    try:
        for namespace in namespaces:
            namespace_inserted, created = Namespace.objects.get_or_create(user_id=user_id, namespace=namespace)
    except:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_data_sources(request, user_id):
    response = get_user_data_sources(user_id)
    return Response(response)

@api_view(['GET'])
def get_namespaces(request, user_id):
    namespaces = Namespace.objects.filter(user_id=user_id).values_list('namespace', flat=True)
    response = {'namespaces': namespaces}
    return Response(response)

@api_view(['DELETE'])
def delete_data_source(request, file_name, namespace):
    user_id = request.headers['userId']
    try:
        # Delete the vector data from Pinecone
        pinecone_utils = PineconeUtils(user_id=user_id, namespace=namespace)
        pinecone_utils.delete_data_source(file_name)
        # Delete the reference to the data source from Postgres
        ChatDataSource.objects.filter(
            user_id=user_id, file_name=file_name, namespace=namespace).delete()
    except:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(status=status.HTTP_202_ACCEPTED)

def get_user_data_sources(user_id):
    data_sources = list(ChatDataSource.objects.filter(user_id=user_id))
    serializer = ChatDataSourceSerializer(data_sources, many=True)
    return {'data_sources': serializer.data}