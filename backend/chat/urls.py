from django.urls import path
from .views import encode_files

urlpatterns = [
    path('encode/files', encode_files, name="encode_files"),
]