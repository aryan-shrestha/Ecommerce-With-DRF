import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function AuthRoute(props) {
  const { user } = useContext(AuthContext);

  if (user) return <Route {...props} />;

  return <Redirect to="/login" />;
}

export default AuthRoute;
