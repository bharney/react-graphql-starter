import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
  render() {
    const { isAuthenticated } = this.props.auth

    return ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
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