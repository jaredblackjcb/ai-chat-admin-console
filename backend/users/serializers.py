from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import CustomUser

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Override the validate method to add additional data to the api token
    def validate(self, attrs):
        # generates refresh and access values
        data = super().validate(attrs)
        # custom fields to return
        # data['username'] = self.user.username
        # data['email'] = self.user.email
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Encode custom claims into the JWT tokens
        # token['customField'] = user.customField #must be a JSON serializable type
        token['username'] = user.username
        # ...
        return token

# Determines the data that is sent back from the api/users/profile endpoint
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['password']

# Used in the CustomTokenObtainPairSerializer to add another token to the response data
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = CustomUser
        # fields = '__all__'
        exclude = ['password']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)