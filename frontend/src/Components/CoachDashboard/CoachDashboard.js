// CoachDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CoachDashboard.css';

function CoachDashboard() {
  const { coachName } = useParams(); // Extract coachName from URL
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!coachName) {
        setError('Coach name not provided in URL. Make sure your URL is in this format: /coach-dashboard/coachNameHere');
        setLoading(false);
        return;
      }

      try {
        // Fetch sessions
        const sessionsResponse = await axios.get('http://localhost:5000/fetch-sessions');
        setSessions(sessionsResponse.data);

        // Fetch students by coach name
        const studentsResponse = await axios.get('http://localhost:5000/fetch-students-by-coach', {
          params: { coachName }
        });
        setStudents(studentsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [coachName]);

  const handleStudentChange = (e) => {
    const { value, checked } = e.target;
    setSelectedStudents(prev => checked ? [...prev, value] : prev.filter(id => id !== value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSession || selectedStudents.length === 0) {
      alert('Please select a session and at least one student.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/insert-trainings', {
        session: selectedSession,
        students_list: selectedStudents,
        coach: coachName // Use coach name from URL
      });
      alert('Training record created successfully!');
    } catch (err) {
      console.error('Error creating training record:', err);
      alert('Failed to create training record.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="coach-dashboard-url-warning">Error: {error}</p>;

  return (
    <div className="coach-dashboard">
      <h1>Select Session and Students for Coach: {coachName}</h1>
      <form onSubmit={handleSubmit}>
        <div className="session-selection">
          <h2>Select Session</h2>
          <select
            className="session-dropdown"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
          >
            <option value="">Select a session</option>
            {sessions.map((session) => (
              <option key={session._id} value={session._id}>
                {session.sessionName}
              </option>
            ))}
          </select>
        </div>

        <div className="student-selection">
          <h2>Select Students</h2>
          <div className="student-checkboxes">
            {students.map((student) => (
              <div key={student._id}>
                <input
                  type="checkbox"
                  id={student._id}
                  value={student._id}
                  onChange={handleStudentChange}
                  checked={selectedStudents.includes(student._id)}
                />
                <label htmlFor={student._id}>{student.name}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CoachDashboard;
