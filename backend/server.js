const express = require('express')
const app = express()

const sessionRoutes = require('./routes/sessionRoutes');
const videoRoutes = require('./routes/videoRoutes');
const studentRoutes = require('./routes/studentRoutes');
const coachRoutes = require('./routes/coachRoutes');
const trainingRoutes = require('./routes/trainingRoutes');


const cors = require('cors')
require('colors')
require('dotenv').config()
const connectDB = require('./config/db')
app.use(express.json());

app.use(cors())

connectDB()

app.use('/api/sessions', sessionRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/trainings', trainingRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});


const PORT = process.env.PORT 
app.listen(PORT, console.log(`Server running on PORT ${PORT}`.blue))