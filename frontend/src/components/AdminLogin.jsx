import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuthContext';
import AdminNavigation from './AdminNavigation';


// import '../styles/AdminLogin.css';

function AdminLogin() {
    
  const { login } = useContext(AdminAuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/admin/admin-login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        // Save access, refresh, and user to AuthContext
        login(data.access_admin, data.refresh_admin,data.admin_username);
        console.log("access_admin",data.access_admin)
        console.log("access_admin",data.refresh_admin)
        console.log("admin_username",data.admin_username)
        console.log("data from admin login",data)
        
        navigate('/admin-dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };
  return (
    <>
    <AdminNavigation/>
      <div className="login-container">
      <h2>Admin Login</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <input type="username" name="username" placeholder="username" value={formData.email} onChange={handleChange} required/>

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">Login</button>
      </form><br/>
      
    </div>
    <h5>New to CareerGuide? <a href='/admin-register'>Register here</a></h5>
    </>
  )
}

export default AdminLogin
