import React, { useContext, useState, useEffect } from "react";

import AuthContext from "../context/AuthContext";
import axios from "../utils/axios/axios";

import TitleBanner from "../components/TitleBanner";
import CheckoutItem from "../components/CheckoutItem";
import Loading from "../components/Loading";

function Checkout() {
  const { user, authToken } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  axios.defaults.headers.common["Authorization"] = "Bearer " + authToken.access;

  function fetchCartItems() {
    axios
      .get(`/cart/${user.user_id}`)
      .then((res) => {
        setCart(res.data);
        setItems(res.data.order_items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function performCheckout() {
    setIsLoading(true);
    axios
      .put(`/cart/${cart.id}/`, {
        id: cart.id,
        complete: true,
      })
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    console.log(isLoading);
  }, [Loading]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="cart-page">
      <TitleBanner url={"/checkout"} currentPage={"Checkout"} />
      <div className="cart mx-width m-auto">
        <table>
          <tbody>
            <tr className="heading">
              <th>Product</th>
              <th>Price</th>
              <th>Quanity</th>
              <th>Subtotal</th>
            </tr>

            {items.map((item, index) => {
              return (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  name={item.item.name}
                  price={item.item.price}
                  quantity={item.quantity}
                  image={item.item.image}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
        <button
          className=" checkout-btn cart-btn btn "
          style={{ cursor: "pointer" }}
          onClick={performCheckout}
        >
          {isLoading ? <Loading /> : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
