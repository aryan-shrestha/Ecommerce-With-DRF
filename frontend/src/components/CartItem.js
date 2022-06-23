import React, { useEffect, useState } from "react";

import useCart from "../utils/hooks/useCart";

import "../assets/css/cart_item.css";

function CartItem(props) {
  const [quantity, setQuantity] = useState(props.quantity);
  const [itemId, setItemId] = useState(props.id);
  const { updateQuantity } = useCart();

  function handleAdd() {
    setQuantity(quantity + 1);
  }

  function handleMinus() {
    if (quantity === 1) return;

    setQuantity(quantity - 1);
  }

  useEffect(() => {
    updateQuantity(itemId, quantity);
    props.fetchCartItems();
  }, [quantity]);

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
        {quantity}
        <i
          className="fas fa-plus quanity-btn"
          style={{ marginLeft: "20px" }}
          onClick={handleAdd}
        ></i>
      </td>

      <td>
        <p>{quantity * props.price}</p>
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
