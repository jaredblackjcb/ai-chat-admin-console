from django.urls import path
from . import views

urlpatterns = [
     path('login/', views.CustomTokenObtainPairView.as_view(), name='auth_token'),
     path('register/', views.registerUser, name='register_user'),
     path('profile/', views.getUserProfile, name='user_profile'),
     path('all/', views.getAllUsers, name='all_users'),
     path('google-auth/', views.googleAuth, name='google_auth'),
]