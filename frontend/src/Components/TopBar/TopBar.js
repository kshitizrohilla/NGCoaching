// src/Components/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css'; // Create this CSS file for styling

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container">
        <h1 className="logo">NG Coaching</h1>
        <nav className="navbar">
          <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>
          <Link to="/video-selection" className="nav-link">Video Selection</Link>
          <Link to="/session-list" className="nav-link">Session List</Link>
          <Link to="/students" className="nav-link">Students</Link>
          <Link to="/student-registration" className="nav-link">Student Registration</Link>
          <Link to="/coaches" className="nav-link">Coaches</Link>
          <Link to="/coach-registration" className="nav-link">Coach Registration</Link>
          <Link to="/coach-dashboard" className="nav-link">Coach Dashboard</Link>
          <Link to="/trainings-dashboard" className="nav-link">Trainings Dashboard</Link>
          <Link to="/student-calendar" className="nav-link">Student Calendar</Link>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;
