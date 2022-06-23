import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "../utils/axios/axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);

  let history = useHistory();

  let loginUser = (username, password) => {
    axios
      .post("api/token/", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          setAuthToken(response.data);
          setUser(jwt_decode(response.data.access));
          localStorage.setItem("authTokens", JSON.stringify(response.data));
          history.push("/");
        }
      })
      .catch((err) => {
        alert("something went wrong");
      });
  };

  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/login");
  };

  let updateToken = () => {
    axios
      .post("api/token/refresh/", {
        refresh: authToken?.refresh,
      })
      .then((response) => {
        if (response.status === 200) {
          setAuthToken(response.data);
          setUser(jwt_decode(response.data.access));
          localStorage.setItem("authTokens", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
        logoutUser();
      });

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
      setLoading(false);
    }

    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, 240000);
    return () => clearInterval(interval);
  }, [authToken, loading]);

  let contextData = {
    user: user,
    authToken: authToken,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading..</p> : children}
    </AuthContext.Provider>
  );
};
