// SessionsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // For handling cookies

function SessionsList() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userType = Cookies.get('userType');
    if (userType !== 'admin') {
      // Redirect to login or home page
      navigate('/');
      return; // Exit early if not admin
    }

    async function fetchSessions() {
      try {
        const response = await axios.get('http://localhost:5000/fetch-sessions');
        setSessions(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, [navigate]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">All Sessions</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session, index) => (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={index}>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{session.sessionName}</h2>
              <p className="text-gray-700 mb-4">
              {`End Date: ${session.endDate}`}
              </p>
            </div>
            <div className="bg-gray-100">
              {session.videos.map((video, videoIndex) => (
                <div className="w-full" key={videoIndex}>
                  <iframe
                    className="w-full h-48"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`Video ${videoIndex}`}
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SessionsList;
