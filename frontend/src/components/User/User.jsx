import axios from "axios";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { followAtom } from "../../store/atoms/authAtom";

const User = ({ person }) => {
  const serverPublic = "http://localhost:8000/images/";
  let followUserId = person._id;
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  const [following, setFollowing] = useState(person.following.includes(userId));
  //   const setFollowingStatus = useSetRecoilState(followAtom);
  const handleFollow = async () => {
    try {
      let res = await axios.put(
        `http://localhost:8000/user/${followUserId}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowing((prev) => !prev);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnfollow = async() => {
    let ufReq = await axios.put(
        `http://localhost:8000/user/${followUserId}/unfollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowing((pre) => !pre)
      console.log(ufReq.data);
  }
  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePciture
              ? serverPublic + person.profilePciture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>{person.username}</span>
        </div>
      </div>
      {following ? (
        <button className="button fc-button" onClick={handleUnfollow}>
          {/* {following? "Unfollow":"Follow"} */} Unfollow
        </button>
      ) : (
        <button className="button fc-button" onClick={handleFollow}>
          {/* {following? "Unfollow":"Follow"} */} follow
        </button>
      )}
    </div>
  );
};

export default User;
