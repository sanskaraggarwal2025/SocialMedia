import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
const ChatBox = ({ chat, currentUserId, setSendMessage, recieveMessage }) => {
  let token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();


  //fetching data for header of chatbox
  const serverPublic = "http://localhost:8000/images/";
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
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
    if (chat !== null) getUserData();
  }, [chat, currentUserId]);
  let chatId = chat?._id;
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let res = await axios.get(`http://localhost:8000/message/${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res.data);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chatId) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chatId,
    };

    //send message to database
    try {
      let res = await axios.post(`http://localhost:8000/message`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }

    //send message to websocket server
    const recieverId = chat.members.find((id) => id !== currentUserId);
    console.log(recieverId);
    setSendMessage({ ...message, recieverId });
  };
  useEffect(() => {
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[messages])
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
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
                  </div>
                </div>
              </div>
              {/* <hr style={{ width: "85%", border: "0.1px solid #ececec" }} /> */}
            </div>

            {/* ChatBox Messages */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div ref={scroll}
                    className={
                      message.senderId === currentUserId
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>

            {/* chat sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start the conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
