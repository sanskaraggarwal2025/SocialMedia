import React, { useEffect,useState } from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import axios from "axios";
import { useRecoilState ,useRecoilValue} from "recoil";
import { postAtom, userAtom } from "../../store/atoms/authAtom";
import { Link } from "react-router-dom";
const ProfileCard = ({location}) => {
  // const[user,setUser] = useRecoilState(userAtom);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const posts = useRecoilValue(postAtom)
 
  // console.log(user);
  let user = useRecoilValue(userAtom);
  const serverPublic = 'http://localhost:8000/images/'
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={user.coverPicture? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"} alt="" />
        <img src={user.profilePciture? serverPublic + user.profilePciture : serverPublic + "defaultProfile.png"} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>Tumhara Bhai Hero Hai</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user && user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user && user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === 'profilePage'? "" : <span>
      <Link style = {{textDecoration:"none", color: "inherit"}} to = {`/profile/${user._id}`}>
        My Profile
      </Link>
      </span>}
    </div>
  );
};

export default ProfileCard;
