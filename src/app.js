import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { PrivateRoute } from "./helpers/privateRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { auth } from "./services/firebase";
import styles from "./app.css"

export const App = () => {
  const [hasToken, setHasToken] = useState(false);
  const [isAuthentificated, setIsAuthentificated] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") ? setHasToken(true) : setHasToken(false);
  }, []);

  useEffect(() => {
    auth().onAuthStateChanged((user) =>
      user ? setIsAuthentificated(true) : setIsAuthentificated(false)
    );
  });

  return (
    <>
      <h2 className={styles.appTitle}>Chat App</h2>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <PrivateRoute exact path="/home" isAuthentificated={isAuthentificated}>
          <Home />
        </PrivateRoute>
      </Switch>

    </>
  );
}


