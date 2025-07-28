import React, { useState,useContext } from 'react';
import '../styles/UserRegister.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navigation from './Navigation';

function validatePassword(password) {
  const validations = {
    minLength: password.length >= 10,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(validations).filter(Boolean).length;
  return { validations, score };
}

function UserRegister() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    anon_username: '',
    password: '',
  });
  const [passwordValidations, setPasswordValidations] = useState({});
  const [passwordScore, setPasswordScore] = useState(0);


  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [suggestedUsername, setSuggestedUsername] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setMessage('');
    setSuggestedUsername('');
    if (name === 'password') {
    const { validations, score } = validatePassword(value);
    setPasswordValidations(validations);
    setPasswordScore(score);
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      name: formData.name,
      anon_username: formData.anon_username,
      password: formData.password,
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/students/user-register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.status === 201) {
        // localStorage.setItem('accessToken', data.access);
        // localStorage.setItem('refreshToken', data.refresh);
        login(data.access, data.refresh, data.user);
        setMessage('User registered successfully!');
        setFormData({ name: '', email: '', anon_username: '', password: ''  });
        navigate('/user-dashboard');
      } else if (res.status === 400) {
        if (data.suggestion) {
          setSuggestedUsername(data.suggestion);
          setError(data.message);
        } else if (data.email) {
          setError(data.email[0]);
        } else {
          setError('Something went wrong.');
        }
      } else {
        setError('Unexpected error occurred.');
      }
      
    } catch (err) {
      console.error(err);
      setError('Failed to connect to server.');
    }
  };
  return (
    <>
    <Navigation/>
      <div className="register-container">
    <h2>Sign Up</h2>
    {message && <p className="message">{message}</p>}
    {error && <p className="error">{error}</p>}
    {suggestedUsername && (
        <p className="suggestion">
          Suggested username: <strong>{suggestedUsername}</strong>
        </p>
      )}
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
      <input type="text" name="anon_username" placeholder="Username" value={formData.anon_username} onChange={handleChange} required/>
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}  required/>
      {/* Password strength meter */}
      <div style={{ height: '8px', width: '100%', background: '#ddd', marginTop: '6px' }}>
        <div
          style={{
            height: '100%',
            width: `${(passwordScore / 5) * 100}%`,
            background: passwordScore <= 1 ? 'red' : passwordScore <= 3 ? 'orange' : 'green',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Password validation rules */}
      <ul style={{ listStyle: 'none', padding: '0', fontSize: '13px', marginTop: '8px' }}>
        <li style={{ color: passwordValidations.minLength ? 'green' : 'gray' }}>
          {passwordValidations.minLength ? '✔' : '✘'} At least 10 characters
        </li>
        <li style={{ color: passwordValidations.uppercase ? 'green' : 'gray' }}>
          {passwordValidations.uppercase ? '✔' : '✘'} At least one uppercase letter
        </li>
        <li style={{ color: passwordValidations.lowercase ? 'green' : 'gray' }}>
          {passwordValidations.lowercase ? '✔' : '✘'} At least one lowercase letter
        </li>
        <li style={{ color: passwordValidations.digit ? 'green' : 'gray' }}>
          {passwordValidations.digit ? '✔' : '✘'} At least one digit
        </li>
        <li style={{ color: passwordValidations.specialChar ? 'green' : 'gray' }}>
          {passwordValidations.specialChar ? '✔' : '✘'} At least one special character
        </li>
      </ul>

      <button className="w-full bg-blue-600 p-2 rounded" disabled={passwordScore < 5} style={{ backgroundColor: passwordScore < 5 ? '#ccc' : '#2563eb', color: passwordScore < 5 ? '#666' : '#fff', cursor: passwordScore < 5 ? 'not-allowed' : 'pointer', border: 'none' }}>Register</button>
    </form>
    </div>
    <h5>Already Registered? <a href='/user-login'>Login here</a></h5>
    </>
  )
}

export default UserRegister
