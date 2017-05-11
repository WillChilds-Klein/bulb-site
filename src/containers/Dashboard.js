import React, { Component } from 'react';
import DocumentTableContainer from './DocumentTableContainer';
import './common.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <h2>HERE BE THE DASHBOARD</h2>
        <div>
          <DocumentTableContainer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
