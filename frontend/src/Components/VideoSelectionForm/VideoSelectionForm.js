import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoSelectionForm.css';

function VideoSelectionForm() {
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [sessionName, setSessionName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creationStatus, setCreationStatus] = useState(null);

  useEffect(() => {
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
  }, []);

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
    <div className="form-container">
      <h1>Video Selection Form</h1>
      <p className="status-message"><b>{ creationStatus }</b></p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="sessionName">Session Name:</label>
          <input
            type="text"
            id="sessionName"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Videos:</label>
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
                  <div className="card-tags">
                    {video.tags.map((tag, tagIndex) => (
                      <span className="card-tag" key={tagIndex}>{tag}</span>
                    ))}
                  </div>
                  <div className="form-group">
                    <input
                      type="checkbox"
                      id={videoId}
                      onChange={(e) => handleVideoSelection(e, video)}
                    />
                    <label htmlFor={videoId}>Select</label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default VideoSelectionForm;
