import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './StudentCalendar.css'; // Ensure this CSS file is updated as well
import { useParams } from 'react-router-dom';

const StudentCalendar = () => {
  const { studentName } = useParams(); // Extract studentName from URL
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        if (!studentName) {
          setError('Student name not provided in URL. Please make the url is in this format /student-calendar/studentNameHere');
          return;
        }

        const response = await axios.post('http://localhost:5000/getStudentId', { name: studentName });
        const id = response.data.id;
        setError(null);

        // Fetch trainings containing this student ID
        fetchTrainingsByStudentId(id);
      } catch (err) {
        setError('Error fetching student data');
      }
    };

    const fetchTrainingsByStudentId = async (id) => {
      try {
        const response = await axios.get('http://localhost:5000/fetch-trainings');
        const trainings = response.data;

        // Filter trainings containing the student ID
        const relevantTrainings = trainings.filter(training => training.students_list.includes(id));
        
        // Collect all dates from the relevant trainings
        const dates = relevantTrainings.flatMap(training => {
          const startDate = new Date(training.session.startDate);
          const endDate = new Date(training.session.endDate);
          const currentDate = new Date(startDate);

          const trainingDates = [];
          while (currentDate <= endDate) {
            trainingDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }

          return trainingDates;
        });

        // Remove duplicates
        const uniqueDates = Array.from(new Set(dates.map(date => date.toDateString()))).map(dateStr =>
          new Date(dateStr)
        );

        setHighlightedDates(uniqueDates);
      } catch (err) {
        setError('Error fetching trainings');
      }
    };

    fetchStudentData();
  }, [studentName]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toDateString();
      return highlightedDates.some(d => d.toDateString() === dateStr) ? 'highlight' : null;
    }
    return null;
  };

  return (
    <div className="student-calendar">
      <h2>Student Calendar</h2>
      {error && <p className="error-message">{error}</p>}
      {!error && (
        <div className="card">
          <h3>Student Name: {studentName}</h3>
          <p className="student-schedule">The highlighted dates shows the training schedule of the student</p>
          <div className="calendar-container">
            <Calendar
              tileClassName={tileClassName}
            />
          </div>
          {highlightedDates.length > 0 ? (
            <div className="training-info">
              {highlightedDates.map((date, index) => (
                <p key={index}>
                  {new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date)}
                </p>
              ))}
            </div>
          ) : (
            <p>No training sessions found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentCalendar;
