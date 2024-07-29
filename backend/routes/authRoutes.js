const express = require('express');
const router = express.Router();
const { adminLogin, coachLogin, playerLogin } = require('../controllers/authControllers');

router.post('/admin/login', adminLogin);
router.post('/coach/login', coachLogin);
router.post('/player/login', playerLogin);

module.exports = router;