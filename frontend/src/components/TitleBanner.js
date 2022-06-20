import React from "react";
import { Link } from "react-router-dom";

import banner_background from "../assets/images/banner_background.png";
import "../assets/css/title_banner.css";

function TitleBanner(props) {
  return (
    <div
      className="title-banner"
      style={{ background: `url(${banner_background})` }}
    >
      <h1>{props.currentPage}</h1>
      <div className="breadcrums">
        <Link to="/">Home</Link>
        <span> {">"} </span>
        <Link to={props.url} style={{ fontWeight: "800" }}>
          {props.currentPage}
        </Link>
      </div>
    </div>
  );
}

export default TitleBanner;
