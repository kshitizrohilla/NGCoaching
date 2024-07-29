const asyncHandler = require('express-async-handler');
const Exercise = require('../models/exerciseSchema');

const fetchAllExercises = asyncHandler(async (req, res) => {
    try {
        const exercises = await Exercise.find({});
        res.status(200).json(exercises);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Create a new exercise
const createExercise = asyncHandler(async (req, res) => {
    const { url, title, description, tags } = req.body;

    try {
        const exercise = new Exercise({
            url,
            title,
            description,
            tags
        });

        const createdExercise = await exercise.save();
        res.status(201).json(createdExercise);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = { fetchAllExercises, createExercise };