import React, { lazy, Component, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, NavLink } from 'react-router-dom'

const Home = lazy(() => import('./Home'))
const Login = lazy(() => import('./Login'));
const AddProduct = lazy(() => import('./Product/AddProduct'));
const DeleteProduct = lazy(() => import('./Product/DeleteProduct'));
const UpdateProductList = lazy(() => import('./Product/UpdateProductList'));
const UpdateProduct = lazy(() => import('./Product/UpdateProduct'));

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/add">Add</NavLink>
          <NavLink to="/delete">Delete</NavLink>
          <NavLink to="/update">Update</NavLink>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path='/login'>
                <Login />
              </Route>
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
      </div>
    );
  }
}

export default App;
