import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './common.css';

class Logout extends Component {
  render() {
    window.localStorage.clear();
    return <Redirect to="/" />;
  }
}

export default Logout;
