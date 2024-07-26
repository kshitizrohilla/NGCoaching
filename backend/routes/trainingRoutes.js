const express = require('express');
const { fetchTrainings, insertTraining } = require('../controllers/trainingController');

const router = express.Router();

router.get('/', fetchTrainings);
router.post('/create', insertTraining);

module.exports = router;