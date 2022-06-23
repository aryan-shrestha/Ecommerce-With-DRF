import React, { useEffect, useState } from "react";

import Banner from "../components/Banner";
import CategoryGrid from "../components/CategoryGrid";
import Card from "../components/Card";
import axios from "../utils/axios/axios";

import "../assets/css/home.css";
import girl from "../assets/images/girl.svg";
import man2 from "../assets/images/man2.svg";
import { Link } from "react-router-dom";

function Home() {
  const [items, setItems] = useState([]);

  function fetchItems() {
    axios.get("/item/list").then((res) => {
      setItems(res.data.results.slice(0, 4));
    });
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="home">
      <Banner />
      <CategoryGrid />
      <div className=" mx-width m-auto m-10 our-top-collection-container ">
        <h2>
          Our Top{" "}
          <span style={{ fontSize: "28px", color: "#6c63ff" }}>Collection</span>
        </h2>
        <div className="item-card-container mx-width">
          {items.map((item) => {
            return (
              <Card
                src={item.image}
                name={item.name}
                price={item.price}
                id={item.id}
                key={item.id}
              />
            );
          })}
        </div>
      </div>

      <div className="mx-width m-auto m-10 gender-category">
        <div className="category hover-scaleup">
          <Link to="/shop">
            {" "}
            <h3>
              <span style={{ fontSize: "28px", color: "#6c63ff" }}>
                Women's
              </span>{" "}
              <br /> Trending 2022
            </h3>
          </Link>
          <img src={girl} alt="girl" />
        </div>
        <div className="category hover-scaleup">
          <img src={man2} alt="man" />
          <Link to="/shop">
            <h3>
              <span style={{ fontSize: "28px", color: "#6c63ff" }}>Men's</span>{" "}
              <br />
              Collection 2022
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
