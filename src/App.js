import React, { lazy, Component, Suspense } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/offcanvas.css'
import './scripts/offcanvas'
import logo from './logo.svg';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'


import PrivateRoute from "./components/Common/PrivateRoute"
import Nav from "./components/Common/Nav"
import Auth from './components/Auth/Auth';
const Home = lazy(() => import('./components/Home/Home'))
const Login = lazy(() => import('./components/Account/Login'));
const AddProduct = lazy(() => import('./components/Product/AddProduct'));
const DeleteProduct = lazy(() => import('./components/Product/DeleteProduct'));
const UpdateProductList = lazy(() => import('./components/Product/UpdateProductList'));
const UpdateProduct = lazy(() => import('./components/Product/UpdateProduct'));

class App extends Component {
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
                    this.auth.isAuthenticated() ? (<AddProduct auth={this.auth} {...props} />) : (<Redirect to="/login" />)} />
                  <Route path="/delete" render={props =>
                    this.auth.isAuthenticated() ? (<DeleteProduct auth={this.auth} {...props} />) : (<Redirect to="/login" />)} />
                  <Route path="/update/:id" render={props =>
                    this.auth.isAuthenticated() ? (<UpdateProduct auth={this.auth} {...props} />) : (<Redirect to="/login" />)} />
                  <Route path="/update" render={props =>
                    this.auth.isAuthenticated() ? (<UpdateProductList auth={this.auth} {...props} />) : (<Redirect to="/login" />)} />
                  <Route path='/'>
                    <Home {...this.props} />
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

export default withRouter(App)
