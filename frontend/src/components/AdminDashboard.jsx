import React, { useEffect, useState, useContext } from 'react'
import AdminNavigation from './AdminNavigation'
import AdminSidebar from './AdminSidebar';
import { AdminAuthContext } from '../context/AdminAuthContext';
import CreateTestCategory from './CreateTestCategory';
import CreateAptiQuestion from './CreateAptiQuestion';
import PsychometricQuestionForm from './PsychometricQuestionForm';
import CollegeCategoryForm from './CollegeCategoryForm';
import AdminCourseForm from './AdminCourseForm';
import CollegeForm from './CollegeForm';
import AddCollegeCourse from './AddCollegeCourse';
import CutoffForm from './CutoffForm';
function AdminDashboard() {
  const [activeSection, setActiveSection] = useState(null);
  let { login, logout, access_admin,admin_username } = useContext(AdminAuthContext);
  const username = admin_username?admin_username:" ";
  const renderSection = () => {
    switch (activeSection) {
      case 'create-category':
        return <CreateTestCategory />;
      case 'create-apti':
        return <CreateAptiQuestion/>;     
      case 'create-psycho':
        return <PsychometricQuestionForm/>
      case 'college-category':
        return <CollegeCategoryForm/>
      case 'college-info':
        return <CollegeForm/>
      case 'college-courses':
        return <AddCollegeCourse/>
      case 'college-cutoff':
        return <CutoffForm/>
      case 'add-courses':
        return <AdminCourseForm/>
      default:
        return <p>Select a section from the sidebar to begin.</p>;
    }
  };
  const handleManageTest = () => {
    setActiveSection('create-category');
  }

      return (
      <>
        <AdminNavigation />
        <div style={{ display: 'flex' }}>
          <AdminSidebar onSectionSelect={setActiveSection} />
          <div style={{ marginLeft: '260px', padding: '4rem 1rem', flex: 1 }}>
            {activeSection ? (
              <div style={{ background: '#fff', padding: '20px', border: '1px solid #ccc' }}>
                {renderSection()}
              </div>
            ) : (
              <div className="stats-boxes">
                <div style={{ background: '#ecf0f1', padding: '20px', margin: '1rem' }}>
                  <h1 style={{textAlign:'center'}}>Welcome to Admin Panel, {username} !!</h1>
                  <div style={{display:'flex',flexDirection:'row',gap:'1rem',margin:'2rem',justifyContent:'space-around',padding:'5rem'}}>
                  <div onClick={handleManageTest} style={{height:'200px', width:'200px',backgroundColor:'lightcoral',padding:'4rem',textAlign:'center',color:'white',fontSize:'24px',borderRadius:'35%',cursor:'pointer'}}>Manage Test</div>
                  <div onClick={handleManageTest} style={{height:'200px', width:'200px',backgroundColor:'lightseagreen',padding:'4rem',textAlign:'center',color:'white',fontSize:'24px',borderRadius:'35%',cursor:'pointer'}}>Manage Colleges</div>
                  <div onClick={handleManageTest} style={{height:'200px', width:'200px',backgroundColor:'purple',padding:'4rem',textAlign:'center',color:'white',fontSize:'24px',borderRadius:'35%',cursor:'pointer'}}>Manage Courses</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );

}

export default AdminDashboard
