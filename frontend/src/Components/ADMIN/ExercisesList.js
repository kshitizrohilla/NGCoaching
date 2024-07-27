// src/Components/ExercisesList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Utility function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|v=)?([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const ExercisesList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userType = Cookies.get('userType');

    if (userType !== 'admin') {
      navigate('/');
      return;
    }

    async function fetchVideos() {
      try {
        const response = await axios.get('http://localhost:5000/fetch-videos');
        setVideos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [navigate]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-600">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 mt-16"> {/* Added mt-16 for top margin */}
      <h1 className="text-4xl font-bold mt-8 mb-8 ml-4 mr-4 text-center">All Exercises</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => {
          const videoId = getYouTubeVideoId(video.url);
          return (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={index}>
              <div className="aspect-w-16 aspect-h-9">
                {videoId ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  ></iframe>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">No preview available</div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <p className="text-gray-700 mb-4">{video.description}</p>
                <div className="mt-4">
                  {video.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-block bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExercisesList;
