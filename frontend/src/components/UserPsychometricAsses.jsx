import React, { useEffect, useState, useContext } from 'react';
import '../styles/UserUpdateProfile.css';
import { AuthContext } from '../context/AuthContext';
import useSecureFetch from '../hooks/useSecureFetch';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

function UserPsychometricAsses() {
  const { authToken } = useContext(AuthContext);
  const secureFetch = useSecureFetch();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(1800); // 1 hour
  const [visitedQuestions, setVisitedQuestions] = useState(new Set());


  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await secureFetch('http://127.0.0.1:8000/students/get-psychometric-questions');
        const data = await res.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch psychometric questions', error);
      }
    }
    fetchQuestions();
  }, [authToken]);

  useEffect(() => {
    if (loading) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert('Time is up! Auto-submitting your test...');
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `00:${mins}:${secs}`;
  };

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
    setVisitedQuestions((prev) => {
    const updated = new Set(prev);
    updated.add(questionId);
    return updated;
  });
  };

    const handleQuestionChange = (index) => {
    setCurrentQuestionIndex(index);
    setVisitedQuestions((prev) => {
        const updated = new Set(prev);
        updated.add(questions[index].id);
        return updated;
    });
    };

  const handleSubmitTest = async () => {
    const payload = {
      answers: Object.entries(answers).map(([question, selected_option]) => ({
        question: parseInt(question),
        selected_option
      }))
    };

    try {
      const res = await secureFetch('http://127.0.0.1:8000/students/submit-psychometric-questions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error: ${errorData.detail || 'Submission failed.'}`);
      } else {
        alert('Psychometric Test submitted successfully!');
        navigate('/user-get-score');
      }
    } catch (error) {
      console.error('Submission failed', error);
      alert('An error occurred while submitting your test.');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
    <Navigation/>
    <div style={{ maxWidth: '1000px', margin: 'auto', padding: '1.5rem 0' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <div style={{ flex: 1 }}></div>
        <h2 style={{ flex: 2, textAlign: 'center' }}>Psychometry Assessment</h2>
        <div style={{
          flex: 1,
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#b91c1c',
          background: '#ffe5e5',
          padding: '6px 6px',
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question panel */}
      {!loading && (
        <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '1.5rem'
        }}>
        {questions.map((q, index) => {
            let bgColor = '#d1d5db'; // default: unvisited

            if (answers[q.id]) {
            bgColor = '#10b981'; // answered
            } else if (index === currentQuestionIndex) {
            bgColor = '#3b82f6'; // current question
            } else if (index < currentQuestionIndex) {
            bgColor = '#8b5cf6'; // visited but not answered
            }


            return (
            <button
                key={q.id}
                onClick={() => handleQuestionChange(index)}
                style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: bgColor,
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: index === currentQuestionIndex ? '0 0 0 2px white, 0 0 0 4px #3b82f6' : 'none'
                }}
                title={`Question ${index + 1}`}
            >
                {index + 1}
            </button>
            );
        })}
        </div>

      )}
      <div style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span>Note:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#50c878' }}></div>
            <span>Answered</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#a78bfa' }}></div>
            <span>Visited but not answered</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#2563eb' }}></div>
            <span>Current Question</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#e5e7eb', border: '1px solid #ccc' }}></div>
            <span>Not Visited</span>
        </div>
        </div><br/>

      {/* Main Question */}
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <>
          <div style={{ background: '#f8f8f8', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
            <h4>Q{currentQuestionIndex + 1}. {currentQuestion.question_text}</h4>
            {/* <p style={{ fontStyle: 'italic', color: '#555' }}>Dimension: {currentQuestion.dimension}</p> */}

            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {currentQuestion.options.map((opt) => (
                <li key={opt.id} style={{ marginBottom: '0.5rem' }}>
                  <label style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    backgroundColor: answers[currentQuestion.id] === opt.id ? '#dbeafe' : '#fff',
                    cursor: 'pointer',
                    maxWidth: '500px',
                    width: '100%',
                    marginLeft: '2%'
                  }}>
                    <input
                      type="radio"
                      name={`question_${currentQuestion.id}`}
                      value={opt.id}
                      checked={answers[currentQuestion.id] === opt.id}
                      onChange={() => handleOptionSelect(currentQuestion.id, opt.id)}
                      style={{ display: 'none' }}
                    />
                    {opt.option_text}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))}
              disabled={currentQuestionIndex === 0} style={{color:"white", background:"blue"}}
              className="bg-gray-600 px-4 py-2 rounded"
            >
              Previous
            </button>

            <button
              onClick={() => setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, questions.length - 1))}
              disabled={currentQuestionIndex === questions.length - 1}
              className="bg-blue-600 px-4 py-2 rounded" style={{color:"white", background:"green"}}
            >
              Next
            </button>
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={handleSubmitTest} style={{color:"white", background:"red"}}
              className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded"
            >
              Submit Psychometry Test
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default UserPsychometricAsses;
