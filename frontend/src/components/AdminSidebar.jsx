import React from 'react';
import '../styles/AdminSidebar.css';

function AdminSidebar({ onSectionSelect }) {
  return (
    <div className="admin-sidebar">
      <h2>Dashboard</h2>
      <ul className="sidebar-list">
        <h4>Manage Test</h4>
        <li>
          <button onClick={() => onSectionSelect('create-category')}>Create Test Category</button>
        </li>
        <li>
          <button onClick={() => onSectionSelect('create-apti')}>Create Aptitude Questions</button>
        </li>
        <li>
          <button onClick={() => onSectionSelect('create-psycho')}>Create Psychometric Questions</button>
        </li>
        <h4>Manage Colleges</h4>
        <li>
          <button onClick={() => onSectionSelect('college-category')}>Add College Category</button>
        </li>
        <li>
          <button onClick={() => onSectionSelect('college-info')}>Add College Info</button>
        </li>
        <li>
          <button onClick={() => onSectionSelect('college-courses')}>Add College Courses</button>
        </li>
        <li>
          <button onClick={() => onSectionSelect('college-cutoff')}>Add Cutoffs</button>
        </li>
        <h4>Manage Courses</h4>
        <li>
          <button onClick={() => onSectionSelect('add-courses')}>Add Courses</button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
