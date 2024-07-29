const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminSchema');
const Coach = require('../models/coachSchema');
const Player = require('../models/playerSchema');

// Admin Login
const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email, password });
        if (admin) {
            res.status(200).json({ message: 'Admin login successful', "user": admin });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Coach Login
const coachLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const coach = await Coach.findOne({ email, password });
        if (coach) {
            res.status(200).json({ message: 'Coach login successful', "user": coach });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Player Login
const playerLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const player = await Player.findOne({ email, password });
        if (player) {
            res.status(200).json({ message: 'Player login successful', "user": player });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {
    adminLogin,
    coachLogin,
    playerLogin
};