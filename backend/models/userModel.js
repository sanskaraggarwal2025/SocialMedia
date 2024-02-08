const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        // required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    followers:[],
    following:[],
},{
    timestamps:true,
})

const User = mongoose.model('User',userSchema);
module.exports = {
    User,
  };