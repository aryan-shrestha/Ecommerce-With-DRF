import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import routes from "./utils/routes/routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthRoute from "./utils/routes/AuthRoute";

import "./assets/css/style.css";
import GuestRoute from "./utils/routes/GuestRoute";

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            {routes.map((route, index) => {
              if (route.authenticatedTo === "auth") {
                return (
                  <AuthRoute
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    key={index}
                  />
                );
              }

              if (route.authenticatedTo === "guest") {
                return (
                  <GuestRoute
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    key={index}
                  />
                );
              }
              if (route.authenticatedTo === null) {
                return (
                  <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    key={index}
                  />
                );
              }
            })}
          </Switch>
        </AuthProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
