const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, required: true, refPath: 'senderModel' },
  receiverId: { type: Schema.Types.ObjectId, required: true, refPath: 'receiverModel' },
  senderModel: { type: String, required: true, enum: ['Player', 'Coach'] },
  receiverModel: { type: String, required: true, enum: ['Player', 'Coach'] },
  text: { type: String, required: true },
  assignId: { type: Schema.Types.ObjectId, ref: 'Assign', required: false },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;