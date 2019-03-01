import React, { lazy, Component, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';

import PrivateRoute from "./PrivateRoute"
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
      <nav>
        <ul className="nav">
          <li key="home">
            <NavLink to="/">Home</NavLink>
          </li>
          <li key="login">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li key="add">
            <NavLink to="/add">Add</NavLink>
          </li>
          <li key="delete">
            <NavLink to="/delete">Delete</NavLink>
          </li>
          <li key="update">
            <NavLink to="/update">Update</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}


export default App;
