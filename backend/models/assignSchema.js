const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const assignSchema = new Schema({
    name: {type: String, required: true},
    session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    players: [{ type: Schema.Types.ObjectId, ref: 'Player', required: true }],
    coach: { type: Schema.Types.ObjectId, ref: 'Coach', required: true }
});

module.exports = mongoose.model('Assign', assignSchema);
