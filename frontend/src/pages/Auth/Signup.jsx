import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async(data) => {
    // console.log(data);
    try{
      let res = await axios.post('http://localhost:8000/user/signup',{
        username:data.username,
        password:data.password,
        firstname:data.firstname,
        lastname:data.lastname,
        }
      )
      localStorage.setItem("token",res.data.token);
      navigate('/');
      console.log("response from server",res.data);
    }
    catch(err){
      console.log(err);
    }
    
  };

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>PSA Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit(onSubmit)}>
          <h3>SignUp </h3>

          <div>
            <input
              {...register("firstname")}
              type="text"
              placeholder="First Name"
              className="infoInput"
            />
            <input
              {...register("lastname")}
              type="text"
              placeholder="Last Name"
              className="infoInput"
            />
          </div>

          <div>
            <input
              {...register("username")}
              type="text"
              className="infoInput"
              placeholder="Usernames"
            />
          </div>

          <div>
            <input
              {...register("password")}
              type="text"
              className="infoInput"
              placeholder="Password"
            />
            
          </div>

          <div>
            <span style={{ fontSize: "12px", cursor:"pointer"}} onClick={() => navigate('/login')} >
              Already have an account. Login!
            </span>
          </div>
          <button className="button infoButton" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
