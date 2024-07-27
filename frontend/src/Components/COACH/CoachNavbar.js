import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const GlobalNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove('email');
    Cookies.remove('userType');
    
    // Redirect to home or login page
    navigate('/');
  };

  return (
    <nav className="bg-black py-4 sticky top-0 left-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between px-4">
        <span className="text-white text-xl font-bold">
          NG Coaching
        </span>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/coach-dashboard')}
            className="text-white hover:text-gray-300"
          >
            Coach Dashboard
          </button>
          <button
            onClick={() => navigate('/coach-registration')}
            className="text-white hover:text-gray-300"
          >
            Coach Registration
          </button>
          <button
            onClick={() => navigate('/all-trainings')}
            className="text-white hover:text-gray-300"
          >
            All Trainings
          </button>
          <button
            onClick={() => navigate('/student-registration')}
            className="text-white hover:text-gray-300"
          >
            Student Registration
          </button>
          <button
            onClick={() => navigate('/all-students')} // New link
            className="text-white hover:text-gray-300"
          >
            All Students
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavbar;
