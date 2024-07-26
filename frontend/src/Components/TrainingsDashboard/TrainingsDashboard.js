// TrainingsDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrainingsDashboard.css';

const TrainingsDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [studentsMap, setStudentsMap] = useState({}); // Store student ID to name mapping

  useEffect(() => {
    async function fetchTrainings() {
      try {
        const response = await axios.get('/api/trainings');
        setTrainings(response.data);

        // Collect all student IDs from trainings
        const allStudentIds = response.data.flatMap(training => training.students_list);
        fetchStudentsByIds(allStudentIds);
      } catch (error) {
        console.error('Error fetching trainings:', error);
      }
    }

    async function fetchStudentsByIds(studentIds) {
      try {
        // Fetch students by their IDs
        const response = await axios.post('http://localhost:5000/fetch-students-by-id', { ids: studentIds });
        const students = response.data;

        // Create a map of student IDs to names
        const studentsMap = students.reduce((map, student) => {
          map[student._id] = student.name;
          return map;
        }, {});

        setStudentsMap(studentsMap);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }

    fetchTrainings();
  }, []);

  return (
    <div className="trainings-dashboard">
      <h1>Trainings Dashboard</h1>
      <div className="card-container">
        {trainings.map((training, index) => (
          <div className="card" key={index}>
            <h2 className="card-title">Coach: {training.coach}</h2>
            <h3 className="card-session">Session: {training.session.sessionName}</h3>
            <h3 className="card-session">Start Date: {training.session.startDate}</h3>
            <h3 className="card-session">End Date: {training.session.endDate}</h3>
            <div className="card-students">
              <h4>Students:</h4>
              <ul>
                {training.students_list.map((studentId) => (
                  <li key={studentId}>
                    {studentsMap[studentId] || 'Loading...'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingsDashboard;
