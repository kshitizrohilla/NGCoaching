const asyncHandler = require('express-async-handler');
const Coach = require('../models/coachSchema');

const fetchCoaches = asyncHandler(async (req, res) => {
    try {
        const coaches = await Coach.find({}, 'name email');
        res.status(200).json(coaches);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch coaches' });
    }
});

const registerCoach = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    try {
        const newCoach = new Coach({ name, email });
        await newCoach.save();
        res.status(201).json({ message: 'Coach registered successfully', data: newCoach });
    } catch (err) {
        console.error('Error registering coach:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = { fetchCoaches, registerCoach };