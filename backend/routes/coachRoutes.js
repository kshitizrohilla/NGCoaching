const express = require('express');
const { fetchCoaches, registerCoach } = require('../controllers/coachController');

const router = express.Router();

router.get('/', fetchCoaches);
router.post('/register', registerCoach);

module.exports = router;