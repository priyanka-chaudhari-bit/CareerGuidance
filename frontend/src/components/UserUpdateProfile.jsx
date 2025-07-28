import React, { useState,useContext, useEffect } from 'react';
import '../styles/UserUpdateProfile.css';
import { AuthContext } from '../context/AuthContext';
import useSecureFetch from '../hooks/useSecureFetch';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
function UserUpdateProfile() {
  // const token = localStorage.getItem('token'); 
  const { authToken } = useContext(AuthContext);
  const secureFetch = useSecureFetch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // anon_username: '',
    name: '',
    email: '',
    cgpa: '',
    entrance_exam: '',
    entrance_score: '',
    preferred_location: '',
    desired_course: '',
    aptitude_score: '',
    // interest_mapping: {},
    preferred_city: '',
    tenth_marks: '',
    twelfth_marks: '',
    graduation_marks: '',
    postgraduation_marks: '',
  });

  useEffect(() => {
    console.log("AuthToken inside useEffect:", authToken); // ✅ Debug log
    if (!authToken) return;
    const fetchProfile = async () => {
      try {
        // const res = await fetch('http://127.0.0.1:8000/students/user-profile/', {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${authToken}`,
        //   },
        // });
        const res = await secureFetch('http://127.0.0.1:8000/students/user-profile/');
        console.log("GET response status:", res.status);
        if (res.ok) {
          const data = await res.json();
          console.log("data",data)
          setFormData({
            anon_username: data.anon_username || '',
            name: data.name || '',
            email: data.email || '',
            cgpa: data.cgpa || '',
            entrance_exam: data.entrance_exam || '',
            entrance_score: data.entrance_score || '',
            preferred_location: data.preferred_location || '',
            desired_course: data.desired_course || '',
            // aptitude_score: data.aptitude_score || '',
            preferred_city: data.preferred_city || '',
            tenth_marks: data.tenth_marks || '',
            twelfth_marks: data.twelfth_marks || '',
            graduation_marks: data.graduation_marks || '',
            postgraduation_marks: data.postgraduation_marks || '',
          });
        } else {
          const errData = await res.text();
          console.error('Failed to fetch profile', res.status, errData);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [authToken]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedData = {};
    Object.keys(formData).forEach((key) => {
      cleanedData[key] = formData[key] === '' ? null : formData[key];
    });

    try {
      const res = await secureFetch('http://127.0.0.1:8000/students/user-profile/', {
        method: 'PATCH',
        // headers: {
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${authToken}`
        // },
        body: JSON.stringify(cleanedData)
      });

      const result = await res.json();
      console.log("result",result)
      if (res.ok) {
        alert('Profile updated successfully');
        navigate('/user-dashboard');
      } else {
        alert('Update failed: ' + JSON.stringify(result));
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <>
    <Navigation/>
    <form onSubmit={handleSubmit} className="profile-form">
      <label>UserName</label>
      <input type="text" name="anon_username" placeholder="Username" value={formData.anon_username} onChange={handleChange} disabled />
      <label>Name</label>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} disabled />
      <label>Email</label>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} disabled />
      <label>CGPA</label>
      <input type="number" name="cgpa" placeholder="CGPA" value={formData.cgpa} onChange={handleChange} step="any"/>
      <label>Entrance Exam <span className="required-star">*</span></label>
      <input type="text" name="entrance_exam" placeholder="Entrance Exam" value={formData.entrance_exam} onChange={handleChange} required/>
      <label>Entrance Score <span className="required-star">*</span></label>
      <input type="number" name="entrance_score" placeholder="Entrance Score" value={formData.entrance_score} onChange={handleChange} step="any" required/>
      <label>Preferred Location(India/ Abroad)</label>
      <input type="text" name="preferred_location" placeholder="Preferred Location" value={formData.preferred_location} onChange={handleChange} />
      <label>Desired Course</label>
      <input type="text" name="desired_course" placeholder="Desired Course" value={formData.desired_course} onChange={handleChange} />
      {/* <label>Aptitude Score</label>
      <input type="number" name="aptitude_score" placeholder="Aptitude Score" onChange={handleChange} /> */}
      <label>Preferred City</label>
      <input type="text" name="preferred_city" placeholder="Preferred City" value={formData.preferred_city} onChange={handleChange} />
      <label>Tenth Marks <span className="required-star">*</span></label>
      <input type="number" name="tenth_marks" placeholder="Tenth Marks" value={formData.tenth_marks} onChange={handleChange} step="any" min='0' required/>
      <label>Twelfth Marks <span className="required-star">*</span></label>
      <input type="number" name="twelfth_marks" placeholder="Twelfth Marks" value={formData.twelfth_marks} onChange={handleChange} step="any" required/>
      <label>Graduation Marks</label>
      <input type="number" name="graduation_marks" placeholder="Graduation Marks" value={formData.graduation_marks} onChange={handleChange} step="any"/>
      <label>Postgraduation Marks</label>
      <input type="number" name="postgraduation_marks" placeholder="Postgraduation Marks" value={formData.postgraduation_marks} onChange={handleChange} step="any"/>
      <button type="submit">Update Profile</button>
    </form>
    </>
  );
}

export default UserUpdateProfile
