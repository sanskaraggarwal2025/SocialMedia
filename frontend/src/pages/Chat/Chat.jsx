import React, { useState, useEffect } from "react";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import "./Chat.css";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../store/atoms/authAtom";
import axios from "axios";
import Conversation from "../../components/Conversation/Conversation";
import { UilSetting } from "@iconscout/react-unicons";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { Link } from "react-router-dom";
import ChatBox from "../../components/ChatBox/ChatBox";
const Chat = () => {
  let user = useRecoilValue(userAtom);
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  useEffect(() => {
    const getChats = async () => {
      try {
        let res = await axios.get(`http://localhost:8000/chat/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChats();
  }, [user]);
  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={userId} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Right-side-chat">
        <div style={{ width: "70rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to="/">
              <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="/chat">
              <img src={Comment} alt="" />
            </Link>
          </div>

          {/* chat body */}
          <ChatBox chat={currentChat} currentUserId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
