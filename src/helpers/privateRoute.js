import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ isAuthentificated, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthentificated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
