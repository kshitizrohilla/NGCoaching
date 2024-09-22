const asyncHandler = require('express-async-handler');
const Coach = require('../models/coachSchema');
const Player = require('../models/playerSchema');
const transporter = require('./../mailer');

// Fetch all players of any coach
const fetchAllPlayers = asyncHandler(async (req, res) => {
    const { coachId } = req.params;

    try {
        const coach = await Coach.findById(coachId).populate('players');
        if (!coach) {
            res.status(404);
            throw new Error('Coach not found');
        }
        res.status(200).json(coach.players);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const registerPlayer = asyncHandler(async (req, res) => {
    const { name, email, password, age, coachId } = req.body;

    try {
        const coach = await Coach.findById(coachId);
        if (!coach) {
            res.status(404);
            throw new Error('Coach not found');
        }

        const player = new Player({
            name,
            email,
            password,
            age,
            coach: coachId
        });

        const createdPlayer = await player.save();

        console.log(email);

        // Send email to the student
        const mailOptions = {
          from: process.env.SERVICE_EMAIL,
          to: email,
          subject: 'Welcome to NG Coaching',
          text: `Greetings ${name},
    You are invited to join NG Coaching.
    You can get started by entering below credentials on our website:
    Email: ${email}
    Password: ${password}

    All rights reserved | NG Coaching | 2024`
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
          } else {
            console.log('Email sent:', info.response);
          }
        });

        // Add the player to the coach's players array
        coach.players.push(createdPlayer._id);
        await coach.save();

        res.status(201).json(createdPlayer);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {
    fetchAllPlayers,
    registerPlayer
};

