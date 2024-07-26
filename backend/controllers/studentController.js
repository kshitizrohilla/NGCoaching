const asyncHandler = require('express-async-handler');
const Student = require('../models/studentSchema');

const fetchStudents = asyncHandler(async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const fetchStudentsById = asyncHandler(async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
        return res.status(400).json({ error: 'Invalid input, expected an array of IDs' });
    }
    try {
        const students = await Student.find({ _id: { $in: ids } });
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const registerStudent = asyncHandler(async (req, res) => {
    const { email, name, age, coach } = req.body;
    try {
        const newStudent = new Student({ email, name, age, coach });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const getStudentId = asyncHandler(async (req, res) => {
    const { name } = req.body;
    try {
        const student = await Student.findOne({ name });
        if (student) {
            res.json({ id: student._id });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student ID', error: error.message });
    }
});

const fetchStudentsByCoach = asyncHandler(async (req, res) => {
    const { coachName } = req.query;
    if (!coachName) {
        return res.status(400).json({ error: 'Coach name is required' });
    }
    try {
        const students = await Student.find({ coach: coachName });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

module.exports = { fetchStudents, fetchStudentsById, registerStudent, getStudentId, fetchStudentsByCoach };