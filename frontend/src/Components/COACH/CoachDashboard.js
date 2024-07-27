import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CoachNavbar from './CoachNavbar';

// Helper function to get a cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const CoachDashboard = () => {
  const [students, setStudents] = useState([]);
  const [videos, setVideos] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [selectedVideos, setSelectedVideos] = useState(new Set());
  const [selectedSessions, setSelectedSessions] = useState(new Set());
  const [sessionName, setSessionName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the userType cookie is set to 'coach'
    const userType = getCookie('userType');
    if (userType === 'coach') {
      setIsAuthorized(true);

      const fetchStudents = async () => {
        try {
          const response = await axios.get('http://localhost:5000/fetch-students');
          setStudents(response.data);
        } catch (err) {
          console.error('Error fetching students:', err.message);
          setError('Error fetching students. Please try again.');
        }
      };

      const fetchVideos = async () => {
        try {
          const response = await axios.get('http://localhost:5000/fetch-videos');
          setVideos(response.data);
        } catch (err) {
          console.error('Error fetching videos:', err.message);
          setError('Error fetching videos. Please try again.');
        }
      };

      const fetchSessions = async () => {
        try {
          const response = await axios.get('http://localhost:5000/fetch-sessions');
          console.log('Fetched sessions:', response.data);
          setSessions(response.data);
        } catch (err) {
          console.error('Error fetching sessions:', err.message);
          setError('Error fetching sessions. Please try again.');
        }
      };

      fetchStudents();
      fetchVideos();
      fetchSessions();
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleStudentCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(studentId)) {
        newSelected.delete(studentId);
      } else {
        newSelected.add(studentId);
      }
      return newSelected;
    });
  };

  const handleVideoCheckboxChange = (videoUrl) => {
    setSelectedVideos((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(videoUrl)) {
        newSelected.delete(videoUrl);
      } else {
        newSelected.add(videoUrl);
      }
      return newSelected;
    });
  };

  const handleSessionChange = (sessionId) => {
    setSelectedSessions((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(sessionId)) {
        newSelected.delete(sessionId);
      } else {
        newSelected.add(sessionId);
      }
      return newSelected;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedStudentsArray = Array.from(selectedStudents);
    const selectedVideosArray = Array.from(selectedVideos);

    // Combine videos from selected sessions
    const sessionVideos = sessions
      .filter(session => selectedSessions.has(session._id))
      .flatMap(session => session.videos.map(video => video.url));

    const trainingData = {
      sessionName,
      startDate,
      endDate,
      students_list: selectedStudentsArray,
      videos_list: [...selectedVideosArray, ...sessionVideos]
    };

    console.log('Object to be saved in the database:', trainingData);

    try {
      await axios.post('http://localhost:5000/insert-trainings', trainingData);
      setSuccess('Training session created successfully!');
      setError(null);
      // Clear the form
      setSessionName('');
      setStartDate('');
      setEndDate('');
      setSelectedStudents(new Set());
      setSelectedVideos(new Set());
      setSelectedSessions(new Set());
    } catch (err) {
      console.error('Error creating training session:', err.message);
      setError('Error creating training session. Please try again.');
      setSuccess(null);
    }
  };

  if (!isAuthorized) {
    return null; // Or you could return a loading spinner or similar if needed
  }

  return (
    <>
      <CoachNavbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Coach Dashboard</h2>
          {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Form fields and checkboxes */}
            <div className="mb-4">
              <label htmlFor="sessionName" className="block text-gray-700 font-semibold mb-2">Training Name:</label>
              <input
                type="text"
                id="sessionName"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-2">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className="block text-gray-700 font-semibold mb-2">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Select Students:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map((student) => (
                  <div key={student._id} className="border border-gray-300 rounded-lg p-4 flex flex-col">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`student-${student._id}`}
                        checked={selectedStudents.has(student._id)}
                        onChange={() => handleStudentCheckboxChange(student._id)}
                        className="mr-4"
                      />
                      <label htmlFor={`student-${student._id}`} className="text-gray-700 font-semibold">
                        {student.name}
                      </label>
                    </div>
                    <p className="text-gray-600">Age: {student.age}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Select Videos:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((video) => (
                  <div key={video._id} className="border border-gray-300 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`video-${video._id}`}
                        checked={selectedVideos.has(video.url)}
                        onChange={() => handleVideoCheckboxChange(video.url)}
                        className="mr-4"
                      />
                      <label htmlFor={`video-${video._id}`} className="text-gray-700 font-semibold">
                        {video.title}
                      </label>
                    </div>
                    <p className="text-gray-600">{video.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Select Sessions:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sessions.map((session) => (
                  <div key={session._id} className="border border-gray-300 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`session-${session._id}`}
                        checked={selectedSessions.has(session._id)}
                        onChange={() => handleSessionChange(session._id)}
                        className="mr-4"
                      />
                      <label htmlFor={`session-${session._id}`} className="text-gray-700 font-semibold">
                        {session.sessionName}
                      </label>
                    </div>
                    <p className="text-gray-600">Start Date: {session.startDate}</p>
                    <p className="text-gray-600">End Date: {session.endDate}</p>
                    <div className="mt-2">
                      <h4 className="font-semibold">Videos:</h4>
                      <ul className="list-disc list-inside">
                        {session.videos.map((video, index) => (
                          <li key={index} className="text-gray-600">{video.url}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CoachDashboard;
