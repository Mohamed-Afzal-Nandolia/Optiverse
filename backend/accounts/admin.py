from django.contrib import admin
from .models import User
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "email", "phone") # show in admin panel
    search_fields = ("username", "email", "phone") # Enable search