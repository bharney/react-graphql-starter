import React, { lazy, Component, Suspense } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom'
import ReactDOM from "react-dom"
import "../../styles/Nav.scss"
import { NavContext } from "../../context/NavProvider";
class Nav extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    let offCanvas = document.getElementsByClassName("offcanvas-collapse")[0].classList.contains('open')
    if (!offCanvas) {
      let navbar = ReactDOM.findDOMNode(
        document.getElementById("custom-nav")
      )
      let windowsScrollTop = window.pageYOffset;
      if (windowsScrollTop > 50) {
        navbar.classList.add("affix");
        navbar.classList.remove("top-nav-collapse");
      } else {
        navbar.classList.remove("affix");
        navbar.classList.remove("top-nav-collapse");
      }
    }
  }


  render() {
    const { isAuthenticated, logout } = this.props.auth
    return (<NavContext.Consumer>
      {({ onUpdate, toggle, handleOverlayToggle }) => {
        return (
          <nav id="custom-nav" className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
            <div className="container">
              <NavLink to="/" className="navbar-brand" onClick={onUpdate} activeClassName="active">React-GraphQL-Starter</NavLink>

              <div onClick={(e) => handleOverlayToggle(e)} className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                  {isAuthenticated() &&
                    <li key="add" className="nav-item">
                      <NavLink to="/add" className="nav-link" activeClassName="active" onClick={onUpdate}>Add</NavLink>
                    </li>}
                  {isAuthenticated() &&
                    <li key="delete" className="nav-item">
                      <NavLink to="/delete" className="nav-link" activeClassName="active" onClick={onUpdate}>Delete</NavLink>
                    </li>}
                  {isAuthenticated() &&
                    <li key="update" className="nav-item">
                      <NavLink to="/update" className="nav-link" activeClassName="active" onClick={onUpdate}>Update</NavLink>
                    </li>}
                  {!isAuthenticated() &&
                    <li key="login" className="nav-item d-md-none d-lg-none d-xl-none">
                      <NavLink to="/login" className="nav-link" activeClassName="active" onClick={onUpdate}>Login</NavLink>
                    </li>
                  }
                  {!isAuthenticated() &&
                    <li key="register" className="nav-item d-md-none d-lg-none d-xl-none">
                      <NavLink to="/signup" className="nav-link" activeClassName="active" onClick={onUpdate}>Register</NavLink>
                    </li>
                  }
                  {isAuthenticated() &&
                    <li key="logout" className="nav-item d-md-none d-lg-none d-xl-none">
                      <NavLink to="/login" className="nav-link" activeClassName="active" onClick={() => { onUpdate(); logout(); }}>Logout</NavLink>
                    </li>}
                </ul>
              </div>
              <div className="d-none d-md-block d-lg-block d-xl-block">
                <ul className="navbar-nav">
                  {!isAuthenticated() &&
                    <li key="login" className="nav-item">
                      <NavLink to="/login" className="nav-link" activeClassName="active" onClick={onUpdate}>Login</NavLink>
                    </li>
                  }
                  {!isAuthenticated() &&
                    <li key="register" className="nav-item">
                      <NavLink to="/signup" className="nav-link" activeClassName="active" onClick={onUpdate}>Register</NavLink>
                    </li>
                  }
                  {isAuthenticated() &&
                    <li key="logout" className="nav-item">
                      <NavLink to="/login" className="nav-link" activeClassName="active" onClick={() => { onUpdate(); logout(); }}>Logout</NavLink>
                    </li>}
                </ul>
              </div>
              <button className="navbar-toggler p-0 border-0" type="button" onClick={toggle} data-toggle="offcanvas">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </nav>
        )
      }
      }
    </NavContext.Consumer >
    );
  }
}


export default Nav;
