import React, { lazy, Component, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'

import Home from './Home';
import Login from './Login';
import Product from './Product';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/add' component={Product}></Route>
            <Route path='/' component={Home}></Route>
          </Switch>
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
