from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser
from admin_app.models import TestQuestion, TestCategory, CollegeCourse, College, CourseCutoff
from admin_app.serializers import TestOptionSerializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 'anon_username', 'name', 'email', 'cgpa', 'entrance_exam', 'entrance_score',
            'preferred_location', 'desired_course', 'aptitude_score', 'interest_mapping', 'preferred_city','tenth_marks','twelfth_marks', 'category_score_mapping','graduation_marks', 'postgraduation_marks'
        ]
        read_only_fields = ['id','aptitude_score', 'interest_mapping', 'category_score_mapping']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    anon_username = serializers.CharField(required=False, allow_blank=True)
    suggestion = serializers.CharField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['name','anon_username', 'email', 'password','suggestion']
    
    def validate_email(self, value):
        if value:
            if CustomUser.objects.filter(email=value).exists():
                raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value
    
    def create(self, validated_data):
        # anon_username = validated_data.pop('anon_username', None) or CustomUser.objects.generate_anon_username()
        # anon_username = validated_data.get('anon_username') or CustomUser.objects.generate_anon_username()
        # print(f"Creating user with anon_username: {anon_username}")  
        user = CustomUser.objects.create_user(
            name=validated_data.get('name', None),
            # anon_username=anon_username,
            anon_username=validated_data['anon_username'], 
            email=validated_data['email'],
            password=validated_data['password'],
            
            
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password.")

        # Check if user exists
        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password.")

        # if not user.is_active:
        #     raise serializers.ValidationError("Your account is disabled. Please contact support.")

        data["user"] = user
        return data
    
# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Add custom claims (user_id & email)
#         token['user_id'] = user.student_id
#         token['email'] = user.email

#         return token
#     def validate(self, attrs):
#         email = attrs.get("email")
#         password = attrs.get("password")

#         if not email or not password:
#             raise serializers.ValidationError("Email and password are required.")

#         user = authenticate(username=email, password=password)  
#         if not user:
#             raise serializers.ValidationError("Invalid credentials.")

#         return super().validate(attrs)

class TestQuestionSerializer(serializers.ModelSerializer):
    # category = serializers.CharField(source='category.name', read_only=True)  
    category = serializers.CharField()  
    # category = serializers.PrimaryKeyRelatedField(queryset=TestCategory.objects.all())
    options = TestOptionSerializer(many=True, read_only=True)  
    # correct_option = serializers.IntegerField(write_only=True)

    class Meta:
        model = TestQuestion
        # fields = '__all__'
        fields = ['id', 'category','text', 'options']

    def validate_category(self, value):
        if not TestCategory.objects.filter(name=value).exists():
            raise serializers.ValidationError(f"Category '{value}' does not exist. Please choose a valid category.")
        return value

class CourseCutoffSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCutoff
        fields = ['category', 'cutoff_score']

class CourseSerializer(serializers.ModelSerializer):
    college_name = serializers.SerializerMethodField()
    course_name = serializers.SerializerMethodField()
    cutoffs = CourseCutoffSerializer(source='coursecutoff_set', many=True, read_only=True)
    class Meta:
        model = CollegeCourse
        fields = [
            'id', 'tuition_fees', 'placements', 'eligibility_criteria', 'selection_criteria',
            'college_name', 'course_name','cutoffs'
        ]
    def get_college_name(self, obj):
        return obj.college.name if obj.college else None

    def get_course_name(self, obj):
        return obj.course.name if obj.course else None

class CollegeDetailSerializer(serializers.ModelSerializer):
    college_types = serializers.StringRelatedField(many=True)
    courses = serializers.SerializerMethodField()

    class Meta:
        model = College
        fields = '__all__'

    def get_courses(self, obj):
        courses = CollegeCourse.objects.filter(college=obj)
        return CourseSerializer(courses, many=True).data 
