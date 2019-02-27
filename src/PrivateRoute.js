import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import fakeAuth from "./Authenticate";

class PrivateRoute extends Component {
  render() {
    return ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          fakeAuth.isAuthenticated ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
        }
      />
    );
  }
}

export default PrivateRoute;
