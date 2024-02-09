const express = require("express")
const router = express.Router();
const {Post} = require('../models/postModel');
const { authMiddleware } = require("../middlewares/authMiddleware");

//create a post
router.post('/',authMiddleware,async(req,res) => {
    const {desc,image} = req.body;
    try{
        const newPost = await Post.create({
            userId:req.userId,
            desc: desc,
            image:image
        })

        if(!newPost){
            return res.status(500).send('post cannot be created')
        }
        return res.status(200).json({
            msg:"post created successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})

// get a post
router.get('/:id',authMiddleware,async(req,res) => {
    const id = req.params.id;
    try{
        const post = await Post.findById(id);
        if(!post){
            return res.status(500).send('cannot get the image')
        }
        return res.status(200).send({
            msg:post
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})

//update a post
router.put('/:id',authMiddleware,async(req,res) => {
    const postId = req.params.id;
    const userId = req.userId;
    try{
        const post = await Post.findById(postId);
        let psid = post.userId;
        let psidValue = psid.valueOf();
        if(psidValue !== userId){
            return res.status(500).send('access denied');
        }
        await post.updateOne({$set:req.body})
        return res.status(500).send("post updated");
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})

//delete a post
router.delete('/:id',authMiddleware,async(req,res) => {
    const postId = req.params.id;
    const userId = req.userId;
    try{
        const post = await Post.findById(postId);
        if(post.userId !== userId){
            return res.status(500).send('access denied');
        }
        await Post.findByIdAndDelete(postId);
        return res.status(500).send("post updated");
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})

// like/dislike a post
router.put('/:id/like',authMiddleware,async(req,res) => {
    const postId = req.params.id;
    const userId = req.userId;
    try{
        const post = await Post.findById(postId);
        if(post.likes.includes(userId)){
            await post.updateOne({$pull:{likes:userId}});
            return res.status(200).send("Post Disliked");
        }
        await post.updateOne({$push:{likes:userId}});
        return res.status(500).send("Post Liked")
        
    }
    catch(err){
        console.log(err)
        return res.status(500).send(err);
    }
})

module.exports = router;