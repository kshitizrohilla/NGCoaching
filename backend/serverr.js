const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ng_coaching_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
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
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  coach: {
    type: String,
    required: true
  }
});

const coachSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Define training schema
const trainingSchema = new mongoose.Schema({
  session: {
    sessionName: String,
    startDate: String,
    endDate: String,
    videos: [
      {
        videoId: String,
        url: String
      }
    ]
  },
  students_list: [String],
  coach: String // Added coach field
});

const Video = mongoose.model('Video', videoSchema, 'videos');
const Session = mongoose.model('Session', sessionSchema, 'sessions'); // Specify collection name
const Student = mongoose.model('Student', studentSchema, 'students'); // Specify collection name
const Coach = mongoose.model('Coach', coachSchema, 'coaches'); // Specify collection name
const Training = mongoose.model('Training', trainingSchema, 'trainings'); // Specify collection name

// Route to handle session creation
app.post('/create-sessions', async (req, res) => {
  try {
    const { sessionName, startDate, endDate, videos } = req.body;

    // Create a new session document using the imported Session model
    const newSession = new Session({
      sessionName, // Include sessionName
      startDate,
      endDate,
      videos
    });

    // Save the session to the database
    await newSession.save();

    // Respond with success
    res.status(201).json({ message: 'Session created successfully', data: newSession });
  } catch (err) {
    console.error('Error creating session:', err);
    res.status(500).json({ error: err.message });
  }
});

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
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to create a new student
app.post('/register-students', async (req, res) => {
  const { email, name, age, coach } = req.body;

  try {
    const newStudent = new Student({ email, name, age, coach });
    await newStudent.save();
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
    const { name, email } = req.body;

    // Create a new coach document
    const newCoach = new Coach({
      name,
      email
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

// Route to handle training creation
app.post('/insert-trainings', async (req, res) => {
  try {
    const { session, students_list, coach } = req.body;

    // Create a new training document
    const newTraining = new Training({
      session,
      students_list,
      coach // Include coach
    });

    // Save the training to the database
    await newTraining.save();

    // Respond with success
    res.status(201).json({ message: 'Training created successfully', data: newTraining });
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

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});