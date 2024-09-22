import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoachChat = ({ coachId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [assign, setAssign] = useState();
    const [selectedAssign, setSelectedAssign] = useState();

    useEffect(() => {
        const storedUser = localStorage.getItem('nguser');
    
        if (storedUser) {
            const coach = JSON.parse(storedUser);
            setUser(coach);
        } else {
            navigate('/');
        }
    }, []);
    
    useEffect(() => {
        if (user) {
            fetchMessages();
            fetchPlayers();
            fetchAssignedSessions();
        }
    }, [user]);

    const fetchPlayers = async () => {
        try {
            let response = await axios.get(`/api/player/${user._id}/players`);
            setPlayers(response.data);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    // Fetch messages from API
    const fetchMessages = async () => {
        try {
            const response = await axios.get(`/api/message/coach/${user._id}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Send a new message
    const sendMessage = async () => {
        if (!newMessage.trim() || !selectedPlayer || !selectedAssign) return;

        try {
            const response = await axios.post('/api/message/coach', {
                coachId: user._id,
                playerId: selectedPlayer,
                text: newMessage,
                assignId: selectedAssign
            });
            setMessages([...messages, response.data]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    
    const fetchAssignedSessions = async () => {
        try {
            let response = await axios.get('/api/sessions/all');
            setAssign(response.data);
        } catch (e) {
        //   alert('Error fetching sessions');
        console.log(e)
        }
    };


    return (
        <main className='text-white p-20'>
            <p className='text-4xl font-bold'>Coach Messages</p>
            <div className="flex flex-col h-full max-h-[120vh]">
                <div className="flex-1 overflow-y-scroll p-4 space-y-4">
                    {messages.map((message) => (
                        <div key={message._id} className={`p-3 rounded-lg ${message.senderModel === 'Coach' ? 'bg-blue-500 text-white ml-auto' : 'bg-teal-300 mr-auto'}`}>
                            <p className={`font-bold ${message.senderModel === 'Coach' ? 'bg-blue-500 text-white' : 'bg-teal-300'}`}>{message.senderModel === 'Player' ? message.senderId.name : 'You'}:</p>
                            <p className={`text-lg text-gray-700 ${message.senderModel === 'Coach' ? 'bg-blue-500 text-white' : 'bg-teal-300'}`}>{message.text}</p>
                            <small className={`text-xs text-gray-700 ${message.senderModel === 'Coach' ? 'bg-blue-500 text-white' : 'bg-teal-300'}`}>{new Date(message.timestamp).toLocaleString()}</small>
                            <br />
                            <small className={`text-xs text-gray-700 ${message.senderModel === 'Coach' ? 'bg-blue-500 text-white' : 'bg-teal-300'}`}>Reference to Session: {message.assignId ? message.assignId.name : "General"}</small>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                    <label htmlFor='player' className='mb-1'>
                        Select Player
                    </label>
                    <select
                        name='player'
                        value={selectedPlayer}
                        onChange={e => setSelectedPlayer(e.target.value)}
                        className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full text-white'
                    >
                        <option value="" disabled>Select a Player</option>
                        {players && players.map(player => (
                            <option key={player._id} value={player._id}>{player.name}</option>
                        ))}
                    </select>

                    <label htmlFor='assign' className='mb-1'>
                        Select Session
                    </label>
                    <select
                        name='assign'
                        value={selectedAssign}
                        onChange={e => setSelectedAssign(e.target.value)}
                        className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full text-white'
                    >
                        <option value="" disabled>Select a Session</option>
                        {assign && assign.map(session => (
                            <option key={session._id} value={session._id}>{session.sessionName}</option>
                        ))}
                    </select>


                    <textarea
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </main>
    );
};

export default CoachChat;