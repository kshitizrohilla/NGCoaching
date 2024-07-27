const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE_NAME,
  auth: {
    user: process.env.SERVICE_EMAIL,
    pass: process.env.SERVICE_APP_PASSWORD
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ng_coaching_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    default: 'admin',
    immutable: true // Makes sure the field cannot be changed once set
  }
});

// video schema
const videoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  }
});

// session schema
const sessionSchema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  videos: [
    {
      videoId: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ]
});

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  userType: {
    type: String,
    default: 'student',
    immutable: true
  },
  password: {
    type: String,
    required: true
  }
});

const coachSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    default: 'coach',
    enum: ['coach']  // Ensures userType can only be 'coach'
  }
});

const trainingSchema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  students_list: [
    {
      type: String, // If using string IDs
      required: true
    }
  ],
  videos_list: [
    {
      type: String // Store video URLs as strings
    }
  ]
});

const Admin = mongoose.model('Admin', adminSchema, 'admins');
const Student = mongoose.model('Student', studentSchema, 'students'); // Specify collection name

const Video = mongoose.model('Video', videoSchema, 'videos');
const Session = mongoose.model('Session', sessionSchema, 'sessions'); // Specify collection name
const Coach = mongoose.model('Coach', coachSchema, 'coaches'); // Specify collection name
const Training = mongoose.model('Training', trainingSchema, 'trainings'); // Specify collection name

// Route to get all videos
app.get('/fetch-videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to add a new video
app.post('/insert-videos', async (req, res) => {
  try {
    const { url, title, description, tags } = req.body;

    const newVideo = new Video({
      url,
      title,
      description,
      tags
    });

    await newVideo.save();
    res.status(201).json({ message: 'Video added successfully', data: newVideo });
  } catch (err) {
    console.error('Error adding video:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route to get all sessions
app.get('/fetch-sessions', async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all students
app.get('/fetch-students', async (req, res) => {
  const { ids } = req.body;
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to fetch students by IDs
app.post('/fetch-students-by-id', async (req, res) => {
  const { ids } = req.body; // Expecting an array of student IDs

  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'Invalid input, expected an array of IDs' });
  }

  try {
    const students = await Student.find({ _id: { $in: ids } });
    console.log(students);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to create a new student
app.post('/register-students', async (req, res) => {
  const { email, password, name, age } = req.body;

  try {

    // Create a new student
    const newStudent = new Student({ email, name, age, password });
    await newStudent.save();

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

    // Respond with success
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to fetch all coach names and emails
app.get('/coaches', async (req, res) => {
  try {
    // Fetch both 'name' and 'email' fields
    const coaches = await Coach.find({}, 'name email'); // Fetch 'name' and 'email' fields
    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coaches' });
  }
});

// Route to handle coach registration
app.post('/register-coaches', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new coach document
    const newCoach = new Coach({
      name,
      email,
      password
    });

    // Save the coach to the database
    await newCoach.save();

    // Respond with success
    res.status(201).json({ message: 'Coach registered successfully', data: newCoach });
  } catch (err) {
    console.error('Error registering coach:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route to get all trainings
app.get('/fetch-trainings', async (req, res) => {
  try {
    const trainings = await Training.find();
    console.log(trainings);
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to fetch students by coach name
app.get('/fetch-students-by-coach', async (req, res) => {
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

// Endpoint to insert a new training session
app.post('/insert-trainings', async (req, res) => {
  try {
    const { sessionName, startDate, endDate, students_list, videos_list } = req.body;

    // Create a new training document
    const newTraining = new Training({
      sessionName,
      startDate,
      endDate,
      students_list,
      videos_list
    });

    // Log the object being saved
    console.log('Creating new training:', newTraining);

    // Save the training document to the database
    await newTraining.save();

    // Fetch email addresses of selected students
    const students = await Student.find({ _id: { $in: students_list } });
    const emailAddresses = students.map(student => student.email);

    // Set up email options
    const mailOptions = {
      from: process.env.SERVICE_EMAIL,
      to: emailAddresses,
      subject: 'Invitation for new training session',
      text: `You are invited to start a new training session created by your coach. The details of the training session is as follows:\n\n` +
            `Session Name: ${sessionName}\n` +
            `Start Date: ${startDate}\n` +
            `End Date: ${endDate}\n\n` +
            `Videos:\n${videos_list.join('\n')}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Training session created but failed to send email.' });
      } else {
        console.log('Email sent:', info.response);
        res.status(201).json({ message: 'Training created successfully and email sent!' });
      }
    });
  } catch (err) {
    console.error('Error creating training:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route to get student ID by name
app.post('/getStudentId', async (req, res) => {
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

app.post('/admins/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, password });

    if (admin) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ success: false });
  }
});

app.post('/coaches/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const coach = await Coach.findOne({ email, password });

    if (coach) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error during coach login:', error);
    res.status(500).json({ success: false });
  }
});

app.post('/students/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find student by email
    const student = await Student.findOne({ email, password });
    
    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error during student login:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login. Please try again.' });
  }
});

// Create Sessions Endpoint
app.post('/create-sessions', async (req, res) => {
  const { sessionName, startDate, endDate, videos } = req.body;

  try {
    const newSession = new Session({
      sessionName,
      startDate,
      endDate,
      videos,
    });

    await newSession.save();
    res.status(201).json(newSession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});