const asyncHandler = require('express-async-handler');
const Session = require('../models/sessionSchema');

const createSession = asyncHandler(async (req, res) => {
    const { sessionName, startDate, endDate, videos } = req.body;
    try {
        const newSession = new Session({ sessionName, startDate, endDate, videos });
        await newSession.save();
        res.status(201).json({ message: 'Session created successfully', data: newSession });
    } catch (err) {
        console.error('Error creating session:', err);
        res.status(500).json({ error: err.message });
    }
});

const fetchSessions = asyncHandler(async (req, res) => {
    try {
        const sessions = await Session.find();
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = { createSession, fetchSessions };