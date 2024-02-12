import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../store/atoms/authAtom";
const Login = () => {
    const navigate = useNavigate();
    let setUser = useSetRecoilState(userAtom);
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            let res = await axios.post("http://localhost:8000/user/login", {
                username: data.username,
                password: data.password,
            });
            localStorage.setItem("token", res.data.token);
            setUser(res.data.userId); 
            navigate("/");
            console.log("response from server", res.data);
        }
        catch (err) {
            console.log(err);
        }

    };
    return (
        <>
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
                        <h3>Log In</h3>

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
                            <span
                                style={{ fontSize: "12px", cursor: "pointer" }}
                                onClick={() => navigate("/signup")}
                            >
                                "Don't have an account? SignUp"
                            </span>
                        </div>
                        <button className="button infoButton" type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
