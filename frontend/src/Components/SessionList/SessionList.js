// SessionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SessionList.css';

function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="session-list">
      <h1>All Sessions</h1>
      <div className="session-container">
        {sessions.map((session, index) => (
          <div className="session-card" key={index}>
            <h2 className="session-name">{session.sessionName}</h2>
            <p className="session-dates">
              {`Start Date: ${session.startDate}`}<br/>
              {`End Date: ${session.endDate}`}
            </p>
            <div className="session-videos">
              {session.videos.map((video, videoIndex) => (
                <div className="session-video" key={videoIndex}>
                  <iframe
                    width="100%"
                    height="180"
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

export default SessionList;
