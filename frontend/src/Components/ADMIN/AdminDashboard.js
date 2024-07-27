// src/Components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ExercisesList from './ExercisesList'; // Import VideosList
import SessionsList from './SessionsList';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false); // State to track if user is admin
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check the userType cookie
    const userType = Cookies.get('userType');
    if (userType === 'admin') {
      setIsAdmin(true);
    } else {
      // Redirect to GlobalLogin if userType is not 'admin'
      navigate('/'); // Change '/global-login' to the actual route for GlobalLogin
    }
  }, [navigate]);

  if (!isAdmin) return <p>Redirecting...</p>; // Show redirecting message while navigating

  return (
    <div>
      <AdminNavbar />
      <ExercisesList /> {/* Render VideosList */}
      <SessionsList />
    </div>
  );
};

export default AdminDashboard;
