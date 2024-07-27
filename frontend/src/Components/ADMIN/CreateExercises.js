import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Updated hook
import AdminNavbar from './AdminNavbar';

const CreateExercises = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Updated hook

  useEffect(() => {
    const userType = Cookies.get('userType');
    if (userType === 'admin') {
      setIsAdmin(true);
    } else {
      // Redirect to login or show unauthorized message
      navigate('/'); // Change the route to your login page
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/insert-videos', {
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

  if (!isAdmin) {
    return <p>Loading...</p>; // Optionally, show a loading indicator while redirecting
  }

  return (
    <>
      <AdminNavbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-6">
        <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Add New Exercise</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="url" className="block text-lg font-medium mb-2">Video URL:</label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title" className="block text-lg font-medium mb-2">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="block text-lg font-medium mb-2">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group">
              <label htmlFor="tags" className="block text-lg font-medium mb-2">Tags (comma-separated):</label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Add Video
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateExercises;
