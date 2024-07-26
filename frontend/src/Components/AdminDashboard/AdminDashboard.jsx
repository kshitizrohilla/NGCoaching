// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './AdminDashboard.css';

import AddVideo from './../AddVideo/AddVideo.js';

// Utility function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|v=)?([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const AdminDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get('/api/videos');
        setVideos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 class="sports-training-heading">Sports Training Videos</h1>
      <div className="card-container">
        {videos.map((video, index) => {
          const videoId = getYouTubeVideoId(video.url);
          return (
            <div className="card" key={index}>
              <div className="card-video">
                {videoId ? (
                  <iframe
                    width="100%"
                    height="180"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  ></iframe>
                ) : (
                  <p>No preview available</p>
                )}
              </div>
              <h2 className="card-title">{video.title}</h2>
              <p className="card-description">{video.description}</p>
              <a href={video.url} className="card-link" target="_blank" rel="noopener noreferrer">Watch Video</a>
              <div className="card-tags">
                {video.tags.map((tag, tagIndex) => (
                  <span className="card-tag" key={tagIndex}>{tag}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <AddVideo />
    </div>
  );
};

export default AdminDashboard;
