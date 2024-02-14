import React, { useEffect,useState } from 'react'
import './Posts.css'
import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
import axios from 'axios'
const Posts = () => {
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  let [pdata,setPdata] = useState([]);
  const getTimeline = async() => {
    try{
      let res = await axios.get(`http://localhost:8000/post/${userId}/timeline`,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      }) 
      setPdata(res.data);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    getTimeline();
  },[]);
  return (
    <div className="Posts">
        {pdata && pdata.map((post, id)=>{
            return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default Posts