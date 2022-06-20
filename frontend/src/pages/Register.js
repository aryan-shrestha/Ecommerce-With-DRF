import React from "react";
import { Link } from "react-router-dom";

import TitleBanner from "../components/TitleBanner";
import axios from "../utils/axios/axios";

import register from "../assets/images/register.svg";

function Register() {
  function registerUser(e) {
    e.preventDefault();

    let firstName = e.target.firstName.value;
    let lastName = e.target.lastName.value;
    let email = e.target.email.value;
    let username = e.target.username.value;
    let password = e.target.password.value;
    let userAddress = [];

    axios
      .post("user/list/", {
        username: username,
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        user_address: userAddress,
      })
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div className="loginPage">
      <TitleBanner url="/login" currentPage={"Register"} />
      <div className="form-wrapper m-10 mx-width m-auto">
        <div
          className="svg-container"
          style={{ display: "flex", alignItem: "center" }}
        >
          <img src={register} alt="" />
        </div>
        <div className="form-container">
          <h1>Welcome Back :)</h1>
          <p>
            To keep connected with us please login with your personal
            information by email address and password
          </p>
          <form autoComplete="off" autoSave="off" onSubmit={registerUser}>
            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
            </div>

            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
            </div>

            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>

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
              Register
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Click</Link> here to
            create
          </p>
        </div>
      </div>
    </div>
  );
}
export default Register;
