import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const StudentNavbar = () => {
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
          NG Coaching - Student
        </span>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/student-dashboard')}
            className="text-white hover:text-gray-300"
          >
            Dashboard
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

export default StudentNavbar;
