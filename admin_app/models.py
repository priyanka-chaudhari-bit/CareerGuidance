from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model  # Import CustomUser model dynamically
from django.utils import timezone
User = get_user_model()

class AdminUser(AbstractUser):
    USERNAME_FIELD = "username"
    groups = models.ManyToManyField("auth.Group",related_name="admin_users",blank=True,help_text="The groups this user belongs to.",verbose_name="groups",)
    user_permissions = models.ManyToManyField("auth.Permission",related_name="admin_users_permissions",blank=True,help_text="Specific permissions for this user.",verbose_name="user permissions",)
    def __str__(self):
        return self.username
    
    is_admin = models.BooleanField(default=True)  

    def save(self, *args, **kwargs):
        self.is_admin = True  
        super().save(*args, **kwargs)

    class Meta:
        indexes = [
            models.Index(fields=['email']),  
        ]

class TestCategory(models.Model):
    name = models.CharField(max_length=100)  

    class Meta:
        indexes = [
            models.Index(fields=['name']),  
        ]
    def __str__(self):
        return self.name


class TestQuestion(models.Model):
    category = models.ForeignKey(TestCategory, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)  # Question text
    # correct_option = models.ForeignKey('TestOption', on_delete=models.SET_NULL, null=True, related_name='correct_for_question')

    def __str__(self):
        return self.text
    
    class Meta:
        indexes = [
            models.Index(fields=['category']),  
            models.Index(fields=['category', 'text']),  
        ]

class TestOption(models.Model):
    question = models.ForeignKey(TestQuestion, on_delete=models.CASCADE, related_name="options")
    text = models.CharField(max_length=255)  # Option text
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.question.text} - {self.text}"
    
    class Meta:
        indexes = [
            models.Index(fields=['question']),  
            models.Index(fields=['question', 'is_correct']),  
        ]
    
class PsychometricQuestion(models.Model):
    question_text = models.TextField()
    # options = models.JSONField()  # e.g., {"A": "Strongly Agree", "B": "Agree", ...}
    dimension = models.CharField(max_length=100)  # e.g., "Introversion", "Leadership"

class PsychometricOption(models.Model):
    question = models.ForeignKey(PsychometricQuestion, related_name="options", on_delete=models.CASCADE)
    option_text = models.CharField(max_length=255)  # e.g., "Strongly Agree"
    weight = models.IntegerField()  # e.g., 5
    # option_code = models.CharField(max_length=10)  # e.g., "A", "B", "C"

class PsychometricAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(PsychometricQuestion, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(PsychometricOption, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

class PsychometricResult(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    personality_type = models.CharField(max_length=50)
    interests = models.TextField()
    recommended_fields = models.TextField()
    alignment_score = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)


class StudentAnswer(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(TestQuestion, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(TestOption, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    # is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student.username} - {self.question.text} - {self.selected_option.text}"
    
    class Meta:
        indexes = [
            # models.Index(fields=['student']),  
            models.Index(fields=['question']),  
            models.Index(fields=['student', 'question']),  
        ]

class CollegeType(models.Model):
    name = models.CharField(max_length=100, unique=True)  # e.g., "Engineering", "Medical"

    def __str__(self):
        return self.name

class Course(models.Model):
    name = models.CharField(max_length=255)  # e.g., "Computer Science", "MBA", "MBBS"
    course_type = models.CharField(max_length=100)  # Optional: e.g., "Engineering", "Management"

class College(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=100)  # India / Abroad
    city = models.CharField(max_length=100)
    hostel_fees = models.DecimalField(max_digits=10, decimal_places=2)
    # courses_offered = models.TextField()  # Optional: use JSONField
    # cutoff_score = models.FloatField()
    ranking = models.IntegerField()
    scholarships = models.TextField(blank=True)
    placements = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    college_types = models.ManyToManyField(CollegeType, related_name='colleges')
    recognized_by = models.CharField(max_length=255)
    about = models.TextField(blank=True)
    established_year = models.IntegerField( blank=True)
    top_recruiters =models.TextField(blank=True)
    entrance_exams = models.JSONField(blank=True, default=list)  
    average_package = models.CharField(max_length=50, blank=True)
    institute_type = models.CharField(max_length=100,blank=True)

class CollegeCourse(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    tuition_fees = models.DecimalField(max_digits=10, decimal_places=2)
    placements = models.TextField(blank=True)
    eligibility_criteria = models.TextField()
    category = models.CharField(max_length=50, blank=True)  # e.g., 'Open', 'OBC', 'SC', 'ST'
    cutoff_score = models.FloatField(blank=True, null=True) 
    selection_criteria = models.TextField(blank=True)
    def __str__(self):
        return f"{self.college.name} - {self.course.name}"

class CourseCutoff(models.Model):
    college_course = models.ForeignKey(CollegeCourse, on_delete=models.CASCADE)
    category = models.CharField(max_length=50)  # e.g., 'Open', 'OBC', 'SC', 'ST'
    cutoff_score = models.FloatField()
    class Meta:
        unique_together = ('college_course', 'category')
    def __str__(self):
        return f"{self.college_course} ({self.category})"

