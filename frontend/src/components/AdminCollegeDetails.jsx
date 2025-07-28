import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useSecureFetch from '../hooks/useSecureFetch';
import '../styles/AdminCollegeDetails.css'


function AdminCollegeDetails() {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchAdminCollegeDetails() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/students/college-details/${id}`);
        const data = await res.json();
        setCollege(data);
      } catch (err) {
        console.error('Failed to fetch college details', err);
      } finally {
        setLoading(false);
      }
    }
  fetchAdminCollegeDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading college details...</div>;
  if (!college) return <div className="loading">Unable to load college details.</div>;

  return (
    <>
    <div className="college-container">
      <div className="college-header">
        <h1>{college.name}</h1>
        <p>{college.city}, {college.location} | Established: {college.established_year}</p>
        <span className="badge">{college.institute_type}</span>
      </div>

      <div className="about-section">
        <h2>About</h2>
        <p>{college.about}</p>
      </div>

      {/* <div className="info-grid">
        <InfoCard label="Ranking" value={`#${college.ranking}`} />
        <InfoCard label="Hostel Fees" value={`₹${college.hostel_fees}`} />
        <InfoCard label="Average Package" value={college.average_package} />
        <InfoCard label="Placements" value={college.placements} />
        <InfoCard label="Scholarships" value={college.scholarships} />
        <InfoCard label="Recognized By" value={college.recognized_by} />
        <InfoCard label="Top Recruiters" value={college.top_recruiters} />
      </div> */}
      <div className="info-section">
        <h2>Key Information</h2>
        <table className="info-table">
            <tbody>
            <tr><td>Ranking:</td><td>#{college.ranking}</td></tr>
            <tr><td>Hostel Fees:</td><td>₹{college.hostel_fees}</td></tr>
            <tr><td>Average Package:</td><td>{college.average_package}</td></tr>
            <tr><td>Placements:</td><td>{college.placements}</td></tr>
            <tr><td>Scholarships:</td><td>{college.scholarships}</td></tr>
            <tr><td>Recognized By:</td><td>{college.recognized_by}</td></tr>
            <tr><td>Top Recruiters:</td><td>{college.top_recruiters}</td></tr>
            </tbody>
        </table>
        </div>

      <div className="exam-section">
        <h2>Entrance Exams</h2>
        <div className="exam-badges">
          {college.entrance_exams.map((exam, i) => (
            <span key={i} className="exam-badge">{exam}</span>
          ))}
        </div>
      </div>

      <div className="courses-section">
        <h2>Courses Offered</h2>
        {college.courses.map((course) => (
          <div key={course.id} className="course-card">
            <h4>{course.course_name}</h4>
            <p style={{fontSize:'16px'}}><strong>Fees:</strong> ₹{course.tuition_fees} | <strong>Placements:</strong> {course.placements}</p>
            <p style={{fontSize:'16px'}}><strong>Eligibility:</strong> {course.eligibility_criteria}</p>
            <p style={{fontSize:'16px'}}><strong>Selection:</strong> {course.selection_criteria}</p>
            <div className="cutoffs">
              <h5 style={{textAlign:'left'}}>Cutoffs by Category:</h5>
              <ul>
                {course.cutoffs.map((cutoff, idx) => (
                  <li style={{fontSize:'15px'}} key={idx}><strong>{cutoff.category}:</strong> {cutoff.cutoff_score}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="info-card">
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  );
}
export default AdminCollegeDetails;
