from rest_framework import serializers
from .models import TestCategory, TestQuestion, TestOption, StudentAnswer, TestCategory, PsychometricOption, PsychometricQuestion, PsychometricAnswer, CollegeType, Course, College, CollegeCourse, CourseCutoff

class TestOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestOption
        # fields = '__all__'
        fields = ['id', 'text']

# class TestQuestionSerializer(serializers.ModelSerializer):
#     category = serializers.CharField(source='category.name', read_only=True)  
#     options = TestOptionSerializer(many=True)

#     class Meta:
#         model = TestQuestion
#         fields = ["category", "text", "options"]

#     def validate_category(self, value):
#         """
#         Ensure the category name exists in the database.
#         """
#         if not TestCategory.objects.filter(name=value).exists():
#             raise serializers.ValidationError(f"Category '{value}' does not exist. Please choose a valid category.")
#         return value

#     def create(self, validated_data):
#         category_name = validated_data.pop("category")  # Extract category name
#         options_data = validated_data.pop("options")  # Extract options data

#         category = TestCategory.objects.get(name=category_name)
#         test_question = TestQuestion.objects.create(category=category, **validated_data)

#         for option_data in options_data:
#             TestOption.objects.create(question=test_question, **option_data)

#         return test_question

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

    def create(self, validated_data):
        request_data = self.context['request'].data
        options_data = request_data.get('options', [])

        if not options_data:
            raise serializers.ValidationError("Each question must have options.")
        # Create the question

        # Count the correct options
        correct_options_count = sum(1 for option in options_data if option.get('is_correct', False))
        
        if correct_options_count != 1:
            raise serializers.ValidationError("Each question must have exactly one correct option.")
        
        category_name = validated_data.pop('category')
        category = TestCategory.objects.get(name=category_name)

        question = TestQuestion.objects.create(category=category,**validated_data)

        # Create options
        for option_data in options_data:
            TestOption.objects.create(question=question, **option_data)

        return question
        
class TestCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCategory
        fields = ['id', 'name']

class PsychometricOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PsychometricOption
        fields = ['id', 'option_text', 'weight']

class PsychometricQuestionCreateSerializer(serializers.ModelSerializer):
    options = PsychometricOptionSerializer(many=True)

    class Meta:
        model = PsychometricQuestion
        fields = ['id', 'question_text', 'dimension', 'options']
    def create(self, validated_data):
        options_data = validated_data.pop('options')
        question = PsychometricQuestion.objects.create(**validated_data)
        for option_data in options_data:
            PsychometricOption.objects.create(question=question, **option_data)
        return question
    def create_many(self, validated_data_list):
        return [self.create(item) for item in validated_data_list]

    def save(self, **kwargs):
        if isinstance(self.validated_data, list):
            return self.create_many(self.validated_data)
        return super().save(**kwargs)

class PsychometricQuestionSerializer(serializers.ModelSerializer):
    options = PsychometricOptionSerializer(many=True, read_only=True)

    class Meta:
        model = PsychometricQuestion
        fields = ['id', 'question_text', 'dimension', 'options']


class PsychometricAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PsychometricAnswer
        fields = ['question', 'selected_option']


class StudentAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAnswer
        fields = ['student', 'question', 'selected_option']
    def validate(self, data):
        """Ensure the selected option belongs to the question"""
        question = data['question']
        selected_option = data['selected_option']

        if selected_option.question != question:
            raise serializers.ValidationError("Selected option does not belong to the given question.")

        return data
    
class CollegeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeType
        fields = ['id', 'name']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'course_type']

# class CollegeSerializer(serializers.ModelSerializer):
#     college_types = serializers.PrimaryKeyRelatedField(
#         queryset=CollegeType.objects.all(), many=True
#     )
#     class Meta:
#         model = College
#         fields = [
#             'id', 'name', 'location', 'city', 'hostel_fees',
#             'ranking', 'scholarships', 'placements', 'college_types',
#             'recognized_by', 'about', 'established_year', 'top_recruiters'
#         ]
class CollegeSerializer(serializers.ModelSerializer):
    college_types = serializers.ListField(child=serializers.CharField(), write_only=True)
    college_types_display = serializers.SerializerMethodField(read_only=True)
    entrance_exams = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = College
        fields = [
            'id', 'name', 'location', 'city', 'hostel_fees',
            'ranking', 'scholarships', 'placements', 'college_types',
            'recognized_by', 'about', 'established_year', 'top_recruiters',
            'college_types_display', 'entrance_exams', 'average_package', 'institute_type'
        ]

    def create(self, validated_data):
        college_type_names = validated_data.pop("college_types", [])
        college = College.objects.create(**validated_data)
        college_type_ids = CollegeType.objects.filter(name__in=college_type_names).values_list("id", flat=True)
        college.college_types.set(college_type_ids)
        return college

    def get_college_types_display(self, obj):
        return [ct.name for ct in obj.college_types.all()]
    
    # def to_representation(self, instance):
    #     rep = super().to_representation(instance)
    #     rep["college_types"] = [ct.name for ct in instance.college_types.all()]
    #     rep.pop("college_types_display", None)  
    #     return rep


class CollegeCourseSerializer(serializers.ModelSerializer):
    college = serializers.CharField(write_only=True)
    course = serializers.CharField(write_only=True)
    college_id = serializers.IntegerField(source='college.id', read_only=True)
    course_id = serializers.IntegerField(source='course.id', read_only=True)
    college_name = serializers.CharField(source='college.name', read_only=True)
    course_name = serializers.CharField(source='course.name', read_only=True)
    class Meta:
        model = CollegeCourse
        fields = '__all__'
    def create(self, validated_data):
        college_name = validated_data.pop('college')
        course_name = validated_data.pop('course')

        try:
            college = College.objects.get(name__iexact=college_name)
        except College.DoesNotExist:
            raise serializers.ValidationError({'college': 'College not found'})

        try:
            course = Course.objects.get(name__iexact=course_name)
        except Course.DoesNotExist:
            raise serializers.ValidationError({'course': 'Course not found'})

        return CollegeCourse.objects.create(college=college, course=course, **validated_data)

class CourseCutoffSerializer(serializers.ModelSerializer):
    college = serializers.CharField(write_only=True)
    course = serializers.CharField(write_only=True)

    college_course_id = serializers.IntegerField(source='college_course.id', read_only=True)
    college_name = serializers.CharField(source='college_course.college.name', read_only=True)
    course_name = serializers.CharField(source='college_course.course.name', read_only=True)
    class Meta:
        model = CourseCutoff
        fields = ['college', 'course', 'category', 'cutoff_score','college_course_id', 'college_name', 'course_name']
    def create(self, validated_data):
        college_name = validated_data.pop('college')
        course_name = validated_data.pop('course')

        try:
            college = College.objects.get(name__iexact=college_name)
        except College.DoesNotExist:
            raise serializers.ValidationError({'college': 'College not found'})

        try:
            course = Course.objects.get(name__iexact=course_name)
        except Course.DoesNotExist:
            raise serializers.ValidationError({'course': 'Course not found'})

        try:
            college_course = CollegeCourse.objects.get(college=college, course=course)
        except CollegeCourse.DoesNotExist:
            raise serializers.ValidationError({'college_course': 'CollegeCourse mapping not found'})

        return CourseCutoff.objects.create(college_course=college_course, **validated_data)

