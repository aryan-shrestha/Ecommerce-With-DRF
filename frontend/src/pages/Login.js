import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "../assets/css/login.css";

import login from "../assets/images/login.svg";
import TitleBanner from "../components/TitleBanner";
import AuthContext from "../context/AuthContext";

function Login() {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="login-page">
      <TitleBanner url="/login" currentPage={"Login"} />
      <div className="form-wrapper m-10 mx-width m-auto">
        <div className="svg-container">
          <img src={login} alt="" />
        </div>
        <div className="form-container">
          <h1>Welcome Back :)</h1>
          <p>
            To keep connected with us please login with your personal
            information by email address and password
          </p>
          <form autoComplete="off" autoSave="off" onSubmit={loginUser}>
            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="input-container">
              <i className="fas fa-key"></i>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
          <p>Don't have an account? <Link to="/register">Click</Link> here to create</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
