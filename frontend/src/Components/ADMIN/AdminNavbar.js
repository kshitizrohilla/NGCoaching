// src/Components/AdminTopBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // For handling cookies

const AdminTopBar = () => {
  const navigate = useNavigate();
  const adminEmail = Cookies.get('adminEmail'); // Assuming you store the admin's email in a cookie

  const handleLogout = () => {
    // Clear cookies or any session storage
    Cookies.remove('userType');
    Cookies.remove('adminEmail'); // Remove the admin email cookie
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="bg-black text-white p-4 shadow-md absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/admin-dashboard" className="text-2xl font-bold text-white">
          NG Coaching
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-lg">{adminEmail}</span>
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/admin-dashboard" className="text-white hover:text-gray-300">
            Admin Dashboard
          </Link>
          <Link to="/create-exercises" className="text-white hover:text-gray-300">
            Create Exercises
          </Link>
          <Link to="/create-sessions" className="text-white hover:text-gray-300">
            Create Sessions
          </Link>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdminTopBar;
