from django.contrib.auth.backends import BaseBackend
from admin_app.models import AdminUser

class AdminBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            admin_user = AdminUser.objects.get(email=email)
            if admin_user.check_password(password):
                return admin_user
        except AdminUser.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return AdminUser.objects.get(pk=user_id)
        except AdminUser.DoesNotExist:
            return None
