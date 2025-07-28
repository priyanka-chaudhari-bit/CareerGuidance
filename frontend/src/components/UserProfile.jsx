import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
// import { secureFetch } from '../hooks/api';
import useSecureFetch from '../hooks/useSecureFetch';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Navigation from './Navigation';

function UserProfile() {
    
  const { authToken } = useContext(AuthContext);
  const secureFetch = useSecureFetch();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await secureFetch('http://127.0.0.1:8000/students/user-profile/');

        const data = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          setError(data.message || 'Failed to load profile.');
        }
      } catch (err) {
        setError('Network error');
      }
    };

    if (authToken) {
      fetchProfile();
    }
  }, [authToken]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  const {
    name,
    email,
    anon_username,
    cgpa,
    entrance_exam,
    entrance_score,
    preferred_location,
    desired_course,
    preferred_city,
    tenth_marks,
    twelfth_marks,
    graduation_marks,
    postgraduation_marks,
    aptitude_score,
    interests,
    recommended_fields,
    personality_type,
    category_score_mapping
  } = profile;

  const hasAssessmentData =
    aptitude_score !== null;
    // interests ||
    // recommended_fields ||
    // personality_type ||
    // (category_score_mapping && Object.keys(category_score_mapping).length > 0);

  return (
    <>
    <Navigation/>
  <div style={{
    maxWidth: '1000px',
    margin: 'auto',
    padding: '0 2rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2.5rem',
    justifyContent: 'space-between',
  }}>
   
    <div style={{ width: '100%', textAlign: 'center', marginBottom: '0.6rem' }}>
      <h2 style={{ fontSize: '2rem' }}><i className="fa-solid fa-user" style={{color: '#543a9c'}}></i> Profile Details</h2>
    </div>

   
    <div style={{ flex: '1 1 50%', minWidth: '300px' }}>
      {/* <h3>Profile Details</h3> */}
      {/* <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Username:</strong> {anon_username}</p>
      <p><strong>CGPA:</strong> {cgpa}</p>
      <p><strong>Entrance Exam:</strong> {entrance_exam}</p>
      <p><strong>Entrance Score:</strong> {entrance_score}</p>
      <p><strong>Preferred Location:</strong> {preferred_location}</p>
      <p><strong>Preferred City:</strong> {preferred_city}</p>
      <p><strong>Desired Course:</strong> {desired_course}</p>
      <p><strong>10th Marks:</strong> {tenth_marks}</p>
      <p><strong>12th Marks:</strong> {twelfth_marks}</p>
      {graduation_marks && <p><strong>Graduation Marks:</strong> {graduation_marks}</p>}
      {postgraduation_marks && <p><strong>Post Graduation Marks:</strong> {postgraduation_marks}</p>} */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.95rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}>
        <tbody>
            {[
            ['Name', name],
            ['Email', email],
            ['Username', anon_username],
            ['CGPA', cgpa],
            ['Entrance Exam', entrance_exam],
            ['Entrance Score', entrance_score],
            ['Preferred Location', preferred_location],
            ['Preferred City', preferred_city],
            ['Desired Course', desired_course],
            ['10th Marks', tenth_marks],
            ['12th Marks', twelfth_marks],
            graduation_marks && ['Graduation Marks', graduation_marks],
            postgraduation_marks && ['Post Graduation Marks', postgraduation_marks],
            ]
            .filter(Boolean)
            .map(([label, value]) => (
                <tr key={label} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px 15px', fontWeight: 600, color: '#333' }}>{label}</td>
                <td style={{ padding: '10px 15px', color: '#555' }}>{value}</td>
                </tr>
            ))}
        </tbody>
        </table>

    </div>

   
    <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
      {hasAssessmentData ? (
        <>
          <h3><i className="fa-solid fa-brain" style={{color: "#d251c7"}}></i> Assessment Insights</h3>
          {aptitude_score && <p><strong>Aptitude Score:</strong> {aptitude_score.toFixed(2)}</p>}
          {personality_type && <p><strong>Personality Type:</strong> {personality_type}</p>}
          {interests && <p><strong>Interests:</strong> {interests}</p>}
          {recommended_fields && <p><strong>Recommended Fields:</strong> {recommended_fields}</p>}
          {category_score_mapping && (
            <div>
              <strong>Category Scores:</strong>
              <ul style={{ marginLeft: '1rem' }}>
                {Object.entries(category_score_mapping).map(([category, score]) => (
                  <li key={category}>{category}: {score}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div style={{
          background: '#f9f9f9',
          padding: '1.2rem',
          borderRadius: '6px',
          boxShadow: '0 0 10px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>
            <i className="fa-solid fa-star" style={{color: '#FFD43B'}}></i> Want to discover your strengths?
          </h4>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            Take a quick assessment to unlock:
          </p>
          <ul style={{ marginLeft: '1rem' }}>
            <li>Recommended fields</li>
            <li>Interest mapping</li>
            <li>Personality insights</li>
            <li>Category-wise scores</li>
          </ul>
          <a
            href="/user-apti-assess"
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '10px 20px',
              background: '#007bff',
              color: '#fff',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Start Assessment
          </a>
        </div>
      )}
    </div>
  </div>
</>

  )
}

export default UserProfile
