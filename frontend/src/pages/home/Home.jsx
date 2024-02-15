import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
import { useRecoilValue } from 'recoil'
import { followAtom } from '../../store/atoms/authAtom'

const Home = () => {
  let user  = localStorage.getItem('userId')
  // let status = useRecoilValue(followAtom);
  // console.log(status);
  console.log(user);
  return (
    <div className="Home">
      
        <ProfileSide/>
        <PostSide/>
        <RightSide/>
    </div>
  )
}

export default Home