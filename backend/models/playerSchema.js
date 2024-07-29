const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  coach: { type: Schema.Types.ObjectId, ref: 'Coach' }
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;