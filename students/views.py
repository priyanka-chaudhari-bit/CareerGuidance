from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserRegistrationSerializer, UserSerializer, UserLoginSerializer, TestQuestionSerializer, CollegeDetailSerializer
from .models import CustomUser
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password
from django.db import IntegrityError
from django.utils import timezone
from datetime import timedelta
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.timezone import now
from rest_framework_simplejwt.views import TokenObtainPairView
from admin_app.models import TestQuestion, TestOption, StudentAnswer, TestCategory, PsychometricQuestion, PsychometricOption, PsychometricAnswer,College, PsychometricResult
from admin_app.serializers import  StudentAnswerSerializer, TestCategorySerializer, PsychometricQuestionSerializer
from collections import defaultdict
from django.db.models import Count
# from .serializers import CustomTokenObtainPairSerializer
# from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            # try: 
            #     user = serializer.save()
            #     refresh = RefreshToken.for_user(user)
            #     return Response({
            #         'message': 'User registered successfully',
            #         'user': UserSerializer(user).data,
            #         'refresh': str(refresh),
            #         'access': str(refresh.access_token)
            #         # 'tokens': user.generate_tokens()
            #     }, status=status.HTTP_201_CREATED)
            # except IntegrityError as e:
            #     if 'email' in str(e):  
            #         return Response({
            #             'email': ['A user with this email already exists.']
            #         }, status=status.HTTP_400_BAD_REQUEST)
            #     else:
            #         suggested_username = CustomUser.objects.generate_anon_username()
            #         return Response({
            #             'error': 'A user with this anon_username already exists.',
            #             'suggestion': f"Try this username instead: {suggested_username}"
            #         }, status=status.HTTP_400_BAD_REQUEST)
            anon_username = request.data.get('anon_username')
            if CustomUser.objects.filter(anon_username=anon_username).exists():
                suggested_username = CustomUser.objects.generate_anon_username()
                return Response({
                    'message': 'This username is already taken.',
                    'suggestion': f"Try this username instead: {suggested_username}"
                }, status=status.HTTP_400_BAD_REQUEST)

            try: 
                user = serializer.save()
                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'User registered successfully',
                    'user': UserSerializer(user).data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                }, status=status.HTTP_201_CREATED)

            except IntegrityError as e:
                if 'email' in str(e):  
                    return Response({'email': ['A user with this email already exists.']}, 
                                    status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserLoginView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         if not email or not password:
#             return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             user = CustomUser.objects.get(email=email)
#         except CustomUser.DoesNotExist:
#             return Response({'error': 'User with this Username does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
#         if user.check_password(password, user.password):
#             user.last_login = timezone.now()
#             user.save()
#             refresh = RefreshToken.for_user(user)
#             access_token = str(refresh.access_token)
#             serializer = UserSerializer(user)
#             # response = JsonResponse({
#             return Response({
#                 'message': 'Login successful',
#                 'user': serializer.data,
#                 'access_token': access_token,
#                 'refresh_token': str(refresh)

#             }, status=status.HTTP_200_OK)
#             # Set JWT tokens in cookies
#             response.set_cookie(
#                 key="access_token",
#                 value=access_token,
#                 httponly=True,
#                 secure=False,  # Set to True in production
#                 samesite='Lax',
#             )
#             response.set_cookie(
#                 key="refresh_token",
#                 value=str(refresh),
#                 httponly=True,
#                 secure=False,
#                 samesite='Lax',
#             )
#             return response
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# class UserLoginView(APIView):
#     def post(self, request):
#         serializer = UserLoginSerializer(data=request.data)

#         if serializer.is_valid():
#             user = serializer.validated_data["user"]
#             refresh = RefreshToken.for_user(user)
#             access_token = str(refresh.access_token)

#             response = Response({
#                 "message": "Login successful",
#                 "user": UserSerializer(user).data,
#             }, status=status.HTTP_200_OK)

#             # Set HttpOnly cookies
#             response.set_cookie(
#                 key="access_token",
#                 value=access_token,
#                 httponly=True,
#                 secure=True,  # Set to False in development
#                 samesite="Lax",  
#                 expires=now() + timedelta(minutes=15)  # Adjust expiry as needed
#             )
#             response.set_cookie(
#                 key="refresh_token",
#                 value=str(refresh),
#                 httponly=True,
#                 secure=True,  
#                 samesite="Lax",
#                 expires=now() + timedelta(days=7)  # Refresh token lasts longer
#             )

#             return response

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    permission_classes = [AllowAny]
    # def post(self, request):
    #     # anon_username = request.data.get('anon_username')
    #     email = request.data.get('email')
    #     password = str(request.data.get('password', ''))
        
    #     if not email or not password:
    #         return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    #     try:
    #         user = CustomUser.objects.get(email=email)
    #     except CustomUser.DoesNotExist:
    #         return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)

    #     if check_password(password, user.password):  # Manually check hashed password
    #         user.last_login = timezone.now()
    #         user.save()
    #         refresh = RefreshToken.for_user(user)
    #         access_token = str(refresh.access_token)
    #         serializer = UserSerializer(user)

    #         tokens = user.generate_tokens()
    #         response =  Response({
    #             'message': 'User logged in successfully',
    #             'user': serializer.data,
    #             # 'refresh': str(refresh),
    #             # 'access': str(refresh.access_token)
    #             "access": tokens['access'],
    #             "refresh": tokens['refresh'],
    #         }, status=status.HTTP_200_OK)
    #         # Set HttpOnly cookies
    #         response.set_cookie(
    #             key="access",
    #             value=access_token,
    #             httponly=True,
    #             secure=False,  # Set to False in development
    #             samesite="Lax",  
    #             expires=now() + timedelta(minutes=15)  # Adjust expiry as needed
    #         )
    #         response.set_cookie(
    #             key="refresh",
    #             value=str(refresh),
    #             httponly=True,
    #             secure=False,  
    #             samesite="Lax",
    #             expires=now() + timedelta(days=7)  # Refresh token lasts longer
    #         )
    #         return response

    #     else:
    #         return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        student_user = authenticate(request, email=email, password=password)

        if student_user and isinstance(student_user, CustomUser):
            refresh = RefreshToken.for_user(student_user)
            access_token = str(refresh.access_token)
            serializer = UserSerializer(student_user)
            response = Response({
                'message': 'User logged in successfully',
                'user': serializer.data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user_type": "student"
            })
            response.set_cookie(
                key="access",
                value=access_token,
                httponly=True,
                secure=False,  
                samesite="Lax",  
                expires=now() + timedelta(minutes=15)  
            )
            response.set_cookie(
                key="refresh",
                value=str(refresh),
                httponly=True,
                secure=False,  
                samesite="Lax",
                expires=now() + timedelta(days=7)  
            )
            return response
        else:
            return Response({"error": "Invalid credentials"}, status=400)

# class CustomTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer

def get_logged_in_user(request):
    auth = JWTAuthentication()
    header = auth.get_header(request)
    raw_token = auth.get_raw_token(header)
    validated_token = auth.get_validated_token(raw_token)
    print("JWT Payload:", validated_token)
    user_id = validated_token.get("user_id")  
    email = validated_token.get("email")  

    return {"user_id": user_id, "email": email}

# class LogoutView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         try:
#             refresh_token = request.data.get("refresh_token")
#             if not refresh_token:
#                 return Response({"error": "Refresh token is required"}, status=400)
            
#             token = RefreshToken(refresh_token)
#             token.blacklist()  
#             user = request.user
#             logged_in_user = get_logged_in_user(request)
#             user_id = logged_in_user["user_id"]
#             print("User Fields:", user._meta.get_fields())
#             CustomUser.objects.filter(student_id=user_id).update(last_login=None)
#             response = Response({"message": "Successfully logged out"}, status=200)
#             response.delete_cookie("access")
#             response.delete_cookie("refresh")
#             return response
#         except Exception as e:
#             return Response({"error": str(e)}, status=400)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            # refresh_token = request.data.get("refresh")
            # if not refresh_token:
            #     return Response({"error": "Refresh token is required"}, status=400)
            
            # token = RefreshToken(refresh_token)
            # token.blacklist()  

            # user = request.user
            # logged_in_user = get_logged_in_user(request)
            # user_id = logged_in_user.get("user_id")  # Use .get() to prevent KeyError
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=400)
            
            token = RefreshToken(refresh_token)
            token.blacklist()

            user = request.user
            user_id = getattr(user, 'id', None)

            # 🛠️ Debugging: Print retrieved user_id
            print(f"Extracted user_id from JWT: {user_id}")

            if not user_id:
                return Response({"error": "User ID not found in token"}, status=400)

            print("User Fields:", [field.name for field in CustomUser._meta.get_fields()])

            updated_count = CustomUser.objects.filter(id=user_id).update(last_login=None)

            if updated_count == 0:
                return Response({"error": "User not found"}, status=404)

            response = Response({"message": "Successfully logged out"}, status=200)
            response.delete_cookie("access")
            response.delete_cookie("refresh")
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=400)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UserSerializer(request.user)
        interests = None
        recommended_fields = None
        personality_type = None
        try:
            psychometric_result = PsychometricResult.objects.get(user=user)
            interests = psychometric_result.interests
            recommended_fields = psychometric_result.recommended_fields
            personality_type = psychometric_result.personality_type
        except PsychometricResult.DoesNotExist:
            pass
        data = serializer.data
        data.update({
            "interests": interests,
            "recommended_fields": recommended_fields,
            "personality_type": personality_type
        })
        return Response(data, status=status.HTTP_200_OK)
    
    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            print(serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class SubmitAnswerView(APIView):
#     permission_classes = [IsAuthenticated]
#     def post(self, request):
#         student_id = request.data.get("student_id")
#         question_id = request.data.get("question")
#         selected_option_id = request.data.get("selected_option")
#         # data = request.data  # Expecting {'answers': [{ "question_id": 1, "selected_option_id": 3 }, {...}]}
#         student = get_object_or_404(CustomUser, student_id=student_id)
#         question = get_object_or_404(TestQuestion, id=question_id)
#         selected_option = get_object_or_404(TestOption, id=selected_option_id)

#         if selected_option.question != question:
#             return Response({"error": "Selected option does not belong to the given question."}, status=status.HTTP_400_BAD_REQUEST)
        # ==============================================
        # StudentAnswer.objects.create(
        #     student=student,
        #     question=question,
        #     selected_option=selected_option
        # )
        # Check if the answer is correct
        # ================================================
        # is_correct = selected_option.is_correct
        # # Save student's answer
        # answer = StudentAnswer.objects.create(
        #     student_id=student_id,
        #     question=question,
        #     selected_option=selected_option,
        #     # is_correct=is_correct
        # )

        # serializer = StudentAnswerSerializer(answer)
        # # correct_answers = StudentAnswer.objects.filter(student=student, is_correct=True).count()
        # correct_answers = StudentAnswer.objects.filter(
        #     student=student, selected_option__is_correct=True
        # ).count()
        # total_questions = TestQuestion.objects.count()
        # score = (correct_answers / total_questions) * 100 if total_questions > 0 else 0
        # student.aptitude_score = score
        # student.save()

        # return Response({"message": "Answer submitted successfully!", "score": score, "data": serializer.data}, status=status.HTTP_201_CREATED)
# ===========================
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

class SubmitAnswerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # student_id = request.data.get("student_id")
        student_id = request.user.id  
        print("student_id",student_id)
        answers_data = request.data.get("answers", [])

        if not student_id or not answers_data:
            return Response({"error": "student_id and answers are required"}, status=400)

        student = get_object_or_404(CustomUser, id=student_id)
        if StudentAnswer.objects.filter(student=student).exists():
            return Response({
                "error": "You have already submitted the test. Please clear previous attempts to retry."
            }, status=400)

        correct_count = 0

        submitted_answers = []
        category_totals = TestQuestion.objects.values('category__name').annotate(total=Count('id'))
        print("category_totals",category_totals)
        total_per_category = {entry['category__name']: entry['total'] for entry in category_totals}
        print("total_per_category",total_per_category)
        # category_stats = defaultdict(lambda: {"correct": 0, "total": 0})
        correct_per_category = defaultdict(int)
        for item in answers_data:
            question_id = item.get("question")
            selected_option_id = item.get("selected_option")

            question = get_object_or_404(TestQuestion, id=question_id)
            selected_option = get_object_or_404(TestOption, id=selected_option_id)

            if selected_option.question != question:
                return Response(
                    {"error": f"Selected option {selected_option_id} does not belong to question {question_id}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            StudentAnswer.objects.create(
                student=student,
                question=question,
                selected_option=selected_option,
            )
            # category_name = question.category.name  # Assuming FK to Category model
            # category_stats[category_name]["total"] += 1

            if selected_option.is_correct:
                correct_count += 1
                # category_stats[category_name]["correct"] += 1
                category_name = question.category.name
                correct_per_category[category_name] += 1

            submitted_answers.append({
                "question": question_id,
                "selected_option": selected_option_id,
                "is_correct": selected_option.is_correct,
            })

        total_questions = TestQuestion.objects.count()
        print("total_questions",total_questions)
        print("correct_count",correct_count)
        score = (correct_count / total_questions) * 100 if total_questions > 0 else 0
        category_scores = {}
        # for category, stats in category_stats.items():
        #     correct = stats["correct"]
        #     total = stats["total"]
        #     category_scores[category] = round((correct / total) * 100, 2) if total > 0 else 0
        for category, total in total_per_category.items():
            correct = correct_per_category.get(category, 0)
            category_scores[category] = round((correct / total) * 100, 2) if total > 0 else 0

        student.aptitude_score = score   
        student.category_score_mapping = category_scores 
        student.save()

        return Response({
            "message": "Answers submitted successfully!",
            "score": score,
            "submitted_answers": submitted_answers,
            "category_scores": category_scores
        }, status=status.HTTP_201_CREATED)


class StudentAPTIScoreView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # total_questions = TestQuestion.objects.count()
        # correct_answers = StudentAnswer.objects.filter(student_id=student_id, is_correct=True).count()

        # # Calculate score (percentage)
        # score = (correct_answers / total_questions) * 100 if total_questions > 0 else 0
        student_id = request.user.id 
        student = get_object_or_404(CustomUser, id=student_id)
        anon_username = student.anon_username
        name = student.name
        category_score_mapping = student.category_score_mapping
        try:
            psychometric_result = PsychometricResult.objects.get(user=student)
            interests = psychometric_result.interests
            recommended_fields = psychometric_result.recommended_fields
            personality_type = psychometric_result.personality_type
        except PsychometricResult.DoesNotExist:
            interests = None
            recommended_fields = None
            personality_type = None

        return Response({
            "student_id": student.id,
            # "total_questions": total_questions,
            # "correct_answers": correct_answers,
            # "score": score
            "username": anon_username,
            "name": name,
            "aptitude_score": student.aptitude_score,
            "category_score_mapping": category_score_mapping,
            "interests": interests,
            "recommended_fields": recommended_fields,
            "personality_type": personality_type,
        }, status=status.HTTP_200_OK)
    
class TestQuestionListView(APIView):
    
    def get(self, request):
        questions = TestQuestion.objects.all()
        serializer = TestQuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CheckTestStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        has_attempted_aptitude = StudentAnswer.objects.filter(student=user).exists()
        has_attempted_psychometric = PsychometricAnswer.objects.filter(user=user).exists()
        return Response({
            "has_attempted_aptitude": has_attempted_aptitude,
            "has_attempted_psychometric": has_attempted_psychometric,
            "message": (
                "Both tests completed." if has_attempted_aptitude and has_attempted_psychometric
                else "Please complete both tests to receive recommendations."
            )
        }, status=200)

class DeletePreviousAnswersView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        StudentAnswer.objects.filter(student=user).delete()
        PsychometricAnswer.objects.filter(user=user).delete()

        # Reset any scores stored in user object
        user.aptitude_score = None
        user.category_score_mapping = {}
        user.save()

        return Response({
            "message": "Previous test answers deleted. You may now retake the test."
        }, status=200)

class PsychometricQuestionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        questions = PsychometricQuestion.objects.prefetch_related('options').all()
        serializer = PsychometricQuestionSerializer(questions, many=True)
        return Response(serializer.data)

class SubmitPsychometricAnswersView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        print("User:", user)
        print("Received answers:", request.data.get("answers", []))
        if PsychometricAnswer.objects.filter(user=user).exists():
            return Response(
                {"error": "You have already submitted the psychometric test."},
                status=400
            )
        answers_data = request.data.get("answers", [])

        if not answers_data:
            return Response({"error": "Answers are required."}, status=400)

        for answer in answers_data:
            question_id = answer.get("question")
            selected_option_id = answer.get("selected_option")

            question = get_object_or_404(PsychometricQuestion, id=question_id)
            selected_option = get_object_or_404(PsychometricOption, id=selected_option_id)

            if selected_option.question != question:
                return Response(
                    {"error": f"Option {selected_option_id} does not belong to question {question_id}."},
                    status=400
                )

            PsychometricAnswer.objects.create(
                user=user,
                question=question,
                selected_option=selected_option
            )

        return Response({"message": "Psychometric answers submitted successfully."}, status=201)

FIELD_MAP = {
  "Introversion": ["Computer Applications", "Science", "Design", "Architecture"],
  "Extraversion": ["Mass Communications", "Hotel Management", "Management", "Animation", "Education"],
  "Leadership": ["Management", "Engineering", "Computer Applications", "Law", "Hotel Management", "Aviation"],
  "Emotional Stability": ["Medical","Veterinary Sciences","Dental","Pharmacy", "Paramedical"],
  "Openness to Experience": ["Animation","Design", "Architecture", "Arts", "Science" ],
  "Empathy": ["Education", "Medical", "Paramedical", "Psychology", "Social Work"],
  "Conscientiousness": ["Engineering", "Computer Applications", "Management", "Pharmacy", "Law"],
  "Proactiveness": ["Management","Entrepreneurship", "Commerce", "Engineering", "Hotel Management"],
  "Stress Tolerance": ["Aviation", "Medical", "Law", "Commerce", "Engineering" ],
  "Altruism": ["Medical","Education", "Paramedical", "Veterinary Sciences", "Social Work"],
  "Self-Awareness": ["Psychology", "Education", "Arts", "Design", "Law"],
  "Adaptability": ["Mass Communications","Aviation","Hotel Management","Animation", "Design"]
}

PERSONALITY_MAP={
  "Introverted": ["Computer Applications", "Design", "Science", "Architecture"],
  "Extroverted": ["Mass Communications", "Hotel Management", "Education", "Management"],
  "Analytical": ["Engineering", "Science", "Computer Applications", "Medical","Paramedical"],
  "Creative": ["Animation", "Design", "Architecture", "Arts"],
  "Empathetic": ["Education", "Social Work", "Medical", "Psychology"],
  "Assertive": ["Management", "Law", "Entrepreneurship", "Commerce"]
}

APTITUDE_MAP = {
    "Logical Reasoning": ["Engineering","Management", "Computer Applications", "Science", "Medical","Architecture","Paramedical","Agriculture","Law","Design"],
    "Quantitative Aptitude": ["Engineering","Management", "Pharmacy", "Aviation", "Commerce","Computer Applications","Science","Architecture"],
    "Verbal Reasoning": ["Law", "Arts","Mass Communications", "Education", "Management", "Commerce","Hotel Management","Design"],
    "General Knowledge": ["Education", "Management", "Mass Communications", "Hotel Management","Law","Commerce","Arts","Agriculture"],
}

class CollegeRecommendationView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user_id = request.user.id
        user = request.user
        # answers = PsychometricAnswer.objects.filter(user=user).select_related('selected_option')
        answers = PsychometricAnswer.objects.filter(user_id=user_id).select_related(
            'selected_option', 'selected_option__question'
        )
        dimension_weights = {}

        for ans in answers:
            question = ans.selected_option.question
            dim = question.dimension
            weight = ans.selected_option.weight or 0
            dimension_weights[dim] = dimension_weights.get(dim, 0) + weight

        # Map dimensions to fields
        psychometric_fields = {}
        for dim, score in dimension_weights.items():
            fields = FIELD_MAP.get(dim, [])
            for field in fields:
                psychometric_fields[field] = psychometric_fields.get(field, 0) + score

        # ---- Aptitude Scores Aggregation ----
        try:
            category_score_mapping = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            category_score_mapping = None
        apti_scores = category_score_mapping
        aptitude_fields = {}
        if apti_scores:
            section_scores = {
                "Quantitative": apti_scores.category_score_mapping.get("Quantitative Aptitude", 0),
                "Logical": apti_scores.category_score_mapping.get("Logical Reasoning", 0),
                "Verbal": apti_scores.category_score_mapping.get("Verbal Reasoning", 0),
                "General Awareness": apti_scores.category_score_mapping.get("General Knowledge", 0)
            }


            for section, score in section_scores.items():
                for field in APTITUDE_MAP.get(section, []):
                    aptitude_fields[field] = aptitude_fields.get(field, 0) + score

        # ---- Combine both ----
        final_scores = {}
        for field in set(list(psychometric_fields.keys()) + list(aptitude_fields.keys())):
            p_score = psychometric_fields.get(field, 0)
            # print(p_score)
            a_score = aptitude_fields.get(field, 0)
            # print(a_score)
            final_scores[field] = p_score * 0.4 + a_score * 0.6

        # ---- Get top fields ----
        top_fields = sorted(final_scores.items(), key=lambda x: x[1], reverse=True)[:3]
        top_field_names = [f[0] for f in top_fields]

        personality_type = max(dimension_weights, key=dimension_weights.get) if dimension_weights else "Unknown"
        interests_list = sorted(psychometric_fields.items(), key=lambda x: x[1], reverse=True)
        interests = ', '.join([field for field, score in interests_list[:5]]) 
        
        recommended_fields = ', '.join(top_field_names)

        # Save or update PsychometricResult for this user
        psychometric_result, created = PsychometricResult.objects.update_or_create(
            user=user,
            defaults={
                "personality_type": personality_type,
                "interests": interests,
                "recommended_fields": recommended_fields,
                "created_at": timezone.now(),
            }
        )

        # ---- Recommend colleges with those field types ----
        matched_colleges = College.objects.filter(
            college_types__name__in=top_field_names
        ).prefetch_related('college_types').distinct()


        college_data = []
        for college in matched_colleges:
            college_name = college.name
            matched_fields = [ct.name for ct in college.college_types.all() if ct.name in top_field_names]
            college_data.append({
                "id": college.id,
                "name": college.name,
                "city": college.city,
                "location": college.location,
                "matched_fields": matched_fields,
            })


        return Response({
            "user_id": user_id,
            "top_fields": top_fields,
            "recommended_colleges": college_data
        })

class CollegeDetailView(APIView):
    def get(self, request, college_id):
        try:
            college = College.objects.prefetch_related('college_types').get(id=college_id)
        except College.DoesNotExist:
            return Response({"error": "College not found"}, status=404)

        serializer = CollegeDetailSerializer(college)
        return Response(serializer.data)
