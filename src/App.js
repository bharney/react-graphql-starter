import React, { lazy, Component, Suspense } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/offcanvas.css'
import './scripts/offcanvas'
import logo from './logo.svg';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import PrivateRoute from "./Common/PrivateRoute"
import Nav from "./Common/Nav"
import Auth0 from './Auth/Auth0';
import Auth from './Auth/Auth';
import $ from 'jquery';
const Home = lazy(() => import('./Home/Home'))
const Login = lazy(() => import('./Account/Login'));
const AddProduct = lazy(() => import('./Product/AddProduct'));
const DeleteProduct = lazy(() => import('./Product/DeleteProduct'));
const UpdateProductList = lazy(() => import('./Product/UpdateProductList'));
const UpdateProduct = lazy(() => import('./Product/UpdateProduct'));

class App extends Component {
  auth0 = new Auth0(this.props.history);
  auth = new Auth(this.props.history);

  render() {
    return (
      <>
        <Nav auth={this.auth} />
        <div className="container">
          <div className="row">
            <div className="col">
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path='/login'>
                    <Login {...this.props} />
                  </Route>
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
            </div>
          </div >
        </div>
      </>
    );
  }
}


export default withRouter(App);
