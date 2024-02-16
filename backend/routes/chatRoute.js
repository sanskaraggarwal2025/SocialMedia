const express = require("express");
const router = express.Router();
const { Chat } = require("../models/chatModel");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.recieverId],
  });
  try {
    const res = await newChat.save();
    res.status(200).send(res);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//it's like list of people you have chat with
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/find/:firstId/:secondId", authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
