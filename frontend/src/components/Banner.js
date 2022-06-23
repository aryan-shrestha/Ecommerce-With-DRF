import React from "react";
import { Link } from "react-router-dom";

import "../assets/css/banner.css";
import hero_svg from "../assets/images/hero_svg.svg";

function Banner() {
  return (
    <div className="banner m-auto mx-width">
      <div className="hero-text">
        <h1>
          Lets <span style={{ color: "#6C63FF" }}> Shop </span>
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dolores
          molestias, sint adipisci sequi veniam eligendi doloremque temporibus
          ea non magnam dicta at sunt deserunt autem odio doloribus quaerat
          dignissimos.
        </p>
        <div className="hero-btns">
          <Link to="/about" className="learn-more-btn btn">
            Learn More
          </Link>
          <Link to="/shop" className="shop-now-btn btn">
            Shop Now
          </Link>
        </div>
      </div>
      <img src={hero_svg} />
    </div>
  );
}

export default Banner;
