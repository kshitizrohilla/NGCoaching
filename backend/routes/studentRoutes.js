const express = require('express');
const { fetchStudents, fetchStudentsById, registerStudent, getStudentId, fetchStudentsByCoach } = require('../controllers/studentController');

const router = express.Router();

router.get('/', fetchStudents);
router.post('/fetch-by-id', fetchStudentsById);
router.post('/register', registerStudent);
router.post('/get-id', getStudentId);
router.get('/by-coach', fetchStudentsByCoach);

module.exports = router;