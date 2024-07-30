import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllPlayers = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('nguser');
    if (storedUser) {
      const coach = JSON.parse(storedUser);
      setUser(coach);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchAllPlayers();
    }
  }, [user]);

  const fetchAllPlayers = async () => {
    try {
      let response = await axios.get(`/api/player/${user._id}/players`);
      setPlayers(response.data);
    } catch (e) {
      alert('Error fetching players');
    }
  };

  return (
    <div className="container mx-auto p-20">
      <h1 className="text-5xl font-bold mb-12">All Players</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players && players.map((player, index) => (
          <div key={player._id} className=" shadow-md rounded-lg p-4 border border-blue-400">
            <h2 className="text-2xl font-semibold mb-2 text-orange-500">Player {index + 1}</h2>
            <p className="text-gray-200 text-xl font-bold">Name:<span className='font-medium text-green-200'> {player.name} </span></p>
            <p className="text-gray-200 text-xl font-bold">Email:<span className='font-medium text-blue-400'> {player.email} </span></p>
            <p className="text-gray-200 text-xl font-bold">Age:<span className='font-medium'> {player.age} </span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPlayers;