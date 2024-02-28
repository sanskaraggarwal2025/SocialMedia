import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import axios from "axios";
import { useRecoilState,useRecoilValue } from "recoil";
import { userAtom } from "../../store/atoms/authAtom";
import {sharePostAtom} from '../../store/atoms/authAtom';

const PostShare = () => {
  const [image, setImage] = useState(null);
  const [isRender,setIsRender] = useRecoilState(sharePostAtom)
  const imageRef = useRef();
  const desc = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
 
  const userId = localStorage.getItem("userId");
  const user = useRecoilValue(userAtom);
  const serverPublic = "http://localhost:8000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: userId,
      desc: desc.current.value,
    };
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      console.log(newPost);
      let res = await axios.post("http://localhost:8000/upload", data);
      console.log(res.data);
    }
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      let res = await axios.post("http://localhost:8000/post/", newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsRender(!isRender);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    resetComponent();
  };

  const resetComponent = () => {
    setImage(null);
    desc.current.value = "";
  }

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePciture
            ? serverPublic + user.profilePciture
            : serverPublic + "defaultProfile.png"
        }
        alt=""
      />
      <div>
        <input ref={desc} required type="text" placeholder="What's happening" />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button className="button ps-button" onClick={(e) => handleSubmit(e)}>
            Share
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
