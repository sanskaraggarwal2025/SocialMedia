const mongoose = require("mongoose");
const {User} = require("./userModel");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    likes: [],
    image: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post',postSchema);
module.exports = {
    Post,
  };

