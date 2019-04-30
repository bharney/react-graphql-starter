import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  state = {
    profile: null,
    error: ""
  }

  componentDidMount() {
    this.loadUserProfile()
  }

  loadUserProfile() {
    this.props.auth.getProfile((profile, error) => {
      this.setState({ profile, error })
    })
  }

  render() {
    const { profile } = this.state
    if (!profile) {
      return null
    }
    return (
      <div>Profile
      <p>{profile.nickname}</p>
        <img style={{ maxWidth: 50, maxHeight: 50 }}
          src={profile.picture}
          alt="profile pic" />
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    );
  }
}

export default Profile;