const asyncHandler = require('express-async-handler');
const Message = require('../models/messageSchema');
const Player = require('../models/playerSchema');
const Coach = require('../models/coachSchema');

// Send message from player to coach
const sendMessageFromPlayer = asyncHandler(async (req, res) => {
  const { playerId, coachId, text, assignId } = req.body;

  try {
    const player = await Player.findById(playerId);
    const coach = await Coach.findById(coachId);

    if (!player || !coach) {
      res.status(404);
      throw new Error('Player or Coach not found');
    }

    const message = new Message({
      senderId: playerId,
      receiverId: coachId,
      senderModel: 'Player',
      receiverModel: 'Coach',
      text,
      assignId
    });

    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Send message from coach to player
const sendMessageFromCoach = asyncHandler(async (req, res) => {
  const { coachId, playerId, text, assignId } = req.body;

  try {
    const player = await Player.findById(playerId);
    const coach = await Coach.findById(coachId);

    if (!player || !coach) {
      res.status(404);
      throw new Error('Player or Coach not found');
    }

    const message = new Message({
      senderId: coachId,
      receiverId: playerId,
      senderModel: 'Coach',
      receiverModel: 'Player',
      text,
      assignId
    });

    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Fetch messages for a player from their coach
const fetchMessagesForPlayer = asyncHandler(async (req, res) => {
    const { playerId } = req.params;
  
    try {
      const messages = await Message.find({
        $or: [
          { senderId: playerId, senderModel: 'Player' },
          { receiverId: playerId, receiverModel: 'Player' }
        ]
      }).populate('assignId senderId receiverId');
  
      console.log(messages)
      res.status(200).json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
  // Fetch all messages from players for a coach
  const fetchMessagesForCoach = asyncHandler(async (req, res) => {
    const { coachId } = req.params;
  
    try {
      const coach = await Coach.findById(coachId).populate('players');
      if (!coach) {
        res.status(404);
        throw new Error('Coach not found');
      }
  
      const messages = await Message.find({
        $or: [
          { senderId: coachId, senderModel: 'Coach' },
          { receiverId: coachId, receiverModel: 'Coach' }
        ]
      }).populate('assignId senderId receiverId');
      res.status(200).json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  

module.exports = {
  sendMessageFromPlayer,
  sendMessageFromCoach,
  fetchMessagesForPlayer,
  fetchMessagesForCoach
};