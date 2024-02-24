import  express from "express";
const router = express.Router();
import Post  from "../models/postModel";
import  User  from "../models/userModel";
import  mongoose from "mongoose"
import  authMiddleware  from "../middlewares/authMiddleware";

//create a post
router.post("/", authMiddleware, async (req, res) => {
  const userId = req.headers["userId"];

  const { desc, image } = req.body;
  try {
    const newPost = await Post.create({
      userId: userId,
      desc: desc,
      image: image,
    });

    if (!newPost) {
      return res.status(500).send("post cannot be created");
    }
    return res.status(200).json({
      msg: "post created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// get a post
router.get("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(500).send("cannot get the image");
    }
    return res.status(200).send({
      msg: post,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

//update a post
router.put("/:id", authMiddleware, async (req, res) => {
  const userId = req.headers["userId"];
  const postId = req.params.id;
  // const userId = req.userId;
  try {
    const post = await Post.findById(postId);
    let psid = post?.userId;
    let psidValue = psid?.valueOf();
    if (psidValue !== userId) {
      return res.status(500).send("access denied");
    }
    await post?.updateOne({ $set: req.body });
    return res.status(500).send("post updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

//delete a post
router.delete("/:id", authMiddleware, async (req, res) => {
  const postId = req.params.id;
  const userId = req.headers["userId"];
  try {
    const post = await Post.findById(postId);
    if (post?.userId !== userId) {
      return res.status(500).send("access denied");
    }
    await Post.findByIdAndDelete(postId);
    return res.status(500).send("post updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// like/dislike a post
router.put("/:id/like", authMiddleware, async (req, res) => {
  const postId = req.params.id;
  // const userId = req.userId;
  const userId = req.headers["userId"];

  try {
    const post = await Post.findById(postId);
    if (post?.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      return res.status(200).send("Post Disliked");
    }
    await post?.updateOne({ $push: { likes: userId } });
    return res.status(500).send("Post Liked");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

//timeline route 
router.get('/:id/timeline',authMiddleware,async(req,res) => {
  const userId = req.params.id;
  try{
    const currentUserPosts = await Post.find({userId:userId});
    const followingPosts = await User.aggregate([
      {
        $match:{
          _id:new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup:{
          from:"posts",
          localField:"following",
          foreignField:"userId",
          as:"followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id:0
        },
      },
    ])

    res.status(200).json(
      currentUserPosts
      .concat(...followingPosts[0].followingPosts)
      .sort((a,b) => {
        return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      })
    )
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})
export default router;
