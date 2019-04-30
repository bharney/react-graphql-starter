import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field } from 'formik';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom"
class Auth0Login extends Component {

  render() {
    const { isAuthenticated, login } = this.props.auth
    return (
      <div>
        {isAuthenticated() ? <Link to="/profile">View profile</Link>
          : <button onClick={login}>Log In</button>}
      </div>
    );
  }
}

export default Auth0Login;
