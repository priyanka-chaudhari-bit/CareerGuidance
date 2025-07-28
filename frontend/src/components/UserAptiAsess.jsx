import React, { useEffect, useState, useContext } from 'react';
import '../styles/UserUpdateProfile.css';
import { AuthContext } from '../context/AuthContext';
// import { secureFetch } from '../hooks/api';
import useSecureFetch from '../hooks/useSecureFetch';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
function UserAptiAsess() {
    const { authToken } = useContext(AuthContext);
    const secureFetch = useSecureFetch();
    const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [visitedQuestions, setVisitedQuestions] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(5400); 


  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await secureFetch('http://127.0.0.1:8000/students/get_apti_questions/');
        const data = await res.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch questions', error);
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
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
    };

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = ''; // Shows browser default warning
    };

    const handlePopState = () => {
        alert('Navigation is not allowed during the assessment!');
        window.history.pushState(null, '', window.location.href); // Push user back
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href); // Prevent back nav

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('popstate', handlePopState);
    };
    }, []);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (questions.length > 0) {
        const currentQuestionId = questions[currentQuestionIndex].id;
        setVisitedQuestions(prev => new Set(prev).add(currentQuestionId));
    }
    }, [currentQuestionIndex, questions]);

  const handleSubmitTest = async () => {
  const payload = {
    answers: Object.entries(answers).map(([question, selected_option]) => ({
      question: parseInt(question),
      selected_option
    }))
  };

  try {
    const res = await secureFetch('http://127.0.0.1:8000/students/apti-submit-answer/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(`Error: ${errorData.detail || 'Test already submitted or failed to submit.'}`);
    } else {
      alert('Test submitted successfully!');
      navigate('/user-psychometric-test'); 
    }
  } catch (error) {
    console.error('Submission failed', error);
    alert('An error occurred while submitting your test.');
  }
};


  return (
    <>
    <Navigation/>
      <div style={{ maxWidth: '1200px', margin: 'auto', padding: '1.5rem 0'}}>
        <div style={{display:'flex', gap:'200px'}}>
        <h2 style={{ textAlign: 'center',paddingLeft:'400px', marginBottom: '1.5rem' }}>Aptitude Assessment</h2>
        <div style={{
            backgroundColor: '#ffe5e5',
            padding: '0.5rem 0.3rem',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '1rem',
            fontSize: '1.1rem',
            color: '#b91c1c',
            maxWidth: '200px',
            margin: '0 auto 1.7rem auto'
            }}>
            Time Remaining: {formatTime(timeLeft)}
            </div>
            </div>
      
      
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <>
          {/* Question Navigation */}
          {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1rem', justifyContent: 'center',  width: '100%' }}>
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  backgroundColor: currentQuestionIndex === idx ? '#2563eb' : (answers[questions[idx].id] ? '#22c55e' : '#e5e7eb'),
                  color: currentQuestionIndex === idx || answers[questions[idx].id] ? '#fff' : '#000',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div> */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1rem', justifyContent: 'center', width: '100%' }}>
        {questions.map((q, idx) => {
            const qId = q.id;
            const isCurrent = currentQuestionIndex === idx;
            const isAnswered = answers[qId];
            const isVisited = visitedQuestions.has(qId);

            let bgColor = '#e5e7eb'; // default grey
            let textColor = '#000';

            if (isCurrent) {
            bgColor = '#2563eb'; // blue
            textColor = '#fff';
            } else if (isAnswered) {
            bgColor = '#50c878'; // green
            textColor = '#fff';
            } else if (isVisited) {
            bgColor = '#a78bfa'; // violet
            textColor = '#fff';
            }

            return (
            <button
                key={idx}
                onClick={() => {
                setCurrentQuestionIndex(idx);
                setVisitedQuestions(prev => new Set(prev).add(qId));
                }}
                style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                backgroundColor: bgColor,
                color: textColor,
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
                }}
            >
                {idx + 1}
            </button>
            );
        })}
        </div>
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
        </div>
            <br/>
          {/* Question Box */}
          <div style={{ background: '#f8f8f8', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
            <h4>Q{currentQuestionIndex + 1}. {currentQuestion.text}</h4>
            {/* <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {currentQuestion.options.map((opt, index) => (
                
                <li key={opt.id} style={{ marginBottom: '0.5rem' }}>
                  <label style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    backgroundColor: answers[currentQuestion.id] === opt.id ? '#dbeafe' : '#fff',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name={`question_${currentQuestion.id}`}
                      value={opt.id}
                      checked={answers[currentQuestion.id] === opt.id}
                      onChange={() => handleOptionSelect(currentQuestion.id, opt.id)}
                      style={{ marginRight: '0.5rem', display: 'none' }}
                    />
                    {opt.text}
                  </label>
                </li>
              ))}
            </ul> */}
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {currentQuestion.options.map((opt, index) => {
                const optionLabel = String.fromCharCode(65 + index); 
                return (
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
                    <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>
                        {optionLabel})
                    </span>
                    {opt.text}
                    </label>
                </li>
                );
            })}
            </ul>

          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={() => {
    const newIndex = Math.max(currentQuestionIndex - 1, 0);
    setCurrentQuestionIndex(newIndex);
  }}
              disabled={currentQuestionIndex === 0} style={{color:"white", background:"blue"}}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Previous
            </button>
            
            <button
              onClick={() => {
    const newIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
    setCurrentQuestionIndex(newIndex);
  }}
              disabled={currentQuestionIndex === questions.length - 1} style={{color:"white", background:"green"}}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Next
            </button>
            </div>
            <div style={{ marginTop: '0rem', textAlign: 'center' }}>
            <button
                onClick={handleSubmitTest} style={{color:"white", background:"red"}}
                className="bg-red hover:bg-green-700 font-bold py-2 px-4 rounded"
            >
                Submit Aptitude Test
            </button>
            </div>
            
            

        </>
      )}
    </div>
    </>
  )
}

export default UserAptiAsess
