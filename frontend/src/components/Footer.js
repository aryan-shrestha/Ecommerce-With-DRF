import React from "react";
import { Link } from "react-router-dom";

import "../assets/css/footer.css";

function Footer() {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <Link to="#" className="footer-logo">
          <i
            className="fa-brands fa-internet-explorer"
            style={{
              fontSize: "25px",
            }}
          ></i>{" "}
          commerce
        </Link>

        <p className="footer-links">
          <Link to="#">Home</Link> · <Link to="#">Shop</Link> ·{" "}
          <Link to="#">About</Link> · <Link to="#">Contact</Link>
        </p>

        <p className="footer-company-name">
          <i className="fa-brands fa-internet-explorer"></i> commerce &copy;
          2022
        </p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>Satdobato</span> Lalitpur, Kathmandu
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+977 01 565656</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <Link to="mailto:support@company.com">ecommerce@email.com</Link>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
          porro laboriosam dignissimos doloremque deserunt tempore delectus
          veritatis in. Sit ab vel voluptas expedita voluptate nisi dolores
          commodi? Quidem, sint dolore?
        </p>

        <div className="footer-icons">
          <Link to="#">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="#">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="#">
            <i className="fab fa-linkedin-in"></i>
          </Link>
          <Link to="#">
            <i className="fab fa-github"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
