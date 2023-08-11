from rest_framework import serializers
from .models import ChatDataSource

class ChatDataSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatDataSource
        fields = '__all__'