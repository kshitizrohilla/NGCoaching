const asyncHandler = require('express-async-handler');
const Coach = require('../models/coachSchema');

const fetchCoaches = asyncHandler(async (_, res) => {
    try {
        const coaches = await Coach.find({}, 'name email');
        res.status(200).json(coaches);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch coaches' });
    }
});

const registerCoach = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the coach already exists
        const coachExists = await Coach.findOne({ email });
        if (coachExists) {
            res.status(400);
            throw new Error('Coach already exists');
        }

        // Create a new coach
        const coach = new Coach({
            name,
            email,
            password,
            players: []  // Initially, no players
        });

        const createdCoach = await coach.save();
        res.status(201).json(createdCoach);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = { fetchCoaches, registerCoach };