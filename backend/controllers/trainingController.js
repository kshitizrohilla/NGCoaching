const asyncHandler = require('express-async-handler');
const Training = require('../models/trainingSchema');

const fetchTrainings = asyncHandler(async (req, res) => {
    try {
        const trainings = await Training.find();
        res.json(trainings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const insertTraining = asyncHandler(async (req, res) => {
    const { session, students_list, coach } = req.body;
    try {
        const newTraining = new Training({ session, students_list, coach });
        await newTraining.save();
        res.status(201).json({ message: 'Training created successfully', data: newTraining });
    } catch (err) {
        console.error('Error creating training:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = { fetchTrainings, insertTraining };