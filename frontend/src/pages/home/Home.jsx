import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../store/atoms/authAtom'

const Home = () => {
  let user = useRecoilValue(userAtom);
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