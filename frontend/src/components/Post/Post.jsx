import React, { useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import axios from 'axios'

const Post = ({data}) => {
  const userId = localStorage.getItem("userId");
  const [liked,setLiked] = useState(data.likes.includes(userId));
  const [likes,setLikes] = useState(data.likes.length);
  // console.log(data._id);
  const psid = data._id;
  console.log(psid);
  let token = localStorage.getItem("token");


  const handleLike = async() => {
    setLiked((prev) => !prev)
    try{

      await axios.put(`http://localhost:8000/post/${psid}/like`,{},{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
    }
    catch(err) {
      console.log(err);
    }
    liked? setLikes((prev) => prev-1) : setLikes((prev)=>prev+1);
  }
  return (
    <div className="Post">
        <img src={data.img? process.env.REACT_APP_PUBLIC_FOLDER + data.image: ""} alt="" />


        <div className="postReact">
            <img src={liked?Heart: NotLike} alt="" style = {{cursor:"pointer"}} onClick={handleLike}/>
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>

        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post