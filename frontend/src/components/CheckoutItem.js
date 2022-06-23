import React from "react";

import "../assets/css/cart_item.css";

function CheckoutItem(props) {
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
      <td>{props.quantity}</td>
      <td>
        <p>{props.price * props.quantity}</p>
      </td>
    </tr>
  );
}

export default CheckoutItem;
