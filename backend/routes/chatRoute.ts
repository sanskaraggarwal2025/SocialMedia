import express from "express";
const router = express.Router();
import  Chat  from "../models/chatModel";
import  authMiddleware  from "../middlewares/authMiddleware";
router.post("/", authMiddleware, async (req, res) => {
  const userId = req.headers["userId"];
  const newChat = new Chat({
    members: [userId, req.body.recieverId],
  });
  // console.log(newChat.members);
  try {
    const result = await newChat.save();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//it's like list of people you have chat with
router.get("/:userId",authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(chat);
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

export default router;
