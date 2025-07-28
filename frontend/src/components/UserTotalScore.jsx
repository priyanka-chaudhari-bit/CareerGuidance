import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useSecureFetch from '../hooks/useSecureFetch';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

function UserTotalScore() {
  const { authToken } = useContext(AuthContext);
  const secureFetch = useSecureFetch();
  const navigate = useNavigate();

  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScore() {
      try {
        const res = await secureFetch('http://127.0.0.1:8000/students/student-apti-score/');
        const data = await res.json();
        setScoreData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch score", error);
        setLoading(false);
      }
    }

    fetchScore();
  }, [authToken]);

  if (loading) return <p>Loading score...</p>;
  if (!scoreData) return <p>Failed to load score.</p>;

  const { name, aptitude_score, category_score_mapping, interests, recommended_fields, personality_type } = scoreData;

  const showRecommendationsPrompt = !interests || !recommended_fields || !personality_type;

  return (
    <>
    <Navigation/>
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Hello, {name}! </h2>
      <h3 style={{ textAlign: 'center', color: '#4b5563' }}>Your Total Aptitude Score: <span style={{ color: '#2563eb' }}>{aptitude_score.toFixed(2)}</span></h3>

      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ color: '#111827' }}>Category-wise Scores:</h4>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {Object.entries(category_score_mapping).map(([category, score]) => (
            <li key={category} style={{ marginBottom: '0.5rem', background: '#e5e7eb', padding: '0.5rem 1rem', borderRadius: '6px' }}>
              <strong>{category}:</strong> {score.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      {showRecommendationsPrompt ? (
        <div style={{ marginTop: '2rem', textAlign: 'center', background: '#fff4e5', padding: '1rem', borderRadius: '10px', border: '1px solid #facc15' }}>
          <p style={{ marginBottom: '1rem', color: '#92400e', fontWeight: '500' }}>
            Unlock your personalized career path! Get your interests, personality type, and recommended college fields in one click.
          </p>
          <button
            onClick={() => navigate('/user-college-recommendation')}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Get Recommendations
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          {/* <h4 style={{ color: '#047857' }}>You’ve already received your recommendations!</h4> */}
          <p><strong>Interests:</strong> {interests}</p>
          <p><strong>Personality Type:</strong> {personality_type}</p>
          <p><strong>Recommended Fields:</strong> {recommended_fields}</p>
        </div>
      )}
    </div>
    </>
  );
}

export default UserTotalScore;
