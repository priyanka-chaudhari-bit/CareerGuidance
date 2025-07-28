import jwt  # Import Python JWT library
from django.conf import settings
from django.contrib.auth import get_user_model
from .models import AdminUser
from django.core.cache import cache
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

# User = get_user_model()

class CustomJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        
       # # auth_header = request.headers.get('Authorization')

       # # if not auth_header:
        # #     return None  
        # session_id = request.COOKIES.get('session_id')
        # print("session_id",session_id)
        # if not session_id:
        #     return None  
        # session_key = f"admin_session_{session_id}"
        # session_data = cache.get(session_key)

        # if not session_data:
        #     raise AuthenticationFailed("Session expired or invalid")

        # access_token = session_data.get("access")
        access_token = request.COOKIES.get('access-admin')

        if not access_token:
            return None 

        try:
            
            # prefix, token = auth_header.split(" ")
            # if prefix.lower() != "bearer":
            #     raise AuthenticationFailed("Invalid token prefix")
            
            # print(token)

            
            # payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            # print(payload)
            payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get('user_id')
            if not user_id:
                raise AuthenticationFailed("Invalid token")

            print(user_id)
            user = AdminUser.objects.get(id=user_id)
            return (user, None)  

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired")
        except jwt.DecodeError:
            raise AuthenticationFailed("Invalid token")
        except AdminUser.DoesNotExist:
            raise AuthenticationFailed("User not found")
