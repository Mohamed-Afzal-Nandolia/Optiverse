from rest_framework import serializers
from feed.models import Posts

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['id', 'like', 'post', 'share_count', 'tag', 'user', 'date']
