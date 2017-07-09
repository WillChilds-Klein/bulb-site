import React, { Component } from 'react';
import { get } from '../Client.js';
import TaskTable from '../components/TaskTable';

class TaskTableContainer extends Component {
  constructor() {
    super();
    this.state = { tasks: [] };
  }

  componentDidMount() {
    get('/tasks')
      .then((tasks) => {
        this.setState({ tasks: tasks });
      })
  }

  render() {
    return <TaskTable tasks={this.state.tasks} />;
  }
}

export default TaskTableContainer;
