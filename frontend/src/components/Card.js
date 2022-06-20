import React from "react";

import "../assets/css/card.css";
import useCart from "../utils/hooks/useCart";

function Card(props) {
  const { addItemToCart } = useCart();

  return (
    <div className="item-card hover-scaleup">
      <img src={props.src} alt={props.name} />
      <div className="detail">
        <p>{props.name}</p>
        <div className="price-btns">
          <p>Rs. {props.price}</p>
          <div className="card-btn">
            <i
              className="fa-solid fa-cart-plus"
              onClick={() => {
                addItemToCart(props.id);
              }}
            ></i>
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
