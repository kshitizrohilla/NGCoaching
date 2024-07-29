const asyncHandler = require('express-async-handler');
const Session = require('../models/sessionSchema');
const Coach = require('../models/coachSchema');
const Player = require('../models/playerSchema');
const Exercise = require('../models/exerciseSchema')

const createSession = asyncHandler(async (req, res) => {
    const { sessionName, sessionTags, exercises } = req.body;
    console.log(exercises)
    try {
        // Create a new session
        const session = new Session({
            sessionName,
            sessionTags,
            excercise: exercises
        });

        const createdSession = await session.save();
        res.status(201).json(createdSession);
    } catch (error) {
        res.status(400);
        console.log("cant create session")
        throw new Error(error.message);
    }
});

const fetchAllSessions  = asyncHandler(async (req, res) => {
    try {
        const sessions = await Session.find().populate('excercise');
        res.status(200).json(sessions);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Fetch assigned sessions for a player
const fetchPlayerSessions = asyncHandler(async (req, res) => {
    const { playerId } = req.params;

    try {
        const player = await Player.findById(playerId);
        if (!player) {
            res.status(404);
            throw new Error('Player not found');
        }

        const assignments = await Assign.find({ players: playerId }).populate('session');
        res.status(200).json(assignments);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Fetch assigned sessions for a coach
const fetchCoachSessions = asyncHandler(async (req, res) => {
    const { coachId } = req.params;

    try {
        const coach = await Coach.findById(coachId);
        if (!coach) {
            res.status(404);
            throw new Error('Coach not found');
        }

        const assignments = await Assign.find({ coach: coachId }).populate('session players');
        res.status(200).json(assignments);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = { 
    createSession,
    fetchAllSessions,
    fetchPlayerSessions,
    fetchCoachSessions
};