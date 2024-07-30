const asyncHandler = require('express-async-handler');
const Assign = require('../models/assignSchema');
const Coach = require('../models/coachSchema');
const Player = require('../models/playerSchema');
const Session = require('../models/sessionSchema');
const transporter = require('./../mailer');
const mongoose = require('mongoose');
const Exercise = require('../models/exerciseSchema');

// Assign a session to a group of players by a coach
const assignSession = asyncHandler(async (req, res) => {
    const { name, coachId, sessionId, startDate, endDate, playerIds } = req.body;

    async function getSessionNameById(sessionId) {
      try {
          const session = await Session.findById(sessionId);
          if (session) {
              // console.log('Session Name:', session.sessionName); // Adjust field name if needed
              return session.sessionName;
          } else {
              console.log('Session not found');
          }
      } catch (error) {
          console.error('Error fetching session:', error);
      }
    }

    async function fetchAndLogExercises(sessionId) {
      try {
        // Find the session by ID
        const session = await Session.findById(sessionId).exec();
    
        if (!session) {
          console.log('Session not found');
          return;
        }
    
        // Convert each ObjectId to a string and create a new array
        const exerciseIds = session.excercise.map(id => id.toString());
    
        // Log the array of exercise IDs
        return exerciseIds;
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    }
    

    async function fetchUrlsForExercises(exerciseIds) {
      try {
          // Convert string IDs to ObjectId using `mongoose.Types.ObjectId`
          const objectIds = exerciseIds.map(id => new mongoose.Types.ObjectId(id));
  
          // Fetch exercises by their IDs
          const exercises = await Exercise.find({ _id: { $in: objectIds } }).exec();
  
          // Create an array to hold the URLs
          const videoUrls = exercises.map(exercise => exercise.url);
  
          // Log the array of video URLs
          return videoUrls;
  
      } catch (error) {
          console.error('Error fetching video URLs:', error);
      }
  }

  async function fetchEmailsForStudents(playerIds) {
    try {
        // Convert string IDs to ObjectId using `mongoose.Types.ObjectId`
        const objectIds = playerIds.map(id => new mongoose.Types.ObjectId(id));

        // Fetch students by their IDs
        const students = await Player.find({ _id: { $in: objectIds } }).exec();

        // Create an array to hold the emails
        const studentEmails = students.map(student => student.email);

        // Return the array of student emails
        return studentEmails;

    } catch (error) {
        console.error('Error fetching student emails:', error);
        return [];
    }
}


    try {
        // Validate coach
        const coach = await Coach.findById(coachId);
        if (!coach) {
            res.status(404);
            throw new Error('Coach not found');
        }

        // Validate session
        const session = await Session.findById(sessionId);
        console.log(session);
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

        const sessionName = await getSessionNameById(sessionId);
        console.log(sessionName);

        const exercisesIdsList = await fetchAndLogExercises(sessionId);
        console.log(exercisesIdsList);

        const videosList = await fetchUrlsForExercises(exercisesIdsList);
        console.log(videosList);

        const emailAddresses = await fetchEmailsForStudents(playerIds);
        console.log(emailAddresses);

        // Set up email options
    const mailOptions = {
      from: process.env.SERVICE_EMAIL,
      to: emailAddresses,
      subject: 'Invitation for new training session',
      text: `You are invited to start a new training session created by your coach. The details of the training session is as follows:\n\n` +
            `Session Name: ${sessionName}\n` +
            `Start Date: ${startDate}\n` +
            `End Date: ${endDate}\n\n` +
            `Videos:\n${videosList.join('\n')}`
    };

    // // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Training session created but failed to send email.' });
      } else {
        console.log('Email sent:', info.response);
        res.status(201).json({ message: 'Training created successfully and email sent!' });
      }
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