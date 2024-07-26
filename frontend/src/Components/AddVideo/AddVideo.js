// Components/AddVideo/AddVideo.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddVideo.css'; // Optional: Create a CSS file for styling

const AddVideo = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/videos/create', {
        url,
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()) // Convert tags to array
      });
      console.log('Video added successfully:', response.data);
      // Clear the form
      setUrl('');
      setTitle('');
      setDescription('');
      setTags('');
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  return (
    <div className="add-video-container">
      <h2>Add New Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">Video URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};

export default AddVideo;
