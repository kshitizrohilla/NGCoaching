import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Cookies from 'js-cookie'; // Import js-cookie for cookie management
import CoachNavbar from './CoachNavbar';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  useEffect(() => {
    // Check userType from cookies and redirect if not 'coach'
    const userType = Cookies.get('userType');
    if (userType !== 'coach') {
      navigate('/'); // Redirect to home if not a coach
      return;
    }

    async function fetchStudents() {
      try {
        const response = await axios.get('http://localhost:5000/fetch-students');
        setStudents(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, [navigate]);

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (<>
        <CoachNavbar />

    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <div className="bg-white shadow-lg rounded-lg p-6" key={index}>
            <h2 className="text-xl font-semibold mb-2">{student.name}</h2>
            <p className="text-gray-700 mb-2">Email: {student.email}</p>
            <p className="text-gray-700 mb-2">Age: {student.age}</p>
          </div>
        ))}
      </div>
    </div>
  </>);
}

export default Students;
