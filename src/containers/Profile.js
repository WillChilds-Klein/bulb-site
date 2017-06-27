import React, { Component } from 'react';
import './common.css';

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
          <h2>HERE BE THE PROFILE</h2>
          <h2>YOUR NAME IS {
            window.localStorage.getItem("uname") === null
            ? "UNKNOWN"
            : window.localStorage.uname.toUpperCase()
          }</h2>
      </div>
    );
  }
}

export default Profile;
