import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field } from 'formik';
import { NotificationContext } from '../../context/NotificationProvider';
import { alertTypes } from '../../context/NotificationProvider';
class Login extends Component {

  render() {
    const POST_MUTATION = gql`
      mutation PostMutation($email: String!, $password: String!) {
      login(input: {
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
      <NotificationContext.Consumer>
        {({ openAlert }) => (
          <Mutation mutation={POST_MUTATION}>
            {(login) => (
              <div className="container pt-4">
                <div className="row justify-content-center pt-4">
                  <div className="col-12 col-sm-8 col-md-6 col-lg-5">
                    <h2 className="text-center display-4">Sign-In.</h2>
                    <Formik
                      initialValues={{ email: '', password: '' }}
                      onSubmit={async ({ email, password }, { resetForm }) => {
                        try {
                          const { data: { login: { token } } } = await login({ variables: { email, password } })
                          localStorage.setItem("react-graphql-starter", token)
                          openAlert("logged in successfully!", alertTypes.success);
                          resetForm()
                          this.props.history.push("/")
                        } catch (error) {
                          resetForm()
                          openAlert("Incorrect login or password", alertTypes.danger);
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
                              <Field name="email" id="loginEmail" placeholder="Email" required value={values.email} className="form-control" type="email" />
                              <label htmlFor="loginEmail">Email</label>
                            </div>
                            <div className="form-label-group">
                              <Field name="password" id="loginPassword" placeholder="Password" required value={values.password} className="form-control" type="password" />
                              <label htmlFor="loginPassword">Password</label>
                            </div>
                            <div className="form-group">
                              <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!dirty || isSubmitting}>Sign-In</button>
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
        )}
      </NotificationContext.Consumer>
    );
  }
}

export default Login;
