import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.email);
    event.preventDefault();
  }


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
    const { email, password } = this.state;
    return (
      <Mutation mutation={POST_MUTATION} variables={{ email, password }} onCompleted={() => this.props.history.push('/')} >
        {() => (
          <form onSubmit={this.handleSubmit}>
            <label>
              Email:
          <input type="text" value={email} type="email" onChange={this.handleChangeEmail} />
            </label>
            <label>
              Password:
          <input type="text" value={password} type="password" onChange={this.handleChangePassword} />
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </Mutation>

    );
  }
}

export default Login;
