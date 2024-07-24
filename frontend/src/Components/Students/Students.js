// Students.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Students.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="students">
      <h1>Student Details</h1>
      <div className="student-container">
        {students.map((student, index) => (
          <div className="student-card" key={index}>
            <h2 className="student-name">{student.name}</h2>
            <p className="student-email">Email: {student.email}</p>
            <p className="student-age">Age: {student.age}</p>
            <p className="student-coach">Coach: {student.coach}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;
