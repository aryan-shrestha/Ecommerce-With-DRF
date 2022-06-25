import axios from "../axios/axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

function useCart() {
  const { user, authToken } = useContext(AuthContext);
  const [cartID, setCartId] = useState(null);

  axios.defaults.headers.common["Authorization"] = "Bearer " + authToken.access;

  function getCartId() {
    axios
      .get(`/cart/${user.user_id}`)
      .then((res) => {
        setCartId(res.data.id);
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

  useEffect(() => {
    getCartId();
  }, []);

  return {
    addItemToCart: addItemToCart,
  };
}

export default useCart;
