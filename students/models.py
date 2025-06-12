from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
# from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
import json
from django.db.models import Index
from django.utils import timezone
from django.core.exceptions import ValidationError
import uuid
from django.dispatch import receiver
import random

# Custom user manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, anon_username=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        print(anon_username)
        # anon_username = extra_fields.pop('anon_username', self.generate_anon_username())
        # Ensure anon_username is always assigned
        # if 'anon_username' not in extra_fields or not extra_fields['anon_username']:
        #     extra_fields['anon_username'] = self.generate_anon_username()

        print("Received extra_fields:", extra_fields)  
        print("Received anon_username:", anon_username)  

        # Check if anon_username is missing from extra_fields
        # anon_username = extra_fields.pop('anon_username', anon_username)
        print("Updated anon_username:", anon_username)

        if not anon_username:
            anon_username = self.generate_anon_username()
        else:
            # Ensure anon_username is unique
            if CustomUser.objects.filter(anon_username=anon_username).exists():
                suggested_username = self.generate_anon_username()
                return {"error": "anon_username_exists", "suggestion": suggested_username}
            
        extra_fields['anon_username'] = anon_username
        # user = self.model(email=email,anon_username=anon_username, **extra_fields)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

    def generate_anon_username(self):
        adjectives = ['Calm', 'Mindful', 'Happy', 'Peaceful', 'Bright']
        nouns = ['Fox', 'Owl', 'Lion', 'Swan', 'Dolphin']
        unique_id = uuid.uuid4().hex[:6]  # 6-character unique fragment
        return f"{random.choice(adjectives)}{random.choice(nouns)}{unique_id}"
    

# Custom User model
class CustomUser(AbstractBaseUser, PermissionsMixin):

    USER_TYPES = (
        ('user', 'User'),
        ('admin', 'Admin'),
    )
    

    user_type = models.CharField(max_length=10, choices=USER_TYPES, default='user')
    id = models.AutoField(primary_key=True)
    anon_username = models.CharField(max_length=50, unique=True, blank=True, null=True, db_index=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True, db_index=True)
    password = models.CharField(max_length=100)
    tenth_marks = models.FloatField(null=True, blank=True)
    twelfth_marks = models.FloatField(null=True, blank=True)
    graduation_marks = models.FloatField(null=True, blank=True)
    postgraduation_marks = models.FloatField(null=True, blank=True)
    preferred_city = models.CharField(max_length=50, blank=True, null=True)
    cgpa = models.FloatField(blank=True, null=True)
    entrance_exam = models.CharField(max_length=50, blank=True, null=True)
    entrance_score = models.FloatField(blank=True, null=True)
    preferred_location = models.CharField(max_length=100, blank=True, null=True)
    desired_course = models.CharField(max_length=100, blank=True, null=True)
    aptitude_score = models.FloatField(blank=True, null=True)
    interest_mapping = models.JSONField(blank=True, null=True, default=dict)  # Placeholder for future expansion
    date_joined = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    category_score_mapping = models.JSONField(default=dict, blank=True) 

    is_active = models.BooleanField(default=True, db_index=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    groups = models.ManyToManyField(Group, related_name="customuser_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="customuser_permissions", blank=True)

    # @property
    # def id(self):
    #     return self.student_id
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def generate_tokens(self):
        refresh = RefreshToken.for_user(self)  
        refresh['user_id'] = self.id  
        refresh['email'] = self.email
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
    class Meta:
        indexes = [
            Index(fields=['user_type', 'is_active']),  
            Index(fields=['cgpa', 'entrance_score']),  
            Index(fields=['preferred_location', 'desired_course']),  
        ]

