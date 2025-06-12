from django.contrib import admin
from django.urls import path, include
# from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserRegistrationView, UserLoginView, LogoutView, UserProfileView, TestQuestionListView, SubmitAnswerView, StudentAPTIScoreView, CheckTestStatusView, DeletePreviousAnswersView, PsychometricQuestionListView, SubmitPsychometricAnswersView, CollegeRecommendationView, CollegeDetailView

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('user-register/', UserRegistrationView.as_view(), name="user-register"),
    path('user-login/', UserLoginView.as_view(), name="user-login"),
    path('user-logout/', LogoutView.as_view(), name="user-logout"),
    # path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('get_apti_questions/', TestQuestionListView.as_view(), name="get-apti-questions"),
    path('user-profile/', UserProfileView.as_view(), name="user-profile"),
    path('apti-submit-answer/', SubmitAnswerView.as_view(), name='submit-answer'),
    path('student-apti-score/', StudentAPTIScoreView.as_view(), name='student-score'),
    path('check-test-status/', CheckTestStatusView.as_view(), name='CheckTestStatusView'),
    path('delete-previous-answers/', DeletePreviousAnswersView.as_view(), name='DeletePreviousAnswersView'),
    path('get-psychometric-questions/', PsychometricQuestionListView.as_view(), name='get-psychometric-questions'),
    path('submit-psychometric-questions/', SubmitPsychometricAnswersView.as_view(), name='submit-psychometric-questions'),
    path('college-recommendation/', CollegeRecommendationView.as_view(), name='college-recommendation'),
    path('college-details/<int:college_id>', CollegeDetailView.as_view(), name='college-details'),
    
    
]