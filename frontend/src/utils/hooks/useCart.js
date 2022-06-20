import React from "react";

import axios from "../axios/axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Redirect } from "react-router-dom";

function useCart() {
  const { user, authToken } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [cartID, setCartId] = useState(null);

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

  function addItemToCart(item_id) {
    axios
      .post("/cart/order_item/add/", {
        order: cartID,
        item: {
          id: item_id,
        },
        quantity: 1,
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateQuantity(item_id, quantity) {
    axios
      .put(`cart/order_item/${item_id}/`, {
        quantity: quantity,
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteItem(item_id, index) {
    axios
      .delete(`cart/order_item/${item_id}/`)
      .then((res) => {
        console.log("deleted");
        console.log(index);
        setItems(items.splice(index, 1));
        console.log(items);
      })
      .catch((err) => {
        console.log("error wihe updateing >>", err);
      });
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    function refreshCart() {
      fetchCartItems();
    }
  });

  return {
    items: items,
    addItemToCart: addItemToCart,
    updateQuantity: updateQuantity,
    fetchCartItems: fetchCartItems,
    deleteItem: deleteItem,
  };
}

export default useCart;
