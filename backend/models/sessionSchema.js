const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema({
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

module.exports = mongoose.model("Session", sessionSchema)