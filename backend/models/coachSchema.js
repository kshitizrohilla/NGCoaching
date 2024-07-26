const mongoose = require('mongoose')

const coachSchema = mongoose.Schema({
    name: String,
    email: String
});

module.exports = mongoose.model("Coach", coachSchema)