from django.urls import path
from .views import login_view, register_view, verify_token

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('verify-token/', verify_token, name='verify-token'),
]