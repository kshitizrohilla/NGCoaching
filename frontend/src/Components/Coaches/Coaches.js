// src/components/Coaches.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Coaches.css';

function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCoaches() {
      try {
        const response = await axios.get('http://localhost:5000/coaches'); // Adjust endpoint as needed
        setCoaches(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoaches();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="coaches">
      <h1 className="coaches-heading">Coaches</h1>
      <div className="coach-container">
        {coaches.map((coach, index) => (
          <div className="coach-card" key={index}>
            <h2 className="coach-name">{coach.name}</h2>
            <p className="coach-email">Email: {coach.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Coaches;
