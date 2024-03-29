import React, { useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import axios from 'axios'
import {useRecoilValue} from 'recoil';
import {userAtom} from '../../store/atoms/authAtom'
const Post = ({data}) => {
  const userId = localStorage.getItem("userId");
  const [liked,setLiked] = useState(data.likes.includes(userId));
  const [likes,setLikes] = useState(data.likes.length);
  const psid = data._id;
  let token = localStorage.getItem("token");
  let user = useRecoilValue(userAtom)


  const handleLike = async() => {
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
    setLiked((prev) => !prev)
    liked? setLikes((prev) => prev-1) : setLikes((prev)=>prev+1);
  }
  return (
    <div className="Post">
    {/* {console.log(data.image)} */}
    {/* {console.log(process.env.REACT_APP_PUBLIC_FOLDER)} */}
        <img src={data.image? 'http://localhost:8000/images/' + data.image: ""} alt="" />


        <div className="postReact">
            <img src={liked?Heart: NotLike} alt="" style = {{cursor:"pointer", color:"white",width:'25px',height:'25px'}} onClick={handleLike} />
            <img src={Comment} alt="" style={{width:'25px',height:'25px' }}/>
            <img src={Share} alt="" style={{width:'25px',height:'25px' }}/>
        </div>


        <span style={{color: "white", fontSize: '12px'}}>{likes} likes</span>

        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post