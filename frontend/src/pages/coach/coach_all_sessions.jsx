import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CoachAllSessions = () => {
  const [assignedSessions, setAssignedSessions] = useState([]);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
      const storedUser = localStorage.getItem('nguser');
      if (storedUser) {
          const coach = JSON.parse(storedUser);
          setUser(coach);
      } else {
          navigate('/');
      }
  }, []);

    useEffect(() => {
        if (user) {
            fetchAllSessions();
        }
    }, [user]);

    const fetchAllSessions = async () => {
      try {
          let response = await axios.get(`/api/sessions/${user._id}/sessions`);
          console.log(response.data)
          setAssignedSessions(response.data);
      } catch (e) {
          console.log(e);
      }
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = url.split('v=')[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
    <h1 className="text-5xl font-bold mb-8 text-white">Assigned Sessions</h1>
    <div className="space-y-8">
      {assignedSessions.map((assignedSession, sessionIndex) => (
        <div key={assignedSession._id} className="p-4 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-2">{sessionIndex + 1} : Name: {assignedSession.name} | {assignedSession.session.sessionName}</h2>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2 text-red-600">Players assigned</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedSession.players.map((player, index) => (
                <div key={player._id} className="shadow-md rounded-lg p-4 border border-blue-400">
                  <h2 className="text-2xl font-semibold mb-2 text-orange-500">Player {index + 1}</h2>
                  <p className="text-gray-200 text-xl font-bold">Name:<span className='font-medium text-green-200'> {player.name} </span></p>
                  <p className="text-gray-200 text-xl font-bold">Email:<span className='font-medium text-blue-400'> {player.email} </span></p>
                  <p className="text-gray-200 text-xl font-bold">Age:<span className='font-medium'> {player.age} </span></p>
                </div>
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-red-600">Exercises in this session</h3>
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

export default CoachAllSessions;