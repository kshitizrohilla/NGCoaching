import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './StudentDashboard.css';
import StudentNavbar from './StudentNavbar'; // Assuming you have a navbar for students

const StudentDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [studentsMap, setStudentsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [highlightedDates, setHighlightedDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userType = Cookies.get('userType');
    const email = Cookies.get('email'); // Assume email is stored in cookies

    if (userType !== 'student' || !email) {
      navigate('/');
      return;
    }

    const fetchStudentIdAndTrainings = async () => {
      try {
        // Fetch all students to find the current student's ID
        const studentsResponse = await axios.get('http://localhost:5000/fetch-students');
        const students = studentsResponse.data;

        const student = students.find(student => student.email === email);
        if (!student) {
          throw new Error('Student not found');
        }
        const studentId = student._id;
        setStudentId(studentId);
        Cookies.set('studentId', studentId); // Store student ID in cookies
        console.log('Student ID:', studentId);

        // Map student IDs to names for easy reference
        const studentsMap = students.reduce((map, student) => {
          map[student._id] = student.name;
          return map;
        }, {});
        setStudentsMap(studentsMap);

        // Fetch all trainings
        const trainingsResponse = await axios.get('http://localhost:5000/fetch-trainings');
        const trainingsData = trainingsResponse.data;

        // Filter trainings to include only those where the student is present
        const filteredTrainings = trainingsData.filter(training =>
          training.students_list.includes(studentId)
        ).map(training => ({
          ...training,
          students_list: training.students_list.map(id => studentsMap[id] || 'Unknown Student')
        }));

        // Create an array of all dates to be highlighted (one day before the actual date)
        const allHighlightedDates = filteredTrainings.flatMap(training => {
          const start = new Date(training.startDate);
          const end = new Date(training.endDate);
          const dates = [];
          let currentDate = new Date(start);

          // Highlight each date from start to end date, but one day before
          while (currentDate <= end) {
            const prevDate = new Date(currentDate);
            prevDate.setDate(prevDate.getDate() - 1); // Subtract one day
            dates.push(new Date(prevDate).toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
          }

          return dates;
        });
        setHighlightedDates(allHighlightedDates);

        setTrainings(filteredTrainings);
      } catch (error) {
        console.error('Error fetching student or training data:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentIdAndTrainings();
  }, [navigate]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      return highlightedDates.includes(dateStr) ? 'highlighted-date' : null;
    }
    return null;
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  // Return null if userType is not 'student'
  const userType = Cookies.get('userType');
  if (userType !== 'student') {
    return null; // Or a redirect component if preferred
  }

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
          <div className="bg-gradient-to-r from-teal-400 to-blue-500 sm:rounded-3xl p-6">
            <div className="relative px-4 py-10 bg-white sm:rounded-3xl sm:p-20">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-semibold text-center mb-6">My Training Sessions</h1>
                <div className="flex flex-col items-center">
                  <div className="w-full md:w-1/2 lg:w-1/3 mb-8">
                    <Calendar
                      onChange={handleDateChange}
                      value={selectedDate}
                      tileClassName={tileClassName}
                    />
                  </div>
                  <div className="w-full">
                    <div className="divide-y divide-gray-200">
                      {trainings.length > 0 ? (
                        trainings.map(training => (
                          <div key={training._id} className="py-8">
                            <div className="training-card">
                              <h2 className="text-xl font-bold">{training.sessionName}</h2>
                              <p className="text-gray-600">
                                Start Date: {new Date(training.startDate).toLocaleDateString()}
                              </p>
                              <p className="text-gray-600">
                                End Date: {new Date(training.endDate).toLocaleDateString()}
                              </p>
                              <h3 className="text-lg font-semibold">Students</h3>
                              <ul className="list-disc list-inside">
                                {training.students_list.map((student, index) => (
                                  <li key={index} className="text-gray-600">{student}</li>
                                ))}
                              </ul>
                              <h3 className="text-lg font-semibold">Videos</h3>
                              <div className="flex flex-wrap">
                                {training.videos_list.map((video, index) => (
                                  <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-2">
                                    <iframe
                                      className="w-full h-40 rounded-lg"
                                      src={video}
                                      title={`Video ${index + 1}`}
                                      frameBorder="0"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No training sessions available.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
