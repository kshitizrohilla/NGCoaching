import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ShowAllSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchAllSessions();
  }, []);

  const fetchAllSessions = async () => {
    try {
      let response = await axios.get('/api/sessions/all');
      
      setSessions(response.data);
    } catch (e) {
      alert('Error fetching sessions');
    }
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = url.split('v=')[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-8 text-white">All Sessions</h1>
      <div className="space-y-8">
        {sessions.map(session => (
          <div key={session._id} className="p-4 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-2">{session.sessionName}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {session.sessionTags.map((tag, index) => (
                <span key={index} className="bg-orange-600 text-white px-2 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="overflow-x-scroll">
              <div className="flex overflow-x-scroll space-x-4">
                {session.excercise.map(exercise => (
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

export default ShowAllSessions;