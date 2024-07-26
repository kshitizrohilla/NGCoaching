const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
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

module.exports = mongoose.model("Student", studentSchema)

// const userSchema = mongoose.Schema({
//     email: {String},
//     password: {String},
//     role: 
// })