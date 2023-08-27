from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Bot, File
from .pinecone_utils import PineconeUtils
from .serializers import BotSerializer, FileSerializer

# Creates a chatbot entity using the user_id and title
@api_view(['POST'])
def create_bot(request):
    user_id = request.headers['userId']
    title = request.data['title']
    try:
        bot_inserted, created = Bot.objects.get_or_create(user_id=user_id, title=title)
    except:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(status=status.HTTP_201_CREATED)

# Returns a list of all chatbots associated with a user
@api_view(['GET'])
def get_bots(request):
    user_id = request.headers['userId']
    try:
        bots = list(Bot.objects.filter(user_id=user_id))
        serializer = BotSerializer(bots, many=True)
    except:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(serializer.data)

# Encodes the files uploaded to the chatbot and stores the vectors in pinecone
# Metadata about the files is stored in postgres
# TODO: Files are stored in an aws s3 bucket
@api_view(['POST'])
@parser_classes([MultiPartParser]) # parses 'multipart/form-data' content like file uploads
# @permission_classes([IsAuthenticated])
def encode_files(request):
    try:
        headers = request.headers
        # namespace is a uuid generated in Bot table when a bot is created
        namespace = headers['namespace']
        bot_id = headers['botId']

        files = request.FILES
        file_names = [file.name for file in files.values()]

        # TODO: Upload files to s3 bucket and get the url locations to pass to the get_or_create method
            
        # Insert the file names and namespaces into the database
        created_files = []
        for file_name in file_names:
            file_inserted, created = File.objects.get_or_create(bot_id=bot_id, file_name=file_name)

        # Process the list of uploaded files
        # Use bot_id as the namespace for pinecone since it is unique
        pinecone_utils = PineconeUtils(bot_id=bot_id, namespace=namespace)

        # Convert documents to vectors and upload to pinecone index
        pinecone_utils.encode_documents(files.values())
    except:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_201_CREATED)

# Returns files associated with a chatbot
@api_view(['GET'])
def get_data_sources(request, bot_id):
    files = list(File.objects.filter(bot_id=bot_id))
    serializer = FileSerializer(files, many=True)
    response = {'files': serializer.data}
    return Response(response)

# Deletes a data source from a chatbot in postgres and pinecone
# TODO: Delete from s3 bucket if it is a file
@api_view(['DELETE'])
def delete_data_source(request, bot_id, file_name):
    bot_id = str(bot_id) # convert to string since it comes in url params as an int
    namespace = request.headers['namespace']
    try:
        # Delete the vector data from Pinecone
        pinecone_utils = PineconeUtils(bot_id=bot_id, namespace=namespace)
        pinecone_utils.delete_data_source(file_name)
        # Delete the reference to the data source from Postgres
        File.objects.filter(
            bot_id=bot_id, file_name=file_name).delete()
    except:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(status=status.HTTP_202_ACCEPTED)
