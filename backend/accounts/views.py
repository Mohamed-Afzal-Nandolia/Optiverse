from rest_framework_simplejwt.serializers import TokenVerifySerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework import status
from accounts.models import User
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
import phonenumbers
import logging

# Create a logger
logger = logging.getLogger('django')

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_token(request):
    """
    Custom JWT token verification with enhanced response.
    """
    serializer = TokenVerifySerializer(data=request.data)

    try:
        serializer.is_valid(raise_exception=True)

        # Optional: decode the token to get user info
        from rest_framework_simplejwt.tokens import AccessToken
        token_obj = AccessToken(request.data["token"])
        user_id = token_obj["user_id"]
        exp = token_obj["exp"]

        return Response({
            "valid": True,
            "message": "Token is valid",
            "user_id": user_id,
            "expires_at": exp,
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            "valid": False,
            "message": "Token is not valid",
            "error": str(e)
        }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def login_view(request):
    """
    This function allows users to log in using their email or phone number along with a password. 
    If the credentials are valid, it returns a JWT access token and a refresh token.

    To generate JWT Token.
    refresh = RefreshToken.for_user(user)

    .first() ensures we get only one user (avoids multiple results).
    """
    email_or_phone = request.data.get('email_or_phone')
    password = request.data.get('password')

    logger.info(f"Login attempt with email/phone: {email_or_phone}")
    logger.info(f"Login attempt with password: {password}")
    
    user = User.objects.filter(email=email_or_phone).first() or User.objects.filter(phone=email_or_phone).first()

    if user:
        logger.info(f"User found: {user.email}")

    if user and user.check_password(password):
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login Successful",
            "token": str(refresh.access_token),
            "refresh": str(refresh),
        }, status = status.HTTP_200_OK)
    
    return Response({"error": "Invalid credentials"}, status.HTTP_400_BAD_REQUEST)

def validate_user_data(email, phone, password):
    """Validates email, phone, and password. Returns None if all are valid, otherwise an error message."""
    try:
        # Validate Email
        validate_email(email)

        # Validate Phone Number
        parsed_number = phonenumbers.parse(phone, "IN")
        if not phonenumbers.is_valid_number(parsed_number):
            return "Invalid phone number"

        # Validate Password
        validate_password(password)
        
        return None  # No errors
    except ValidationError as e:
        return str(e)
    except phonenumbers.NumberParseException:
        return "Invalid phone number format"


@api_view(['POST'])
def register_view(request):
    """
    This function takes user's username, email, phone, and password.
    If the details like email, phone and password are valid, it register this user to the database.
    And returns a JWT access token and a refresh token.
    """
    
    username = request.data.get('username')
    email = request.data.get('email')
    phone = request.data.get('phone')
    password = request.data.get('password')

    # Ensure all fields are provided
    if not all([username, email, phone, password]):
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the user already exists
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(phone=phone).exists():
        return Response({"error": "Phone number already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    error_message = validate_user_data(email, phone, password)
    if error_message:
        return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new user
    user = User(
        username = username,
        email = email,
        phone = phone,
        password = password,
    )
    user.save()
    logger.info(f"User Registered: {user.email}")

    # Generate JWT
    refresh = RefreshToken.for_user(user)
    
    return Response({
        "message": "Registration successful",
        "token": str(refresh.access_token),
        "refresh": str(refresh),
        }, status=status.HTTP_201_CREATED)