from django.contrib import admin
from django.urls import path, include
# from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import AdminRegisterView, AdminLoginView,AdminLogoutView, CreateTestQuestionView, TestQuestionListView, SubmitAnswerView, StudentAPTIScoreView, TestCategoryView, GetQuestionsByCategoryView, PsychometricQuestionListView, SubmitPsychometricAnswersView, CreatePsychometricQuestionView, CollegeAPIView, CollegeTypeAPIView, CourseAPIView,CollegeCourseAPIView, CourseCutoffAPIView

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('admin-register/', AdminRegisterView.as_view(), name='admin-register'),
    path('admin-login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin-logout/', AdminLogoutView.as_view(), name='admin-logout'),
    path('create-apti-question/', CreateTestQuestionView.as_view(), name='create-test-question'),
    path('apti-questions/', TestQuestionListView.as_view(), name='test-questions-list'),
    path('categories/', TestCategoryView.as_view(), name="test-categories"),
    path('questions-by-category/', GetQuestionsByCategoryView.as_view(), name='questions_by_category'),
    path('apti-submit-answer/', SubmitAnswerView.as_view(), name='submit-answer'),
    path('student-apti-score/<int:student_id>/', StudentAPTIScoreView.as_view(), name='student-score'),
    path('psychometric/create-questions/', CreatePsychometricQuestionView.as_view()),
    path('psychometric/get-questions/', PsychometricQuestionListView.as_view()),
    path('psychometric/submit/', SubmitPsychometricAnswersView.as_view()),
    path('college-types/', CollegeTypeAPIView.as_view(),name='college-types'),
    path('courses/', CourseAPIView.as_view(),name='courses'),
    path('colleges/', CollegeAPIView.as_view(),name='colleges'),
    path('college-courses/', CollegeCourseAPIView.as_view(),name='college-courses'),
    path('course-cutoffs/', CourseCutoffAPIView.as_view(),name='course-cutoffs'),
    
]