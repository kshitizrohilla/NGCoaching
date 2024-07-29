const express = require('express');
const router = express.Router();
const { registerCoach } = require('../controllers/coachController');

// Register a new coach
router.post('/register', registerCoach);

module.exports = router;