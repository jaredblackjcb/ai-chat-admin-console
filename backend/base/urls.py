from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('routes/', views.getRoutes, name='routes'),
    path('landing/', TemplateView.as_view(template_name="screens/landing.html"), name='landing'),
]