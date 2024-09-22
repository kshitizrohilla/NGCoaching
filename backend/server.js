const express = require('express')
const app = express()
const path = require('path');

const sessionRoutes = require('./routes/sessionRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const playerRoutes = require('./routes/playerRoutes.js');
const coachRoutes = require('./routes/coachRoutes');
const assignRoutes = require('./routes/assignRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js')


const cors = require('cors')
require('colors')
require('dotenv').config()
const connectDB = require('./config/db')
app.use(express.json());

app.use(cors())

connectDB()

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/coach', coachRoutes);
app.use('/api/assign', assignRoutes);
app.use('/api/message', messageRoutes);


//===========================DEPLOYMENT=================================

const __direname1 = path.resolve();
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}

//===========================DEPLOYMENT=================================

app.get('/', (_, res) => {
    res.send('API is running...');
});


const PORT = process.env.PORT 
app.listen(PORT, console.log(`Server running on PORT ${PORT}`.blue))