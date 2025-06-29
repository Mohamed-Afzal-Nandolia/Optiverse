from django.db import models
from django.conf import settings
# Create your models here.

class Posts(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)
    like = models.IntegerField(default=0)
    post = models.TextField()
    share_count = models.IntegerField(default=0)
    tag = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def save(self, *args, **kargs):
        super().save(*args, **kargs)