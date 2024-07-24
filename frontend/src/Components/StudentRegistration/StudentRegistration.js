// StudentRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import './StudentRegistration.css'; // Create this CSS file for styling

const StudentRegistration = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [coach, setCoach] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register-students', {
        email,
        name,
        age,
        coach
      });
      setSuccess('Student registered successfully!');
      setError(null);

      // Store student name in localStorage
      localStorage.setItem('student_name', name);

      // Clear the form
      setEmail('');
      setName('');
      setAge('');
      setCoach('');
    } catch (err) {
      setError('Error registering student. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="student-registration">
      <h2>Register Student</h2>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coach">Coach:</label>
          <input
            type="text"
            id="coach"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default StudentRegistration;
