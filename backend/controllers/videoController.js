const asyncHandler = require('express-async-handler');
const Video = require('../models/videoSchema');

const fetchVideos = asyncHandler(async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const insertVideo = asyncHandler(async (req, res) => {
    const { url, title, description, tags } = req.body;
    try {
        const newVideo = new Video({ url, title, description, tags });
        await newVideo.save();
        res.status(201).json({ message: 'Video added successfully', data: newVideo });
    } catch (err) {
        console.error('Error adding video:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = { fetchVideos, insertVideo };