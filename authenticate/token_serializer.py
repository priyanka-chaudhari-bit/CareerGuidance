from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from students.models import CustomUser
from admin_app.models import AdminUser

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Identify user type
        if isinstance(user, CustomUser):
            token["user_type"] = "student"
            token["user_id"] = user.student_id  # Student ID
            token["email"] = user.email
        elif isinstance(user, AdminUser):
            token["user_type"] = "admin"
            token["user_id"] = user.id  # Admin ID
            token["email"] = user.email

        return token
