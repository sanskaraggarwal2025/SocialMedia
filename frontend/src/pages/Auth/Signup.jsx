import React, { useState } from "react";
// import "./Auth.css";
import './Signup.css'
// import Logo from "../../img/logo.png";
import Logo from "../../assets/sc.webp";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      let res = await axios.post("http://localhost:8000/user/signup", {
        username: data.username,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      navigate("/");
      console.log("response from server", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <div className="Auth">
    //   <div className="a-left">
    //     <img src={Logo} alt="" />
    //     <div className="Webname">
    //       <h1>PSA Media</h1>
    //       <h6>Explore the ideas throughout the world</h6>
    //     </div>
    //   </div>

    //   {/* right side */}
    //   <div className="a-right">
    //     <form className="infoForm authForm" onSubmit={handleSubmit(onSubmit)}>
    //       <h3>SignUp </h3>

    //       <div>
    //         <input
    //           {...register("firstname")}
    //           type="text"
    //           placeholder="First Name"
    //           className="infoInput"
    //         />
    //         <input
    //           {...register("lastname")}
    //           type="text"
    //           placeholder="Last Name"
    //           className="infoInput"
    //         />
    //       </div>

    //       <div>
    //         <input
    //           {...register("username")}
    //           type="text"
    //           className="infoInput"
    //           placeholder="Usernames"
    //         />
    //       </div>

    //       <div>
    //         <input
    //           {...register("password")}
    //           type="text"
    //           className="infoInput"
    //           placeholder="Password"
    //         />

    //       </div>

    //       <div>
    //         <span style={{ fontSize: "12px", cursor:"pointer"}} onClick={() => navigate('/login')} >
    //           Already have an account. Login!
    //         </span>
    //       </div>
    //       <button className="button infoButton" type="submit">
    //         Signup
    //       </button>
    //     </form>
    //   </div>
    // </div>

    <>
      <div className="sign-card">
        <div className="card-title">
          <h1>SocialMedia</h1>
          <img src={Logo} alt="" srcset="" />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field1">
              <input
                {...register("username")}
                type="text"
                className=""
                placeholder="Username"
              />
            </div>
            <div className="field2">
              <input
                {...register("password")}
                type="text"
                className=""
                placeholder="Password"
              />
            </div>
            <div className="field3">
              <input
                {...register("firstname")}
                type="text"
                className=""
                placeholder="Firstname"
              />
            </div>
            <div className="field4">
              <input
                {...register("lastname")}
                type="text"
                className=""
                placeholder="Lastname"
              />
            </div>

            <div className="bottom">
              <span
                style={{ fontSize: "12px", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                "Already have an account? Login"
              </span>
            </div>
            <button className="login-btn" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
