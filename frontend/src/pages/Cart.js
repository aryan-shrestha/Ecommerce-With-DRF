import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "../utils/axios/axios";
import AuthContext from "../context/AuthContext";

import TitleBanner from "../components/TitleBanner";
import CartItem from "../components/CartItem";
import useCart from "../utils/hooks/useCart";

import "../assets/css/cart.css";
import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";

function Cart() {
  const { user, authToken } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [cartId, setCartId] = useState(null);

  axios.defaults.headers.common["Authorization"] = "Bearer " + authToken.access;

  function fetchCartItems() {
    axios
      .get(`/cart/${user.user_id}`)
      .then((res) => {
        setItems(res.data[0].order_items);
        setCartId(res.data[0].id);
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
        </table>

        {/* {items.map((item, index) => {
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
                    <img src={`http://127.0.0.1:8000${item.item.image}`} />
                    <p>{item.item.name}</p>
                  </div>
                </td>
                <td>{item.item.price}</td>
                <td>
                  <i
                    className="fas fa-minus quanity-btn"
                    style={{ marginRight: "20px" }}
                    // onClick={() => {
                    //   handleMinus(item.id);
                    // }}
                  ></i>
                  {item.quantity}
                  <i
                    className="fas fa-plus quanity-btn"
                    style={{ marginLeft: "20px" }}
                  ></i>
                </td>

                <td>
                  <p>Rs. 9999</p>
                </td>
                <td>
                  <p>
                    <i
                      className="fas fa-trash-alt delete-btn"
                      onClick={() => {
                        deleteItem(item.id, index);
                      }}
                    ></i>
                  </p>
                </td>
              </tr>
            );
          })}
        </table> */}

        <Link to="#" className=" update-btn cart-btn btn ">
          Update Cart
        </Link>

        <Link to="#" className=" checkout-btn cart-btn btn ">
          Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
