const express = require('express');
const router = express.Router();
const { fetchAllExercises, createExercise } = require('../controllers/exerciseController');

// Fetch all exercises
router.get('/all', fetchAllExercises);

// Create a new exercise
router.post('/create', createExercise);

module.exports = router;