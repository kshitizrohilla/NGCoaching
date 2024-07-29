const express = require('express');
const router = express.Router();
const { fetchAllPlayers, registerPlayer } = require('../controllers/playerController');

router.post('/register', registerPlayer);
// Fetch all players of any coach
router.get('/:coachId/players', fetchAllPlayers);

module.exports = router;
// const express = require('express');
// const { fetchStudents, fetchStudentsById, registerStudent, getStudentId, fetchStudentsByCoach } = require('../controllers/playerController');

// const router = express.Router();

// router.get('/', fetchStudents);
// router.post('/fetch-by-id', fetchStudentsById);
// router.post('/register', registerStudent);
// router.post('/get-id', getStudentId);
// router.get('/by-coach', fetchStudentsByCoach);

// module.exports = router;