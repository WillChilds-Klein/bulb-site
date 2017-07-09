import React, { Component } from 'react';
import TaskTableContainer from './TaskTableContainer';
import './common.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <h2>HERE BE THE DASHBOARD</h2>
        <div>
          <TaskTableContainer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
