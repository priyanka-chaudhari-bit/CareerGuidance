from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.permissions import BasePermission, IsAuthenticated
from .models import AdminUser,TestQuestion, TestOption, StudentAnswer, TestCategory, PsychometricOption, PsychometricQuestion, PsychometricAnswer, CollegeType, Course, College, CollegeCourse, CourseCutoff
from .serializers import TestQuestionSerializer, StudentAnswerSerializer, TestCategorySerializer, PsychometricOptionSerializer, PsychometricQuestionSerializer, PsychometricAnswerSerializer, PsychometricQuestionCreateSerializer, CollegeSerializer, CollegeTypeSerializer, CourseSerializer,CollegeCourseSerializer, CourseCutoffSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.core.cache import cache
from admin_app.utils import generate_admin_jwt
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from .authentication import CustomJWTAuthentication
from admin_app.authentication import CustomJWTAuthentication


User = get_user_model()


class AdminRegisterView(APIView):
    
    permission_classes = [AllowAny]  

    ADMIN_SECRET_KEY = "mysecretkey123"  

    def post(self, request):
        secret_key = request.data.get("secret_key")
        if secret_key != self.ADMIN_SECRET_KEY:
            return Response({"error": "Invalid secret key."}, status=status.HTTP_403_FORBIDDEN)

        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not (username and email and password):
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if AdminUser.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        admin_user = AdminUser.objects.create_user(username=username, email=email, password=password, is_admin=True)
        return Response({"message": "Admin registered successfully!", "admin_id": admin_user.id}, status=status.HTTP_201_CREATED)

class AdminLoginView(APIView):
    permission_classes = [AllowAny] 
    authentication_classes = []
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            admin_user = AdminUser.objects.get(username=username)  
            print(admin_user)
            print(admin_user.id)
            print("email",admin_user.email)
        except AdminUser.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=400)

        if check_password(password, admin_user.password):  
            # refresh = RefreshToken.for_user(admin_user)
            session_id, access_token, refresh_token = generate_admin_jwt(admin_user)
            response = Response({
                # "refresh_admin": refresh_token,
                # "access_admin": access_token,
                "user_type": "admin",
                "session_id": session_id 
                
            })
            # response.set_cookie(key="refresh-admin", value=refresh_token, secure=False, samesite="Strict")
            # response.set_cookie(key="access-admin", value=access_token, httponly=True, secure=False, samesite="Strict")
            response.set_cookie(key="session_id", value=session_id, httponly=True, secure=False, samesite="Strict")
            return response
        else:
            return Response({"error": "Invalid credentials"}, status=400)


class AdminLogoutView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def post(self, request):
        # refresh_token = request.COOKIES.get("refresh-admin")

        # if refresh_token:
        #     try:
        #         refresh = RefreshToken(refresh_token)
        #         refresh.blacklist()  
        #     except Exception:
        #         pass
        session_id = request.COOKIES.get("session_id")
        print("session_id "+session_id)

        if session_id:
            redis_key = f"admin_session_{session_id}"
            print("redis key "+redis_key)
            session_data = cache.get(redis_key)
            print("session_data ",session_data)

            if session_data:
                user_id = session_data.get("user_id")
                print("user_id",user_id)
                refresh_key = f"admin_refresh_{user_id}"
                print("refresh_key"+refresh_key)

                # Delete both session and refresh keys from Redis
                cache.delete(redis_key)
                print("redis_key deleted:",redis_key )
                cache.delete(refresh_key)
                print("refresh_key"+ refresh_key)


        response = Response({"message": "Logged out successfully!"}, status=status.HTTP_200_OK)
        # response.delete_cookie("refresh_token")  
        # response.delete_cookie("refresh-admin")  
        # response.delete_cookie("access-admin")
        response.delete_cookie("session_id")
        print("session cookie deleted")
        return response

class CreateTestQuestionView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    # permission_classes = [IsAdminUser] 
   
    def post(self, request):
        print("Authenticated User:", request.user)  
        serializer = TestQuestionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            question = serializer.save()
            return Response({"message": "Question created successfully!", "question_id": question.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TestQuestionListView(APIView):
    
    def get(self, request):
        questions = TestQuestion.objects.all()
        serializer = TestQuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TestCategoryView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    def get(self, request):
        """Fetch all categories"""
        categories = TestCategory.objects.all()
        serializer = TestCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """Create a new category"""
        serializer = TestCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetQuestionsByCategoryView(APIView):
    def get(self, request):
        category_name = request.data.get("category", "").strip()

        try:
            category = TestCategory.objects.get(name=category_name)
        except TestCategory.DoesNotExist:
            return Response(
                {"error": f"Category '{category_name}' not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        questions = TestQuestion.objects.filter(category=category)
        
        serializer = TestQuestionSerializer(questions, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class SubmitAnswerView(APIView):
    
    def post(self, request):
        student_id = request.data.get("student_id")
        question_id = request.data.get("question")
        selected_option_id = request.data.get("selected_option")
        # data = request.data  # Expecting {'answers': [{ "question_id": 1, "selected_option_id": 3 }, {...}]}
        student = get_object_or_404(User, student_id=student_id)
        question = get_object_or_404(TestQuestion, id=question_id)
        selected_option = get_object_or_404(TestOption, id=selected_option_id)

        if selected_option.question != question:
            return Response({"error": "Selected option does not belong to the given question."}, status=status.HTTP_400_BAD_REQUEST)
        
        # StudentAnswer.objects.create(
        #     student=student,
        #     question=question,
        #     selected_option=selected_option
        # )
        # Check if the answer is correct
        is_correct = selected_option.is_correct
        # Save student's answer
        answer = StudentAnswer.objects.create(
            student_id=student_id,
            question=question,
            selected_option=selected_option,
            # is_correct=is_correct
        )

        serializer = StudentAnswerSerializer(answer)
        # correct_answers = StudentAnswer.objects.filter(student=student, is_correct=True).count()
        correct_answers = StudentAnswer.objects.filter(
            student=student, selected_option__is_correct=True
        ).count()
        total_questions = TestQuestion.objects.count()
        score = (correct_answers / total_questions) * 100 if total_questions > 0 else 0
        student.aptitude_score = score
        student.save()

        return Response({"message": "Answer submitted successfully!", "score": score, "data": serializer.data}, status=status.HTTP_201_CREATED)

        # score = 0
        # total_questions = len(data['answers'])

        # for answer in data['answers']:
        #     question_id = answer['question_id']
        #     selected_option_id = answer['selected_option_id']
            
        #     try:
        #         question = TestQuestion.objects.get(id=question_id)
        #         if question.correct_option and question.correct_option.id == selected_option_id:
        #             score += 1  # Increment score for correct answer
        #     except TestQuestion.DoesNotExist:
        #         continue  # Skip invalid question IDs

        # return Response({
        #     "total_questions": total_questions,
        #     "correct_answers": score,
        #     "percentage": (score / total_questions) * 100
        # }, status=status.HTTP_200_OK)

class StudentAPTIScoreView(APIView):
    def get(self, request, student_id):
        # total_questions = TestQuestion.objects.count()
        # correct_answers = StudentAnswer.objects.filter(student_id=student_id, is_correct=True).count()

        # # Calculate score (percentage)
        # score = (correct_answers / total_questions) * 100 if total_questions > 0 else 0
        student = get_object_or_404(User, student_id=student_id)

        return Response({
            "student_id": student,
            # "total_questions": total_questions,
            # "correct_answers": correct_answers,
            # "score": score
            "username": student.username,
            "aptitude_score": student.aptitude_score
        }, status=status.HTTP_200_OK)

class CreatePsychometricQuestionView(APIView):
    # Optional: make it Admin-only
    authentication_classes = [CustomJWTAuthentication]  

    def post(self, request):
        is_bulk = isinstance(request.data, list)
        serializer = PsychometricQuestionCreateSerializer(data=request.data, many=is_bulk)
        if serializer.is_valid():
            question = serializer.save()
            return Response(PsychometricQuestionSerializer(question, many=is_bulk).data, status=201)
        return Response(serializer.errors, status=400)


class PsychometricQuestionListView(APIView):
    # permission_classes = [IsAuthenticated]
    authentication_classes = [CustomJWTAuthentication] 

    def get(self, request):
        questions = PsychometricQuestion.objects.prefetch_related('options').all()
        serializer = PsychometricQuestionSerializer(questions, many=True)
        return Response(serializer.data)


class SubmitPsychometricAnswersView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        answers = request.data.get("answers", [])

        if not answers:
            return Response({"error": "Answers list is required"}, status=400)

        for ans in answers:
            question_id = ans.get("question")
            option_id = ans.get("selected_option")

            try:
                question = PsychometricQuestion.objects.get(id=question_id)
                option = PsychometricOption.objects.get(id=option_id, question=question)
            except PsychometricQuestion.DoesNotExist:
                return Response({"error": f"Question {question_id} not found"}, status=404)
            except PsychometricOption.DoesNotExist:
                return Response({"error": f"Invalid option {option_id} for question {question_id}"}, status=400)

            PsychometricAnswer.objects.create(
                user=user,
                question=question,
                selected_option=option
            )

        return Response({"message": "Answers submitted successfully!"}, status=201) 

class CollegeTypeAPIView(APIView):
    authentication_classes = [CustomJWTAuthentication]  

    def get(self, request):
        types = CollegeType.objects.all()
        serializer = CollegeTypeSerializer(types, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CollegeTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseAPIView(APIView):
    authentication_classes = [CustomJWTAuthentication]  

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CollegeAPIView(APIView):
    authentication_classes = [CustomJWTAuthentication]  

    def get(self, request):
        colleges = College.objects.all()
        serializer = CollegeSerializer(colleges, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CollegeSerializer(data=request.data)
        if serializer.is_valid():
            college = serializer.save()
            # college.college_types.set(request.data.get('college_types', []))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class CollegeCourseAPIView(APIView):
#     authentication_classes = [CustomJWTAuthentication]  

#     def get(self, request):
#         college_id = request.query_params.get('college')
#         if college_id:
#             data = CollegeCourse.objects.filter(college_id=college_id)
#         else:
#             data = CollegeCourse.objects.all()
#         serializer = CollegeCourseSerializer(data, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = CollegeCourseSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class CourseCutoffAPIView(APIView):
#     authentication_classes = [CustomJWTAuthentication]  

#     def get(self, request):
#         cc_id = request.query_params.get('college_course')
#         if cc_id:
#             data = CourseCutoff.objects.filter(college_course_id=cc_id)
#         else:
#             data = CourseCutoff.objects.all()
#         serializer = CourseCutoffSerializer(data, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = CourseCutoffSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CollegeCourseAPIView(APIView):
    authentication_classes = [CustomJWTAuthentication]  

    def get(self, request):
        college_name = request.query_params.get('college')
        if college_name:
            try:
                college = College.objects.get(name__iexact=college_name)
                data = CollegeCourse.objects.filter(college=college)
            except College.DoesNotExist:
                return Response({"detail": "College not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            data = CollegeCourse.objects.all()

        serializer = CollegeCourseSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CollegeCourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseCutoffAPIView(APIView):
    authentication_classes = [CustomJWTAuthentication]  

    def get(self, request):
        college_name = request.query_params.get('college')
        course_name = request.query_params.get('course')

        if college_name and course_name:
            try:
                college = College.objects.get(name__iexact=college_name)
                course = Course.objects.get(name__iexact=course_name)
                college_course = CollegeCourse.objects.get(college=college, course=course)
                data = CourseCutoff.objects.filter(college_course=college_course)
            except (College.DoesNotExist, Course.DoesNotExist, CollegeCourse.DoesNotExist):
                return Response({"detail": "No matching college/course data found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            data = CourseCutoff.objects.all()

        serializer = CourseCutoffSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseCutoffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
