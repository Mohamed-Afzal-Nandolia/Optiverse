from django.urls import path
from .views import create_post, get_all_post

urlpatterns = [
    path('create-post/', create_post, name='create_post'),
    path('get_all_post/', get_all_post, name='get_all_post')
]