import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./utils/authentification";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { auth } from "./services/firebase";

function App() {
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

export default App;
