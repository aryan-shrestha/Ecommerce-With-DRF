import React from "react";

import Home from "../../pages/Home";
import About from "../../pages/About";
import Shop from "../../pages/Shop";
import Cart from "../../pages/Cart";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Checkout from "../../pages/Checkout";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Home />,
    authenticatedTo: "auth",
  },
  {
    path: "/about",
    component: () => <About />,
    authenticatedTo: "auth",
  },
  {
    path: "/shop",
    component: () => <Shop />,
    authenticatedTo: "auth",
  },
  {
    path: "/cart",
    component: () => <Cart />,
    authenticatedTo: "auth",
  },
  {
    path: "/login",
    component: () => <Login />,
    authenticatedTo: "guest",
  },
  {
    path: "/register",
    component: () => <Register />,
    authenticatedTo: "guest",
  },
  {
    path: "/checkout",
    component: () => <Checkout />,
    authenticatedTo: "auth",
  },
];

export default routes;
