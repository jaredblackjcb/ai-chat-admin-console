from django.urls import path
from subscriptions import views
urlpatterns = [
    path("test-payment/", views.test_payment),
]