import React, { lazy, Component, Suspense } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom'
import $ from 'jquery';

class Nav extends Component {
  onClick = () => {
    $('.offcanvas-collapse').toggleClass('open')
  }
  render() {
    const { isAuthenticated, logout } = this.props.auth
    return (
      <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
        <div className="container">
          <NavLink to="/" className="navbar-brand" activeClassName="active">React-GraphQL-Starter</NavLink>
          <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              {!isAuthenticated() &&
                <li key="login" className="nav-item">
                  <NavLink to="/login" className="nav-link" activeClassName="active" onClick={() => this.onClick()}>Login</NavLink>
                </li>
              }
              {isAuthenticated() &&
                <li key="add" className="nav-item">
                  <NavLink to="/add" className="nav-link" activeClassName="active" onClick={() => this.onClick()}>Add</NavLink>
                </li>}
              {isAuthenticated() &&
                <li key="delete" className="nav-item">
                  <NavLink to="/delete" className="nav-link" activeClassName="active" onClick={() => this.onClick()}>Delete</NavLink>
                </li>}
              {isAuthenticated() &&
                <li key="update" className="nav-item">
                  <NavLink to="/update" className="nav-link" activeClassName="active" onClick={() => this.onClick()}>Update</NavLink>
                </li>}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


export default Nav;
