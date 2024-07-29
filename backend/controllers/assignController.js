const asyncHandler = require('express-async-handler');
const Assign = require('../models/assignSchema');
const Coach = require('../models/coachSchema');
const Player = require('../models/playerSchema');
const Session = require('../models/sessionSchema');

// Assign a session to a group of players by a coach
const assignSession = asyncHandler(async (req, res) => {
    const { name, coachId, sessionId, startDate, endDate, playerIds } = req.body;

    try {
        // Validate coach
        const coach = await Coach.findById(coachId);
        if (!coach) {
            res.status(404);
            throw new Error('Coach not found');
        }

        // Validate session
        const session = await Session.findById(sessionId);
        if (!session) {
            res.status(404);
            throw new Error('Session not found');
        }

        // Validate players
        const players = await Player.find({ _id: { $in: playerIds }, coach: coachId });
        if (players.length !== playerIds.length) {
            res.status(400);
            throw new Error('One or more players not found or do not belong to the coach');
        }

        // Create assignment
        const assignment = new Assign({
            name,
            session: sessionId,
            startDate,
            endDate,
            players: playerIds,
            coach: coachId
        });

        const createdAssignment = await assignment.save();
        res.status(201).json(createdAssignment);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {
    assignSession
};



// const asyncHandler = require('express-async-handler');
// const Training = require('../models/assignSchema');

// const fetchTrainings = asyncHandler(async (req, res) => {
//     try {
//         const trainings = await Training.find();
//         res.json(trainings);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// const insertTraining = asyncHandler(async (req, res) => {
//     const { session, students_list, coach } = req.body;
//     try {
//         const newTraining = new Training({ session, students_list, coach });
//         await newTraining.save();
//         res.status(201).json({ message: 'Training created successfully', data: newTraining });
//     } catch (err) {
//         console.error('Error creating training:', err);
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = { fetchTrainings, insertTraining };