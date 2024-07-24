import React, { useState } from 'react';
import axios from 'axios';
import './CoachRegistration.css';

function CoachRegistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register-coaches', {
        name,
        email
      });

      // Save coach name to localStorage
      localStorage.setItem('coachName', name);

      setMessage('Coach registered successfully!');
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error registering coach:', error);
      setMessage('Failed to register coach.');
    }
  };

  return (
    <div className="coach-registration">
      <h2>Register Coach</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CoachRegistration;
