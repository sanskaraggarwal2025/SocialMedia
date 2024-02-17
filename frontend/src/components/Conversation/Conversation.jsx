import axios from "axios";
import React, { useState, useEffect } from "react";

const Conversation = ({ data, currentUserId ,online}) => {
  const [userData, setUserData] = useState(null);
  let token = localStorage.getItem("token");
  const serverPublic = "http://localhost:8000/images/";

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    // console.log(userId);
    const getUserData = async () => {
      try {
        let res = await axios.get(`http://localhost:8000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res.data);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture
                ? serverPublic + userData.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
