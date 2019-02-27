import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field } from 'formik';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    redirectToReferrer: false
  };

  render() {
    const POST_MUTATION = gql`
      mutation PostMutation($email: String!, $password: String!) {
      login(input: {
        email: $email,
        password: $password
        }) {
          _id
          email
          apiKey
          role
        }
    }`
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <Mutation mutation={POST_MUTATION}>
        {(login) => (
          <div>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={({ email, password }, { resetForm }) => {
                login({ variables: { email, password } })
                this.setState({ loggedIn: true })
                resetForm()
              }}>
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>Email:</label>
                      <Field name="email" value={values.email} required type="text" />
                    </div>
                    <div>
                      <label>Password:</label>
                      <Field name="password" value={values.password} required type="password" />
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                );
              }}
            </Formik>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;
