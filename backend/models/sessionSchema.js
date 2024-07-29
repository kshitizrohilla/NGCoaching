const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    sessionName: { type: String, required: true },
    sessionTags: [{ type: String }],
    excercise: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
});

module.exports = mongoose.model('Session', sessionSchema);