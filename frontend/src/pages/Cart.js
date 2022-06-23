import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";

import axios from "../utils/axios/axios";
import AuthContext from "../context/AuthContext";

import TitleBanner from "../components/TitleBanner";
import CartItem from "../components/CartItem";

import "../assets/css/cart.css";

function Cart() {
  const { user, authToken } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  axios.defaults.headers.common["Authorization"] = "Bearer " + authToken.access;

  function fetchCartItems() {
    axios
      .get(`/cart/${user.user_id}`)
      .then((res) => {
        setItems(res.data.order_items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteItem(item_id, index) {
    axios
      .delete(`cart/order_item/${item_id}/`)
      .then((res) => {
        setItems(
          items.filter((ele) => {
            return ele.id !== item_id;
          })
        );
      })
      .catch((err) => {
        console.log("error while updating >>", err);
      });
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="cart-page ">
      <TitleBanner url={"/cart"} currentPage={"Cart"} />
      <div className="cart mx-width m-auto">
        <table>
          <tbody>
            <tr className="heading">
              <th>Product</th>
              <th>Price</th>
              <th>Quanity</th>
              <th>Subtotal</th>
              <th>{"  "}</th>
            </tr>

            {items.map((item, index) => {
              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.item.name}
                  price={item.item.price}
                  quantity={item.quantity}
                  image={item.item.image}
                  index={index}
                  deleteFunc={deleteItem}
                />
              );
            })}
          </tbody>
        </table>
        {items.length < 1 ? (
          <div
            className="no-items"
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "15px",
              marginBottom: "15px",
              fontSize: "18px",
            }}
          >
            No Items in your cart.
          </div>
        ) : (
          ""
        )}

        {items.length < 1 ? (
          <Link
            to="/checkout"
            className="checkout-btn cart-btn btn disable-link"
          >
            Checkout
          </Link>
        ) : (
          <Link to="/checkout" className="checkout-btn cart-btn btn">
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
}

export default Cart;
