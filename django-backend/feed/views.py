from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from feed.models import Posts
from feed.serializers import PostSerializer
import logging

logger = logging.getLogger('django')
User = get_user_model()

@api_view(['POST'])
def create_post(request):
    logger.info(f"feed/views/create_post <<creating a new post>>")

    try:
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['user'] = user.id  # Optional: you can omit this if your serializer has user=read_only

        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            post = serializer.save(user=user)  # Set user instance here
            logger.info(f"New post created with ID: {post.id}")
            return Response(
                {"message": "Post created successfully", "post_id": post.id},
                status=status.HTTP_201_CREATED
            )
        else:
            logger.warning(f"Validation failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_all_post(request):
    logger.info("feed/views/get_all_post <<Fetching all the post>>")
    
    try:
        logger.info(f"request :: {request.query_params}")
        user_id = request.query_params.get('user')
        if not user_id:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        posts = Posts.objects.all().order_by('-date')  # You can order by latest if needed
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error fetching posts: {str(e)}")
        return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
