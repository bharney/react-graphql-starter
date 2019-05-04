import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field } from 'formik';
import { Redirect } from 'react-router-dom';
import moment from "moment"
class Login extends Component {

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

    return (
      <Mutation mutation={POST_MUTATION}>
        {(login) => (
          <div>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={async ({ email, password }, { resetForm }) => {
                const { data: { login: { apiKey } } } = await login({ variables: { email, password } })
                localStorage.setItem("apiKey", apiKey)
                const expiresAt = JSON.stringify(moment().add(30).unix() * 1000 + new Date().getTime())
                localStorage.setItem("expires_at", expiresAt)
                this.setState({ authenticated: true })
                resetForm()
                this.props.history.push("/")
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
