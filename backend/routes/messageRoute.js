const express = require("express");
const router = express.Router();
const { Chat } = require("../models/chatModel");
const { MessageModel } = require("../models/messageModel");
const { authMiddleware } = require("../middlewares/authMiddleware");

//add message
router.post("/", authMiddleware, async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get message
router.get("/:chatId", authMiddleware, async (req, res) => {
    const {chatId} = req.params;
    try{
        const result = await MessageModel.find({chatId})
        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
