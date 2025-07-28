from django.contrib import admin
from django.urls import path, include
# from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import AdminRegisterView, AdminLoginView,AdminLogoutView, CreateTestQuestionView, TestQuestionListView, SubmitAnswerView, StudentAPTIScoreView, TestCategoryView,AdminTestQuestionListView, GetQuestionsByCategoryView, PsychometricQuestionListView, SubmitPsychometricAnswersView, CreatePsychometricQuestionView, CollegeAPIView, CollegeTypeAPIView, CourseAPIView,CollegeCourseAPIView, CourseCutoffAPIView, TestCategoryUpdateDeleteView, DeleteTestQuestionView, UpdateTestQuestionView, UpdatePsychometricQuestionView, DeletePsychometricQuestionView, CollegeTypeDetailAPIView,AdminCollegeAPIView

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('admin-register/', AdminRegisterView.as_view(), name='admin-register'),
    path('admin-login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin-logout/', AdminLogoutView.as_view(), name='admin-logout'),
    path('create-apti-question/', CreateTestQuestionView.as_view(), name='create-apti-question'),
    path('apti-questions/', TestQuestionListView.as_view(), name='test-questions-list'),
    path('categories/', TestCategoryView.as_view(), name="test-categories"),
    path('admin-questions/', AdminTestQuestionListView.as_view(), name="admin-questions"),
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
    path('category/<int:pk>/', TestCategoryUpdateDeleteView.as_view(),name='category-updatedelete'),
    path('delete-apti-ques/<int:question_id>/', DeleteTestQuestionView.as_view(),name='delete-apti-question'),
    path('update-apti-ques/<int:question_id>/', UpdateTestQuestionView.as_view(),name='update-apti-ques'),
    path('update-psychiometric-ques/<int:pk>/', UpdatePsychometricQuestionView.as_view(),name='update-psychiometric-ques'),
    path('delete-psychiometric-ques/<int:pk>/', DeletePsychometricQuestionView.as_view(),name='delete-psychiometric-ques'),
    path('collegetype/<int:pk>/', CollegeTypeDetailAPIView.as_view(),name='updatecollegetype'),
    path('admincollege/<int:pk>/', AdminCollegeAPIView.as_view(),name='admincollege'),
    
]