import './Signup.css'

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
    <>
      <div className="sign-card">
        <div className="card-title">
          <h1>SocialMedia</h1>
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
