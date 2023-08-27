from django.urls import path
from . import views

urlpatterns = [
    path('create/bot', views.create_bot, name="create_bot"),
    path('bots', views.get_bots, name="get_bots"),
    path('encode/files', views.encode_files, name="encode_files"),
    path('dataSources/<int:bot_id>', views.get_data_sources, name="get_data_sources"),
    path('bot/<int:bot_id>/file/<str:file_name>/delete', views.delete_data_source, name="delete_data_source"),
]