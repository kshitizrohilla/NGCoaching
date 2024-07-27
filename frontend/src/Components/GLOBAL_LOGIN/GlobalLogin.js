import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import GlobalNavbar from './GlobalNavbar';

const GlobalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin');
  const navigate = useNavigate();

  useEffect(() => {
    // Check cookies for existing userType and redirect if found
    const storedUserType = Cookies.get('userType');
    if (storedUserType) {
      navigate(`/${storedUserType}-dashboard`);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const loginDetails = { email, password };

    let collection;
    switch (userType) {
      case 'admin':
        collection = 'admins';
        break;
      case 'coach':
        collection = 'coaches';
        break;
      case 'student':
        collection = 'students';
        break;
      case 'family':
        collection = 'families';
        break;
      default:
        console.error('Invalid user type');
        return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/${collection}/login`, loginDetails);

      if (response.data.success) {
        Cookies.set('userType', userType);
        
        // Set email in cookies for admin, coach, and student
        if (userType === 'admin' || userType === 'coach' || userType === 'student') {
          Cookies.set('email', email);
        }
        
        navigate(`/${userType}-dashboard`);
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <>
      <GlobalNavbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">User Type:</label>
              <select
                id="userType"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="admin">Admin</option>
                <option value="coach">Coach</option>
                <option value="student">Student</option>
                <option value="family">Family</option>
              </select>
            </div>
            <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GlobalLogin;
