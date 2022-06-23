import React from "react";

import "../assets/css/category_grid.css";

import women from "../assets/images/women.svg";
import bag from "../assets/images/bag.svg";
import phone from "../assets/images/phone.svg";
import man from "../assets/images/man.svg";
import { Link } from "react-router-dom";

function CategoryGrid() {
  return (
    <div className="parent mx-width m-auto m-10">
      <Link to="/shop" className="div1 hover-scaleup">
        <div className="div1 hover-scaleup">
          <img src={women} alt="women" />
          <h3>
            Hot <br />
            <span className="span-font">Women's</span>
          </h3>
        </div>
      </Link>

      <Link to="/shop" className="div2 hover-scaleup">
        <div className="div2 hover-scaleup">
          <h3>
            Collection <br />
            <span className="span-font">Bags</span>
          </h3>
          <img src={bag} alt="bag" />
        </div>
      </Link>

      <Link to="/shop" className="div3 hover-scaleup">
        <div className="div3 hover-scaleup">
          <img src={phone} alt="phone" height="180px" />
          <h3>
            Cheap <br />
            <span className="span-font">Electronics</span>
          </h3>
        </div>
      </Link>

      <Link to="/shop" className="div4 hover-scaleup">
        <div className="div4 hover-scaleup">
          <h3>
            Trending <br />
            <span className="span-font">Men's</span>
          </h3>
          <img src={man} alt="women" />
        </div>
      </Link>
    </div>
  );
}

export default CategoryGrid;
