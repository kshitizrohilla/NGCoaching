const express = require('express');
const { sendMessageFromPlayer, sendMessageFromCoach, fetchMessagesForPlayer, fetchMessagesForCoach } = require('../controllers/messageController');
const router = express.Router();

router.post('/player', sendMessageFromPlayer);
router.post('/coach', sendMessageFromCoach)
router.get('/player/:playerId', fetchMessagesForPlayer)
router.get('/coach/:coachId', fetchMessagesForCoach)

module.exports = router;