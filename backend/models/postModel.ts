import mongoose from "mongoose";
import  User from  "./userModel";


const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // type:String,
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

const Post = mongoose.model("Post", postSchema);
export default Post;
