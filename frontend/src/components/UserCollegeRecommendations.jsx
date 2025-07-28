import React, { useEffect, useState, useContext } from 'react';
import useSecureFetch from '../hooks/useSecureFetch';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

function UserCollegeRecommendations() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const secureFetch = useSecureFetch();
  const { authToken } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("Fetching profile")
      const fetchProfile = async () => {
        try {
          const res = await secureFetch('http://127.0.0.1:8000/students/user-profile/');
  
          const data = await res.json();
          if (res.ok) {
            setProfile(data);
            console.log('fetched user profile',data)
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

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const res = await secureFetch("http://127.0.0.1:8000/students/college-recommendation/");
        const data = await res.json();
        setRecommendations(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch college recommendations", err);
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [authToken]);

  if (loading) return <p>Loading recommendations...</p>;
  if (!recommendations) return <p>Unable to load recommendations.</p>;
  if (!profile) {
      return <p>Loading profile...</p>;
    }
    
  const { top_fields, recommended_colleges } = recommendations;
    
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
    aptitude_score !== null 
    // interests ||
    // recommended_fields ||
    // personality_type;
    // // (category_score_mapping && Object.keys(category_score_mapping).length > 0);

  console.log('hasAssessmentData',hasAssessmentData)


  return (
    <>
    <Navigation/>
    {hasAssessmentData ? (
      <>
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}><i className="fa-solid fa-bullseye" style={{color: "#b00c14"}}></i> Your Top Recommended Fields!</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {top_fields.map(([field, score], index) => (
          <li key={index} style={{ background: '#f1f5f9', padding: '1rem 1.5rem', borderRadius: '10px', boxShadow: '0 0 5px #ccc' }}>
            <strong>{field}</strong> <br /> Score: {score.toFixed(2)}
          </li>
        ))}
      </ul>

      <h2 style={{ textAlign: 'center', margin: '2rem 0 1rem' }}><i className="fa-solid fa-building-columns" style={{color: "#5d0824"}}></i> Recommended Colleges</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {recommended_colleges.map((college) => (
          <div key={college.id} style={{ background: '#FFFFFB', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#1f2937' }}>{college.name}</h4>
            <p style={{ margin: '0.5rem 0', color: '#4b5563' }}><strong>City:</strong> {college.city}</p>
            <p style={{ margin: '0.5rem 0', color: '#4b5563' }}><strong>Location:</strong> {college.location}</p>
            <p style={{ margin: '0.5rem 0', color: '#10b981' }}>
              <strong>Matched Fields:</strong> {college.matched_fields.join(', ')}
            </p>
            <button
              onClick={() => navigate(`/college-details/${college.id}`)}
              style={{
                marginTop: '1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
    </>) : (
        <div style={{
          background: '#f9f9f9',
          padding: '1.2rem',
          borderRadius: '6px',
          boxShadow: '0 0 10px rgba(0,0,0,0.05)',
          display:'flex',justifyContent:'center',flexDirection:'column',maxWidth:'50%',alignItems:'center',margin:'2rem auto'
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
    </>
  );
}

export default UserCollegeRecommendations;
