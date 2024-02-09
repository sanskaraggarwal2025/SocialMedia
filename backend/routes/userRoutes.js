const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/signup", async (req, res) => {
  try {
    const { username } = req.body;
    const check = await User.findOne({ username: username });
    if (check) {
      return res.status(403).send("User already exists");
    }

    const newUser = await User.create({
      username: username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    const userId = newUser._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      msg: "User created",
      token,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const check = await User.findOne({ username: req.body.username });
    if (!check) {
      return res.status(400).send("user does not exist");
    }
    const isUser = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!isUser) {
      return res.status(400).send("Invalid credentials");
    }
    const userId = isUser._id;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      msg: "user logged in",
      token,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send("No such user");
    }
    const { password, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    let users = await User.find();
    console.log(req.userId);
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  // const { currentUser, isAdmin } = req.body;
  let currentUser = req.userId;

  try {
    if (currentUser !== id || isAdmin) {
      //here might be a logic mistake
      return res.status(500).send("Access Denied");
    }
    await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      msg: "user updated successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  // const { currentUser, isAdmin } = req.body;
  let currentUser = req.userId;

  try {
    if (currentUser !== id || isAdmin) {
      return res.status(500).send("Access Denied");
    }
    await User.findByIdAndDelete(id);
    res.status(200).json("User Deleted Successfully!");
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id/follow", authMiddleware, async (req, res) => {
  const id = req.params.id;
  // const { currentUserId } = req.body;
  let currentUserId = req.userId;

  if (id === currentUserId) {
    return res.status(500).send("you cannot follow yourself");
  }

  try {
    const followUser = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    if (followUser.followers.includes(currentUserId)) {
      return res.status(500).send("you already follow this user");
    }
    await followUser.updateOne({ $push: { followers: currentUserId } });
    await currentUser.updateOne({ $push: { following: id } });
    return res.status(200).json("User followed!");
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id/unfollow", authMiddleware, async (req, res) => {
  const id = req.params.id;
  // const { currentUserId } = req.body;
  let currentUserId = req.userId;

  if (id === currentUserId) {
    return res.status(500).send("You cannot unfollow yourself");
  }
  try {
    const unfollowUser = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    if (!unfollowUser.followers.includes(currentUserId)) {
      return res.status(403).send("you are not following this id");
    }

    await unfollowUser.updateOne({
      $pull: { followers: currentUserId },
    });
    await currentUser.updateOne({ $pull: { following: id } });
    return res.status(200).send("unfollowed successfully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
