import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // For handling cookies
import AdminNavbar from './AdminNavbar';

function VideoSelectionForm() {
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [sessionName, setSessionName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creationStatus, setCreationStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userType = Cookies.get('userType');
    if (userType !== 'admin') {
      // Redirect to login or home page
      navigate('/');
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

  const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|v=)?([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleVideoSelection = (event, video) => {
    const { checked } = event.target;
    setSelectedVideos(prevState =>
      checked
        ? [...prevState, { videoId: getYouTubeVideoId(video.url), url: video.url }]
        : prevState.filter(v => v.videoId !== getYouTubeVideoId(video.url))
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      sessionName,
      startDate,
      endDate,
      videos: selectedVideos
    };

    console.log('Created Object:', formData);

    axios.post('http://localhost:5000/create-sessions', formData)
      .then(response => {
        setCreationStatus('New session created successfully');
        console.log('Submission successful:', response.data);
      })
      .catch(error => console.error('Error submitting form:', error));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-16">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-2xl font-semibold mb-4">Video Selection Form</h1>
          <p className="text-green-600 mb-4"><b>{creationStatus}</b></p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="sessionName" className="block text-gray-700 font-medium mb-1">Session Name:</label>
              <input
                type="text"
                id="sessionName"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="startDate" className="block text-gray-700 font-medium mb-1">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="endDate" className="block text-gray-700 font-medium mb-1">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Select Videos:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((video, index) => {
                  const videoId = getYouTubeVideoId(video.url);
                  return (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm" key={index}>
                      <div className="p-4">
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
                          <p className="text-gray-500">No preview available</p>
                        )}
                      </div>
                      <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
                        <p className="text-gray-600 mb-2">{video.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {video.tags.map((tag, tagIndex) => (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded" key={tagIndex}>{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={videoId}
                            onChange={(e) => handleVideoSelection(e, video)}
                            className="mr-2"
                          />
                          <label htmlFor={videoId} className="text-gray-700">Select</label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default VideoSelectionForm;
