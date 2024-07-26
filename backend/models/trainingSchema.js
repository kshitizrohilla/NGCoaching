const mongoose = require('mongoose')

const trainingSchema = mongoose.Schema({
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

module.exports = mongoose.model("Training", trainingSchema)