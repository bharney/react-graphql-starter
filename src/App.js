
import React, { lazy, Component, Suspense } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/offcanvas.scss'
import './styles/formInput.scss'
import './styles/App.scss'
import "./styles/toastr.scss"
import logo from './logo.svg';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import ReactDOM from "react-dom"
import PrivateRoute from "./components/Common/PrivateRoute"
import Nav from "./components/Common/Nav"
import Auth from './components/Auth/Auth';
import NavProvider from "./context/NavProvider"
import Loading from "./components/Common/Loading"
import NotificationProvider from './context/NotificationProvider';
const Home = lazy(() => import('./components/Home/Home'))
const Login = lazy(() => import('./components/Account/Login'));
const AddProduct = lazy(() => import('./components/Product/AddProduct'));
const DeleteProduct = lazy(() => import('./components/Product/DeleteProduct'));
const UpdateProductList = lazy(() => import('./components/Product/UpdateProductList'));
const UpdateProduct = lazy(() => import('./components/Product/UpdateProduct'));
const Register = lazy(() => import('./components/Account/Register'));
class App extends Component {
  auth = new Auth(this.props.history);
  render() {
    return (
      <>
        <NotificationProvider>
          <NavProvider>
            <Nav auth={this.auth} />
            <main className="container">
              <div className="row justify-content-center">
                <Suspense fallback={<Loading />}>
                  <Switch>
                    <Route path='/login'>
                      <Login {...this.props} />
                    </Route>
                    <Route path='/signup'>
                      <Register {...this.props} />
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
              </div >
            </main>
          </NavProvider>
        </NotificationProvider>
      </>
    );
  }
}

export default withRouter(App)
