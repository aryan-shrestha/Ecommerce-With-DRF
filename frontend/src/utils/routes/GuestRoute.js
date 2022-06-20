import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function GuestRoute(props) {
  const { user } = useContext(AuthContext);

  if (!user) return <Route {...props} />;

  return <Redirect to="/" />;
}

export default GuestRoute;
