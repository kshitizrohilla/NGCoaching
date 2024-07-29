const express = require('express');
const router = express.Router();
const { createSession, fetchPlayerSessions, fetchCoachSessions, fetchAllSessions } = require('../controllers/sessionController');

router.post('/create', createSession);
router.get('/all', fetchAllSessions);
router.get('/player/:playerId/sessions', fetchPlayerSessions);
router.get('/coach/:coachId/sessions', fetchCoachSessions);

module.exports = router;