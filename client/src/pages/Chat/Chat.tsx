import React, { useState, useEffect, useRef } from "react";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import "./Chat.css";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../store/atoms/authAtom";
import axios from "axios";
import Conversation from "../../components/Conversation/Conversation";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import Setting from "../../img/setting.png";
import { Link } from "react-router-dom";
import ChatBox from "../../components/ChatBox/ChatBox";
const Chat = () => {
  let user = useRecoilValue(userAtom);
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage,setRecieveMessage] = useState(null);
  const ws = useRef();
  
  useEffect(() => {
    console.log("chla kya ");
    ws.current = new WebSocket("ws://localhost:8001");

    ws.current.onopen = () => {
      console.log("connecting to ws server");
      ws.current.send(JSON.stringify({ type: "add-new-user", userId: userId }));
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleMessage(message);
      console.log(message);
      console.log(message.data);
      console.log(message.type);
      console.log(onlineUser);
      console.log("online aa sale");
    };

    ws.current.onclose = () => {
      console.log("disconnected from ws server");
    };

    return () => {
      ws.current.close();
    };
  }, [user]);

  // useEffect(() => {
  //   ws.current.on
  // })

  useEffect(() => {
    if(sendMessage !== null){
      console.log('mai nhi chla ');
      ws.current.send(JSON.stringify({
        type:'send-message',
        payload:{
          message:sendMessage
        }
      }))
    }
  },[sendMessage])

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

  const handleMessage = (message) => {
    switch (message.type) {
      case "get-user":
        setOnlineUser(message.data);
        break;
      case 'recieve-message':
        setRecieveMessage(message.data)
      default:
        break;
    }
  };

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userId)
    const online = onlineUser.find((user) => user.userId === chatMember)
    return online?true:false
  }

  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              //setCurrentChat -> jisse tumhe chat krni hai
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={userId} online = {checkOnlineStatus(chat)}/>
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
            {/* <UilSetting /> */}
            <img src={Setting} alt="" />
            <img src={Noti} alt="" />
            <Link to="/chat">
              <img src={Comment} alt="" />
            </Link>
          </div>

          {/* chat body */}
          <ChatBox
            chat={currentChat}
            currentUserId={userId}
            setSendMessage={setSendMessage}
            recieveMessage={recieveMessage} 
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
