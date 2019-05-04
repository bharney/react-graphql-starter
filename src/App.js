import React, { lazy, Component, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import PrivateRoute from "./PrivateRoute"
import Nav from "./Nav"
import Auth0 from './Auth/Auth0';
import Auth from './Auth/Auth';
const Callback = lazy(() => import('./Callback'))
const Home = lazy(() => import('./Home'))
const Login = lazy(() => import('./Login'));
const AddProduct = lazy(() => import('./Product/AddProduct'));
const DeleteProduct = lazy(() => import('./Product/DeleteProduct'));
const UpdateProductList = lazy(() => import('./Product/UpdateProductList'));
const UpdateProduct = lazy(() => import('./Product/UpdateProduct'));
const Auth0Login = lazy(() => import('./Auth0Login'));
const Profile = lazy(() => import('./Profile'));

class App extends Component {
  auth0 = new Auth0(this.props.history);
  auth = new Auth(this.props.history);
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Nav auth={this.auth} />
          <img src={logo} className="App-logo" alt="logo" />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path='/loginAuth0'>
                <Auth0Login auth={this.auth0} />
              </Route>
              <Route path='/login'>
                <Login {...this.props} />
              </Route>
              <Route path="/callback" render={props =>
                <Callback auth={this.auth0} {...props} />}
              />
              <Route path="/profile" render={props =>
                this.auth0.isAuthenticated() ? (<Profile auth={this.auth0} {...props} />) : (<Redirect to="/login" />)} />
              <Route path="/add" render={props =>
                this.auth.isAuthenticated() ? (<AddProduct auth={this.auth0} {...props} />) : (<Redirect to="/login" />)} />
              <Route path="/delete" render={props =>
                this.auth.isAuthenticated() ? (<DeleteProduct auth={this.auth0} {...props} />) : (<Redirect to="/login" />)} />
              <Route path="/update/:id" render={props =>
                this.auth.isAuthenticated() ? (<UpdateProduct auth={this.auth0} {...props} />) : (<Redirect to="/login" />)} />
              <Route path="/update" render={props =>
                this.auth.isAuthenticated() ? (<UpdateProductList auth={this.auth0} {...props} />) : (<Redirect to="/login" />)} />
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </Suspense>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div >
    );
  }
}


export default withRouter(App);
