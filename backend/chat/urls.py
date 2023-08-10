from django.urls import path
from . import views

urlpatterns = [
    path('encode/files', views.encode_files, name="encode_files"),
    path('dataSources/<uuid:user_id>', views.get_data_sources, name="get_data_sources"),
    path('namespaces/<uuid:user_id>', views.get_namespaces, name="get_namespaces"),
    path('namespaces/add', views.add_namespaces, name="add_namespaces"),
]