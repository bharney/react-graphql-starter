import React, { lazy, Component, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom'

import PrivateRoute from "./PrivateRoute"
import Nav from "./Nav"
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
  auth = new Auth(this.props.history);
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Nav auth={this.auth} />
          <img src={logo} className="App-logo" alt="logo" />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path='/login'>
                <Auth0Login auth={this.auth} />
              </Route>
              <Route path="/callback" render={props =>
                <Callback auth={this.auth} {...props} />}
              />
              <Route path='/add'>
                <AddProduct />
              </Route>
              <Route path='/delete'>
                <DeleteProduct />
              </Route>
              <Route path='/update/:id'>
                <UpdateProduct />
              </Route>
              <Route path='/update'>
                <UpdateProductList />
              </Route>
              <PrivateRoute path="/profile" auth={this.auth} component={Profile} />
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
