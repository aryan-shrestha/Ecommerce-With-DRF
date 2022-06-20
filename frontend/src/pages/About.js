import React from "react";
import TitleBanner from "../components/TitleBanner";

function About() {
  return (
    <div className="about-page">
      <TitleBanner url={"/about"} currentPage={"About"} />
    </div>
  );
}

export default About;
