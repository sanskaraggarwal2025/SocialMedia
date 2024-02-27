import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { Followers } from "../../Data/FollowersData";
import User from "../User/User";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../store/atoms/authAtom";
const FollowersCard = () => {
  const [people, setPeople] = useState([]);
  const user = useRecoilValue(userAtom)
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get("http://localhost:8000/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPeople(res.data);
    };
    fetchData();
  }, []);
  return (
    <div className="FollowersCard" >
      <h3>People you may know</h3>

      {people.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
