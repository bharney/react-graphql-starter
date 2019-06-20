import React, { Component, Children } from 'react';
export const alertTypes = {
  success: 'success',
  warning: 'warning',
  danger: 'error',
  info: 'info',
}
const alertState = {
  entering: 'entering',
  entered: 'entered',
  exiting: 'exiting',
  exited: 'exited',
}
const enteringDuration = 100;
const exitingDuration = 100;
const existedDuration = 100;
const autoCloseDuration = 5000;

export const NotificationContext = React.createContext({ isOpen: false, message: "", type: alertTypes.info, openAlert: () => { }, closeAlert: () => { } });

class NotificationProvider extends Component {
  state = {
    isOpen: false,
    type: alertTypes.info,
    message: "",
    alertState: alertState.entering
  }
  closeAlert = () => {
    this.setState({
      state: alertState.exiting
    }, () => {
      setTimeout(() => {
        this.setState({
          state: alertState.exited
        })
      }, exitingDuration);
      setTimeout(() => {
        this.setState({
          message: "",
          isOpen: false,
        })
      }, exitingDuration + existedDuration);
    })

  }

  openAlert = (message, type) => {
    this.setState({
      message,
      isOpen: true,
      type,
      alertState: alertState.entering
    });
    setTimeout(() => {
      this.setState({
        alertState: alertState.entered
      });
    }, enteringDuration);
    setTimeout(() => {
      this.setState({ alertState: alertState.exiting });
    }, autoCloseDuration);
    setTimeout(() => {
      this.setState({ alertState: alertState.exited });
    }, autoCloseDuration + exitingDuration);
    setTimeout(() => {
      this.setState({
        message: "",
        isOpen: false,
      })
    }, autoCloseDuration + exitingDuration + existedDuration);
  }

  renderAlert = (message, type, alertstate) => {
    const styles = {
      display: "block"
    }
    const closeAction = (e) => { e.preventDefault(); this.closeAlert(); };
    return (
      <div className={`toast toast-${type} alert alert-dismissable fade fade-${alertstate}`} style={styles} role="alert">
        <a href="#" className="close" aria-label="close" onClick={closeAction}>&times;</a>
        <div className="toast-message">
          {message}
        </div>
      </div>
    );
  }
  render() {
    return (
      <>
        <NotificationContext.Provider
          value={{
            openAlert: this.openAlert,
            closeAlert: this.closeAlert,
            isOpen: this.state.isOpen,
            message: this.state.message,
            type: this.state.type,
            alertState: this.state.alertState
          }}>
          <div id="toast-container" className="alerts toast-top-right" role="alert">
            {this.state.isOpen && this.renderAlert(this.state.message, this.state.type, this.state.alertState)}
          </div>
          {this.props.children}
        </NotificationContext.Provider>
      </>
    );
  }
}

export default NotificationProvider