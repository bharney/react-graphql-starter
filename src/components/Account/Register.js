import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field } from 'formik';
import { Redirect } from 'react-router-dom';
import moment from "moment"
import jwt from "jsonwebtoken"
class Login extends Component {

  render() {
    const POST_MUTATION = gql`
      mutation PostMutation($email: String!, $password: String!) {
      signup(input: {
        email: $email,
        password: $password
        }) {
          user {
            _id
            email
            apiKey
            role
          }
          token
        }
    }`

    return (
      <Mutation mutation={POST_MUTATION}>
        {(signup) => (
          <div className="container pt-4">
            <div className="row justify-content-center pt-4">
              <div className="col-12 col-sm-8 col-md-6 col-lg-5">
                <h2 className="text-center display-4">Register.</h2>
                <Formik
                  initialValues={{ email: '', password: '', confirmPassword: '' }}
                  onSubmit={async ({ email, password, confirmPassword }, { resetForm }) => {
                    debugger;
                    if (password == confirmPassword) {
                      const { data: { signup: { token } } } = await signup({ variables: { email, password } })
                      localStorage.setItem("react-graphql-starter", token)
                      resetForm()
                      this.props.history.push("/")
                    }
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
                        <div className="form-label-group">
                          <Field name="email" id="registerEmail" value={values.email} placeholder="Email" required autoFocus className="form-control" type="email" />
                          <label htmlFor="registerEmail">Email</label>
                        </div>
                        <div className="form-label-group">
                          <Field name="password" id="registerPassword" value={values.password} placeholder="Password" required className="form-control" type="password" />
                          <label htmlFor="registerPassword">Password</label>
                        </div>
                        <div className="form-label-group">
                          <Field name="confirmPassword" id="confirmPassword" value={values.confirmPassword} placeholder="Confirm Password" required className="form-control" type="password" />
                          <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                        <div className="form-group">
                          <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!dirty || isSubmitting}>Register</button>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;
