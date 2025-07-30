# Career Guidance

Students and parents often face difficulties when it comes to gathering detailed information about colleges, including tuition fees, eligibility criteria, scholarships, placements, and more. This application helps students find the most suitable college and course based on their academic records, interests, aptitude, and psychometric assessments. It supports decision-making for both Indian and international institutions. Using Admin Panel admin can create, edit and delete college information and assessment test questions. Students can attempt test and get college recommendations and interests using user panel.

#  Setup & Installation Guide
## Prerequisites:
- Python 3.9+ 
- Node.js & npm (for React) 
- MySQL 
- Git 
- Virtualenv
  
## Backend (Django) Setup

  a)  Clone this Repository
  
  b)  Create and activate virtual environment
    
  ```
    python -m venv venv
  ```
  or
  ```
    py -m venv venv 
    venv\Scripts\activate
  ```

 c)  Install dependencies
 
    ```
    pip install -r requirements.txt 
    ```
    
 d) Configure MySQL Database 

   Make sure MySQL server is running 
   Update your settings.py with your local DB credentials: 
   
  ```
    DATABASES = { 
      'default': { 
          'ENGINE': 'django.db.backends.mysql', 
          'NAME': 'career_guidance', # Ensure this DB exists in your  MySQL server 
          'USER': '<your-username>', 
          'PASSWORD': '<your-password>', 
          'HOST': 'localhost', 
          'PORT': '3306', 
          'OPTIONS': { 
              'charset': 'utf8mb4', 
          }, 
   
      } 
  }
  ```

  Note: Make sure you've already created a database named career_guidance in MySQL before running migrations. 

  e) Run migrations 
  ```
  python manage.py makemigrations 
  python manage.py migrate
  ```
  f) Run the Django server 
    ```
      python manage.py runserver
    ```

  ## Frontend (React) Setup
  
  a) Open a new terminal and go to the frontend directory:
    ```
    cd frontend 
    ```
  b) Install frontend dependencies
    ```
    npm install 
    ```
  c) Start the React app 

  ```
  npm start
  ```

  d) Setup Instructions 

  Since this project uses a local MySQL Server, the database is not hosted online. Therefore, simply cloning the repository will not provide access to the required data. You must manually import the initial data for the application to function correctly. Ensure all required fields are populated; these are critical for: 
    - Assessments to run correctly 
    - College recommendations to work 
    - User profile interest/personality mapping 

  There are two options: 
  ### Option 1: Insert Data Manually (via Admin Panel)
  
  - Run the Django server using python manage.py runserver. 
  - Open the admin panel from home page 
  - Register and Login 
  - Insert required data in the same order as shown in the side panel

  ### Option 2: Import Provided SQL Dump (Recommended) 
  - In the root folder of the cloned project, you'll find a folder named CareerGuidanceData, which contains all the SQL dump files.
  - Open MySQL Workbench.
  - Navigate to: Server → Data Import.
  - Choose "Import from Dump Project Folder".
  - Browse and select the CareerGuidanceData folder location.
  - Click on "Load Folder Contents".
  - Select the schema career_guidance.
  - Under Import Progress, click Start Import.
After import, verify the tables and data to ensure the setup is successful.

  ## Modules 
  
  1. User Module (Student)
     
     - User Registration & Login using JWT
     - Update Profile
     - View Recommendations
       
  2. Aptitude Test
     
     - User takes MCQ test via React
     - Answers sent to backend 
     - Django evaluates score 
     - Result stored in MySQL
       
  3. Psychometric Test
     
     - Personality-type questionnaire
     - Responses sent to Django
     - Analysis logic determines personality type
     - Result stored & rendered
       
  4. Interest & Personality Viewer
     
     - Combines aptitude + psychometric result
     - React UI displays result with icons
       
  5. College Recommendation
     
     - Backend filters colleges from MySQL
     - Based on test results & user preferences
     - API returns list; frontend displays suggestions
       
  6. Admin Panel (Django Admin)
     
     - Admin Register and Login
     - Add / Edit / Delete:
         - Colleges
         - Aptitude Questions
         - Psychometric Questions
         - College Courses
           
  ## Tech Stack Used
  
  | Component            | Technology Used                              |
  | -------------------- | -------------------------------------------- |
  | Frontend             | HTML, CSS, JavaScript, React, Phosphor Icons |
  | Backend (Serverless) | Django with Django REST Framework            |
  | Database             | MySQL                                        |
  | Authentication       | JWT                                          |

  ## Features Summary

  ### User Features
  
  | Feature                        | Description                                                           |
  | ------------------------------ | --------------------------------------------------------------------- |
  | User Registration              | Users can sign up with email, password                                |
  | Login/Logout                   | Secure login using Django auth system                                 |
  | Profile Management             | Users can view and update their personal information                  |
  | Aptitude Test                  | Users take an MCQ-based aptitude test; score is calculated and stored |
  | Psychometric Test              | Users complete a personality test; results determine personality type |
  | Interest & Personality Summary | Display of aptitude score, interest areas, and personality type       |
  | College Recommendations        | Suggested colleges based on test results and preferences              |

  ### Admin Features

  | Feature                       | Description                                                           |
  | ----------------------------- | --------------------------------------------------------------------- |
  | Login to Admin Panel          | Secured Django admin panel login                                      |
  | Manage Colleges               | Add, edit, delete college entries with fields like name, course, tags |
  | Manage Aptitude Questions     | Add, update, and remove aptitude test questions                       |
  | Manage Psychometric Questions | Maintain personality questions and categories                         |

  



     
       

