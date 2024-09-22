import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Chat = ({ playerId, coachId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const [assign, setAssign] = useState();
    const [selectedAssign, setSelectedAssign] = useState();

    useEffect(() => {
        const storedUser = localStorage.getItem('nguser');

        if (storedUser) {
            const player = JSON.parse(storedUser);
            console.log(player)
            setUser(player);

        } else {
            navigate('/')
        }
    }, [])


    useEffect(() => {
        if (user) {
            fetchMessages();
            fetchAssignedSessions();
        }
    }, [user]);


 const fetchAssignedSessions = async () => {
    try {
      let response = await axios.get(`/api/sessions/player/${user._id}/sessions`);
      setAssign(response.data);
    } catch (e) {
    //   alert('Error fetching sessions');
    console.log(e)
    }
  };

    // Fetch messages from API
    const fetchMessages = async () => {
        try {
            console.log("hello")
            const response = await axios.get(`/api/message/player/${user._id}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Send a new message
    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await axios.post('/api/message/player', {
                playerId: user._id,
                coachId: user.coach,
                text: newMessage,
                assignId: selectedAssign // Replace with actual session ID
            });
            setMessages([...messages, response.data]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
   
    return (
        <main className='text-black p-20'>
            <p className=' text-4xl font-bold'>Messages</p>
        <div className="flex flex-col h-full max-h-screen">
            <div className="flex-1 overflow-y-scroll p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message._id} className={`p-3 rounded-lg ${message.senderModel === 'Player' ? 'bg-blue-500 text-white ml-auto' : 'bg-teal-300 mr-auto'}`}>
                         <p className={`font-bold ${message.senderModel === 'Coach' ? 'bg-teal-300 text-white' : 'bg-blue-500'}`}>{message.senderModel === 'Player' ? message.senderId.name : 'You'}:</p>
                        <p className={`p-3 rounded-lg text-lg text-gray-800  ${message.senderModel === 'Player' ? 'bg-blue-500' : 'bg-teal-300'}`}>{message.text}</p>
                        <small className={`p-3 rounded-lg ${message.senderModel === 'Player' ? 'bg-blue-500 text-white' : 'bg-teal-300'}`}>{new Date(message.timestamp).toLocaleString()}</small>
                        <small className={`text-xs text-gray-700 ${message.senderModel === 'Coach' ? 'bg-teal-300 text-white' : 'bg-blue-500'}`}>Reference to Session: {message.assignId ? message.assignId.name : "General"}</small>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-teal-200">
                <textarea
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
               <label htmlFor='assign' className='mb-1'>
                        Select Assign
                    </label>
                    <select
                        name='assign'
                        value={selectedAssign}
                        onChange={e => setSelectedAssign(e.target.value)}
                        className='px-3 py-2 border rounded-md border-teal-300 mb-5 w-full text-white'
                    >
                        <option value="" disabled>Select a Session</option>
                        {assign && assign.map(session => (
                            <option key={session._id} value={session._id}>{session.name}</option>
                        ))}
                    </select>

  
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

export default Chat;