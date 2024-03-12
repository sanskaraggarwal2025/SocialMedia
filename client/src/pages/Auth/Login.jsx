import React from "react";
// import "./Auth.css";
import "./Login.css";
// import Logo from "../../assets/sc.webp";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      let res = await axios.post("http://localhost:8000/user/login", {
        username: data.username,
        password: data.password,
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
    // <>
    //     <div className="Auth">
    //         <div className="a-left">
    //             <img src={Logo} alt="" />
    //             <div className="Webname">
    //                 <h1>Your Media</h1>
    //                 <h6>Explore the ideas throughout the world</h6>
    //             </div>
    //         </div>

    //         {/* right side */}
    //         <div className="a-right">
    //             <form className="infoForm authForm" onSubmit={handleSubmit(onSubmit)}>
    //                 <h3>Log In</h3>

    //                 <div>
    //                     <input
    //                         {...register("username")}
    //                         type="text"
    //                         className="infoInput"
    //                         placeholder="Usernames"
    //                     />
    //                 </div>

    //                 <div>
    //                     <input
    //                         {...register("password")}
    //                         type="text"
    //                         className="infoInput"
    //                         placeholder="Password"
    //                     />
    //                 </div>

    //                 <div>
    //                     <span
    //                         style={{ fontSize: "12px", cursor: "pointer" }}
    //                         onClick={() => navigate("/signup")}
    //                     >
    //                         "Don't have an account? SignUp"
    //                     </span>
    //                 </div>
    //                 <button className="button infoButton" type="submit">
    //                     Login
    //                 </button>
    //             </form>
    //         </div>
    //     </div>
    // </>
    <>
        <div className="card">
          <div className="card-title">
            <h1>SocialMedia</h1>
          </div>
          <div className="form-container">
            <form
              onSubmit={handleSubmit(onSubmit)}
            >
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

              <div className="bottom">
                <span
                  style={{ fontSize: "12px", cursor: "pointer" }}
                  onClick={() => navigate("/signup")}
                >
                  "Don't have an account? SignUp"
                </span>
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
    </>
  );
};

export default Login;
