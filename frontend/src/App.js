import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Navigation  from './components/Navigation';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import UserDashboard from './components/UserDashboard';
import UserUpdateProfile from './components/UserUpdateProfile';
import UserProfile from './components/UserProfile';
import UserAptiAsess from './components/UserAptiAsess';
import UserPsychometricAsses from './components/UserPsychometricAsses';
import UserTotalScore from './components/UserTotalScore';
import UserCollegeRecommendations from './components/UserCollegeRecommendations';
import CollegeDetails from './components/CollegeDetails';
import AdminDashboard from './components/AdminDashboard';
import AdminCollegeDetails from './components/AdminCollegeDetails';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
// import CreateTestCategory fro
function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          {/* <Navigation /> */}
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/user-update-profile" element={<UserUpdateProfile />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-apti-assess" element={<UserAptiAsess />} />
            <Route path="/user-psychometric-test" element={<UserPsychometricAsses />} />
            <Route path="/user-get-score" element={<UserTotalScore />} />
            <Route path="/user-college-recommendation" element={<UserCollegeRecommendations />} />
            <Route path="/college-details/:id" element={<CollegeDetails />} />

            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-collegedetails/:id" element={<AdminCollegeDetails />} />
            {/* <Route path="/admin/create-test-category" element={<CreateTestCategory />} />
            <Route path="/admin/create-apti-questions" element={<CreateAptiQuestions />} />
            <Route path="/admin/create-psycho-questions" element={<CreatePsychometricQuestions />} />
            <Route path="/admin/add-college-category" element={<AddCollegeCategory />} />
            <Route path="/admin/add-college-info" element={<AddCollegeInfo />} />
            <Route path="/admin/add-college-courses" element={<AddCollegeCourses />} />
            <Route path="/admin/add-cutoffs" element={<AddCutoffs />} />
            <Route path="/admin/add-courses" element={<AddCourses />} /> */}

          </Routes>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}


export default App;
// function UserRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/user-login" element={<UserLogin />} />
//       <Route path="/user-register" element={<UserRegister />} />
//       <Route path="/user-dashboard" element={<UserDashboard />} />
//       <Route path="/user-update-profile" element={<UserUpdateProfile />} />
//       <Route path="/user-profile" element={<UserProfile />} />
//       <Route path="/user-apti-assess" element={<UserAptiAsess />} />
//       <Route path="/user-psychometric-test" element={<UserPsychometricAsses />} />
//       <Route path="/user-get-score" element={<UserTotalScore/>} />
//       <Route path="/user-college-recommendation" element={<UserCollegeRecommendations/>} />
//       <Route path="/college-details/:id" element={<CollegeDetails/>} />

//     </Routes>
//   );
// }
// function AdminRoutes() {
//   return (
//     <Routes>
//       <Route path="/admin-login" element={<AdminLogin />} />
//       <Route path="/admin-register" element={<AdminRegister />} />
//       <Route path="/admin-dashboard" element={<AdminDashboard/>} />
//       {/* more admin routes */}
//     </Routes>
//   );
// }

