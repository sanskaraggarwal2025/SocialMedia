import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { useNavigate,useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { infoCardAtom, userAtom } from "../../store/atoms/authAtom";

const InfoCard = () => {
  const navigate = useNavigate();
  const params = useParams();
  const profileUserId = params.id;
  const user = useRecoilValue(userAtom);
  const [profileUser,setProfileUser] = useState({});
  // const [profileUser,setProfileUser] = useRecoilState(infoCardAtom);
  useEffect(() => {
    const fetchProfileUser = async() => {
      if(profileUserId === user._id){
        setProfileUser(user) 
      }
      else{
        //atleast do something
        let res = await axios.get(`http://localhost:8000/user/${profileUserId}`,{
          headers:{
            Authorization:'Bearer ' + localStorage.getItem('token')
          }
        })
        console.log(res.data);
        setProfileUser(res.data);
      }
    }
    fetchProfileUser();
  },[user])
  const [modalOpened, setModalOpened] = useState(false);
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token")
    navigate('/login')
  }
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ?<div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data={user}
          />
        </div>:" "}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={logout}>Logout</button>
    </div>
  );
};

export default InfoCard;
