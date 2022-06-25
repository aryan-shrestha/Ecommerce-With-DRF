import React, { useEffect, useState, useContext } from "react";

import axios from "../utils/axios/axios";
import useCart from "../utils/hooks/useCart";
import AuthContext from "../context/AuthContext";

import "../assets/css/cart_item.css";

function CartItem(props) {
  function handleAdd() {
    props.updateQuantity(props.id, props.quantity + 1);
  }

  function handleMinus() {
    if (props.quantity == 1) return;
    props.updateQuantity(props.id, props.quantity - 1);
  }

  return (
    <tr>
      <td
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="cart-product">
          <img src={`http://127.0.0.1:8000${props.image}`} />
          <p>{props.name}</p>
        </div>
      </td>
      <td>{props.price}</td>
      <td>
        <i
          className="fas fa-minus quanity-btn"
          style={{ marginRight: "20px" }}
          onClick={handleMinus}
        ></i>
        {props.quantity}
        <i
          className="fas fa-plus quanity-btn"
          style={{ marginLeft: "20px" }}
          onClick={handleAdd}
        ></i>
      </td>

      <td>
        <p>{props.quantity * props.price}</p>
      </td>
      <td>
        <p>
          <i
            className="fas fa-trash-alt delete-btn"
            onClick={() => {
              props.deleteFunc(props.id, props.index);
            }}
          ></i>
        </p>
      </td>
    </tr>
  );
}

export default CartItem;
