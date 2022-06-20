import React from "react";

import "../assets/css/category_grid.css";

import women from "../assets/images/women.svg";
import bag from "../assets/images/bag.svg";
import phone from "../assets/images/phone.svg";
import man from "../assets/images/man.svg";

function CategoryGrid() {
  return (
    <div className="parent mx-width m-auto m-10">
      <div className="div1 hover-scaleup">
        <img src={women} alt="women" />
        <h3>
          Hot <br />
          <span className="span-font">Women's</span>
        </h3>
      </div>

      <div className="div2 hover-scaleup">
        <h3>
          Collection <br />
          <span className="span-font">Bags</span>
        </h3>
        <img src={bag} alt="bag" />
      </div>

      <div className="div3 hover-scaleup">
        <img src={phone} alt="phone" height="180px" />
        <h3>
          Cheap <br />
          <span className="span-font">Electronics</span>
        </h3>
      </div>

      <div className="div4 hover-scaleup">
        <h3>
          Trending <br />
          <span className="span-font">Men's</span>
        </h3>
        <img src={man} alt="women" />
      </div>
    </div>
  );
}

export default CategoryGrid;
