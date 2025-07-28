import React from 'react'
import '../styles/UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

function UserDashboard() {
    const navigate = useNavigate();
  return (
    <>
    <Navigation/>
      <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome to the Dashboard!</h2>
      <p className="dashboard-description">
        You're almost there! Complete your profile and take the assessments to receive the most accurate college and career recommendations tailored just for you.
      </p>

      <div className="dashboard-buttons">
        <button className="dashboard-button update-button" onClick={() => navigate('/user-update-profile')}>Update Profile</button>
        <button className="dashboard-button assess-button" onClick={() => navigate('/user-apti-assess')}>Take Assessments</button>
        <button className="dashboard-button recommendation-button" onClick={() => navigate('/user-college-recommendation')}>Insights & Recommendations</button>
      </div>
    </div>
    </>
  )
}

export default UserDashboard
