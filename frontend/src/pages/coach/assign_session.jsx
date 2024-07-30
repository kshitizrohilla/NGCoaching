import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Switcher from '../../Components/toggle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AssignSession = () => {
    const [name, setName] = useState("");
    const [sessions, setSessions] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [players, setPlayers] = useState([]);
    const [coach, setCoach] = useState(null);
    const [selectedSession, setSelectedSession] = useState("");
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
            fetchAllSessions();
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

    const fetchAllSessions = async () => {
        try {
          let response = await axios.get('/api/sessions/all');
          
          setSessions(response.data);
        } catch (e) {
          alert('Error fetching sessions');
        }
      };

    const assignSession = async e => {
        e.preventDefault();
        if (name.length < 1 || !selectedSession || selectedPlayers.length < 1 || !startDate || !endDate) {
            alert("Please fill all the details");
            return;
        }
        setLoading(true);
        try {
            let response = await axios.post('/api/assign', { 
                name,
                coachId: user._id,
                sessionId: selectedSession,
                startDate,
                endDate,
                playerIds: selectedPlayers
            });
            if (response.status === 201) {
                navigate('/coach');
            }
        } catch (error) {
            alert("Error: try again");
        } finally {
            setLoading(false);
        }
    };

    const togglePlayerSelection = (playerId) => {
        setSelectedPlayers(prevSelected => {
            const updatedSelection = prevSelected.includes(playerId)
                ? prevSelected.filter(id => id !== playerId)
                : [...prevSelected, playerId];
            console.log("Updated Selection:", updatedSelection); 
            return updatedSelection;
        });
    };

    return (
        <main className='w-screen h-screen flex justify-center items-center text-center'>
            <form className='bg-black text-white p-8 rounded-lg' onSubmit={assignSession}>
                <div>
                    <p className='text-7xl font-extrabold'><span className='text-orange-600'>Assign</span> Session</p>
                    <p className='mt-8'>Fill all the details to assign a session to your players</p>
                </div>

                <div className='flex justify-center flex-col items-start mt-10'>
                    <label htmlFor='name' className='mb-1'>
                        Name
                    </label>
                    <input
                        name='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full'
                        placeholder='Session Name'
                    />

                    <label htmlFor='session' className='mb-1'>
                        Select Session
                    </label>
                    <select
                        name='session'
                        value={selectedSession}
                        onChange={e => setSelectedSession(e.target.value)}
                        className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full text-white'
                    >
                        <option value="" disabled>Select a session</option>
                        {sessions && sessions.map(session => (
                            <option key={session._id} value={session._id}>{session.sessionName}</option>
                        ))}
                    </select>

                    <label htmlFor='startDate' className='mb-1 mt-2'>
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className='date-input px-3 py-2 text-white w-full rounded-lg'
                        placeholder='Select Start Date'
                    />
                    
                    <label htmlFor='endDate' className='mb-1 mt-2'>
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className='date-input px-3 py-2 text-white w-full rounded-lg'
                        placeholder='Select End Date'
                    />

                    <label className='mb-1 mt-4'>
                        Select Players
                    </label>
                    <div className="w-full">
                        {players && players.map(player => (
                            <div key={player._id} className="w-full text-left mt-3 flex border border-white px-2 py-3 rounded-full items-center">
                                <Switcher
                                    isChecked={selectedPlayers.includes(player._id)} 
                                    onToggle={() => togglePlayerSelection(player._id)}
                                />
                                <h2 className='ml-2 w-full'>{player.name}</h2>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className='w-full my-4 bg-orange-600 font-semibold rounded-md py-4 text-white hover:bg-orange-600/80 cursor-pointer'
                    >
                        {loading ? "Loading..." : 'Assign Session'}
                    </button>
                </div>
            </form>
        </main>
    );
};

export default AssignSession;