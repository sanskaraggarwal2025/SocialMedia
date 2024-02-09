const express = require("express")
const router = express.Router();
const {Post} = require('../models/postModel');
const { authMiddleware } = require("../middlewares/authMiddleware");

//create a post
router.post('/',async(req,res) => {
    
})


module.exports = router;