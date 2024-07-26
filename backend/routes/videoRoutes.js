const express = require('express');
const { fetchVideos, insertVideo } = require('../controllers/videoController');

const router = express.Router();

router.get('/', fetchVideos);
router.post('/create', insertVideo);

module.exports = router;