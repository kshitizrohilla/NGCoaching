import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerAssigned = () => {
  const [sessions, setSessions] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('nguser');
    if (storedUser) {
        const player = JSON.parse(storedUser);
        setUser(player);
    } else {
        navigate('/');
    }
  }, []);

  useEffect(() => {
      if (user) {
        fetchAssignedSessions();
      }
  }, [user]);

  const fetchAssignedSessions = async () => {
    try {
      let response = await axios.get(`/api/sessions/player/${user._id}/sessions`);
      setSessions(response.data);
    } catch (e) {
      alert('Error fetching sessions');
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-8 text-white">Your Sessions</h1>
      <div className="space-y-8">
        {sessions.map((assignedSession, sessionIndex) => (
          <div key={assignedSession._id} className="p-4 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-2">{sessionIndex + 1} : Name: {assignedSession.name} | {assignedSession.session.sessionName}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {assignedSession.session.sessionTags.map((tag, index) => (
                <span key={index} className="bg-orange-600 text-white px-2 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="overflow-x-scroll">
              <div className="flex overflow-x-scroll space-x-4">
                {assignedSession.session.excercise.map((exercise) => (
                  <div key={exercise._id} className="bg-gray-800 p-4 rounded-2xl shadow-lg max-w-[400px] flex-shrink-0">
                    <div className="relative pb-56 mb-4 overflow-hidden rounded-xl">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${exercise.url.split('v=')[1]}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={exercise.title}
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 bg-transparent">{exercise.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-3 bg-transparent">{exercise.description}</p>
                    <div className="flex flex-wrap gap-2 bg-transparent">
                      {exercise.tags.map((tag, index) => (
                        <span key={index} className="bg-orange-600 text-white px-2 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerAssigned;