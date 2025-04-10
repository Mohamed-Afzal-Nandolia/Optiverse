from django.db import models
from .accounts.models import User
# Create your models here.

class Posts(models.Model):
    p_id = models.BigAutoField(primary_key=True)
    p_date = models.DateTimeField(auto_now_add=True)
    p_like = models.IntegerField(default=0)
    p_post = models.TextField()
    p_share = models.IntegerField(default=0)
    p_tag = models.CharField(max_length=100, blank=True, null=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
