import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "../assets/css/navbar.css";
import AuthContext from "../context/AuthContext";

function Navbar() {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link to="#" className="nav-link">
          <i
            className="fa-brands fa-internet-explorer"
            style={{
              fontSize: "25px",
            }}
          ></i>{" "}
          commerce
        </Link>
        <ul className="nav-links">
          <li>
            <Link className="nav-link nav-link-padding" to="/">
              Home
            </Link>
            <Link className="nav-link nav-link-padding" to="/about">
              About
            </Link>
            <Link className="nav-link nav-link-padding" to="/shop">
              Shop
            </Link>
            <Link className="nav-link nav-link-padding" to="#">
              Contact
            </Link>
            {user && (
              <Link
                className="nav-link nav-link-padding"
                to="/login"
                onClick={logoutUser}
              >
                Logout
              </Link>
            )}
          </li>
        </ul>
        <div className="nav-links">
          {user ? (
            <Link className="nav-link nav-link-padding" to="#">
              {user.username}
            </Link>
          ) : (
            <Link className="nav-link nav-link-padding" to="/login">
              Login
            </Link>
          )}
          <Link className="nav-link nav-link-padding" to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          <Link className="nav-link nav-link-padding" to="/cart">
            <i className="fas fa-heart"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
