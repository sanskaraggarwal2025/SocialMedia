import React,{useEffect} from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../../store/atoms/authAtom'
import axios from 'axios'
const Home = () => {
  const setUser = useSetRecoilState(userAtom);
  let userId  = localStorage.getItem('userId')
  let token  = localStorage.getItem('token')
  useEffect(() => {
    const fetchUserData = async() => {
      let res = await axios.get(`http://localhost:8000/user/${userId}`,{
        headers:{
          'Authorization':`Bearer ${token}`
        },
      })
      setUser(res.data);
    }
    fetchUserData();
  },[])
  
  return (
    <div className="Home">
      
        <ProfileSide/>
        <PostSide/>
        <RightSide/>
    </div>
  )
}

export default Home