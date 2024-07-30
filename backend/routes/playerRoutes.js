const express = require('express');
const router = express.Router();
const { fetchAllPlayers, registerPlayer } = require('../controllers/playerController');

router.post('/register', registerPlayer);
router.get('/:coachId/players', fetchAllPlayers);

module.exports = router;