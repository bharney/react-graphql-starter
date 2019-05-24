import React, { Component } from 'react';
import ReactDOM from "react-dom"

export const NavContext = React.createContext({ on: false, toggle: () => { }, onUpdate: () => { }, handleOverlayToggle: (e) => { } })

class NavProvider extends Component {
  state = { on: false }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (window.innerWidth > 767) {
      this.setState(
        ({ on }) => ({ on: false }),
        () => {
          this.closeSidebar()
        })
    }
  }
  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        if (this.state.on) {
          this.handleSidebarToggle()
        } else {
          this.closeSidebar();
        }
      },
    )
  }
  onUpdate = () => {
    this.setState(
      ({ on }) => ({ on: false }),
      () => {
        this.closeSidebar()
        window.scrollTo(0, 0);
      },
    )
  };
  handleOverlayToggle = (e) => {
    if (e.target.classList.contains("open")) {
      this.setState(
        ({ on }) => ({ on: false }),
        () => {
          this.closeSidebar()
        },
      )
    }
  }
  handleSidebarToggle() {
    let navbar = document.getElementsByClassName("offcanvas-collapse")
    ReactDOM.findDOMNode(navbar[0]).classList.toggle('open');
    let offCanvas = document.getElementsByClassName("offcanvas-collapse")[0].classList.contains('open')
    if (offCanvas) {
      document.getElementsByTagName("html")[0].style.overflowY = "hidden";
    }
  }
  closeSidebar() {
    let offCanvas = document.getElementsByClassName("offcanvas-collapse")[0].classList.contains('open')
    if (offCanvas) {
      let navbar = document.getElementsByClassName("offcanvas-collapse")
      ReactDOM.findDOMNode(navbar[0]).classList.toggle('open');
    }
    document.getElementsByTagName("html")[0].style.overflowY = "auto";
  }
  render() {
    return (
      <>
        <NavContext.Provider value={{
          on: this.state.on,
          toggle: this.toggle,
          onUpdate: this.onUpdate,
          handleOverlayToggle: this.handleOverlayToggle
        }}>
          {this.props.children}
        </NavContext.Provider>
      </>
    );
  }
}

export default NavProvider
