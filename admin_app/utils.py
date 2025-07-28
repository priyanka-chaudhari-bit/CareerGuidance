import datetime
import jwt as pyjwt
from django.conf import settings
from django.core.cache import cache
import base64
import uuid
import hmac
import hashlib
import json
from django.conf import settings

def base64_url_encode(data):
    """Encodes data into a base64 URL-safe string."""
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode()

def generate_custom_jwt(admin_user, expiry_seconds):
    # JWT Header
    header = {
        "alg": "HS256",
        "typ": "JWT"
    }
    
    # JWT Payload
    payload = {
        "user_id": admin_user.id,
        "email": admin_user.email,
        "user_type": "admin",
        "exp": datetime.datetime.utcnow().timestamp() + expiry_seconds,  # Expires in 1 day
        "iat": datetime.datetime.utcnow().timestamp()
    }

    # Encode header & payload to base64
    encoded_header = base64_url_encode(json.dumps(header).encode())
    encoded_payload = base64_url_encode(json.dumps(payload).encode())

    # Create signature
    secret = settings.SECRET_KEY.encode()
    message = f"{encoded_header}.{encoded_payload}".encode()
    signature = hmac.new(secret, message, hashlib.sha256).digest()
    encoded_signature = base64_url_encode(signature)

    # Construct the final JWT
    jwt_token = f"{encoded_header}.{encoded_payload}.{encoded_signature}"
    
    return jwt_token


def generate_admin_jwt(admin_user):
    
    access_token = generate_custom_jwt(admin_user, expiry_seconds=86400)
   
    refresh_token = generate_custom_jwt(admin_user, expiry_seconds=7 * 86400)
    # session_id = str(uuid.uuid4()) 

    # cache.set(
    #     f"admin_session_{session_id}",
    #     {"access": access_token, "refresh": refresh_token, "user_id": admin_user.id},
    #     timeout=7 * 86400
    # )

    # cache.set(f"admin_refresh_{admin_user.id}", refresh_token, timeout=7 * 24 * 60 * 60)  # 7 days

    # return session_id,access_token, refresh_token
    return access_token, refresh_token
