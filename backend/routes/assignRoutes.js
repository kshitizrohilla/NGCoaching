const express = require('express');
const router = express.Router();
const { assignSession } = require('../controllers/assignController');

router.post('/', assignSession);

module.exports = router;