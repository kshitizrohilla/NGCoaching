const express = require('express');
const { createSession, fetchSessions } = require('../controllers/sessionController');

const router = express.Router();

router.post('/create', createSession);
router.get('/', fetchSessions);

module.exports = router;