import React, { Component } from 'react';

import _ from 'lodash';
import {
  Dropdown,
  Icon,
  Table
} from 'semantic-ui-react';

import { put } from '../Client.js';


const workspaceOptions = [
  {key: 1, text: 'formation', value: 'FORMATION'},
  {key: 2, text: 'tax', value: 'TAX'},
  {key: 3, text: 'compliance', value: 'COMPLIANCE'},
  {key: 4, text: 'finance', value: 'FINANCE'},
  {key: 5, text: 'real_estate', value: 'REAL_ESTATE'},
  {key: 6, text: 'structural', value: 'STRUCTURAL'},
  {key: 7, text: 'inventory', value: 'INVENTORY'},
  {key: 8, text: 'equipment', value: 'EQUIPMENT'},
  {key: 9, text: 'operations', value: 'OPERATIONS'},
  {key: 10, text: 'employees', value: 'EMPLOYEES'},
  {key: 11, text: 'insurance', value: 'INSURANCE'},
  {key: 12, text: 'marketing', value: 'MARKETING'},
];


const priorityOptions = [
  {key: 1, text: 'Low', value: 0},
  {key: 2, text: 'Med.', value: 0.5},
  {key: 3, text: 'High', value: 1},
];

const statusOptions = [
  {key: 1, text: 'Not Started', value: 'NOT_STARTED'},
  {key: 2, text: 'In Progress', value: 'IN_PROGRESS'},
  {key: 3, text: 'Complete', value: 'COMPLETE'},
];


class TaskTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      tasks: props.tasks,
      displayTasks: props.tasks,
      direction: null,
      selectedWorkspaces: [],
    }

    this.handleWorkspaceFilterChange = this.handleWorkspaceFilterChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tasks: nextProps.tasks,
      displayTasks: nextProps.tasks,
    });
    // TODO: how to invoke sorting?!? need to do this on priority/status update as well...
  }

  handleWorkspaceFilterChange(e, data) {
    let newSelectedWorkspaces = data.value;
    // TODO: probably want return early if old + new selected ws's are equal
    // NOTE: in order to have "clear all" functionality, will
    //       need to manage this component our damn selves...
    // 1. outer filter: filter for tasks that meet test of inner filter (see 2.)
    // 2. inner filter: filter for a task's workspaces that are in newSelectedWorkspaces
    let newFilteredTasks = _.filter(this.state.tasks, (task) => {
      return _.intersection(task.workspaces, newSelectedWorkspaces).length > 0
    });
    let newDisplayTasks = newSelectedWorkspaces.length ? newFilteredTasks
                                                       : this.state.tasks;
    this.setState({
      displayTasks: newDisplayTasks,
      selectedWorkspaces: newSelectedWorkspaces,
    });
  }

  handleSort(clickedColumn) {
    const {column, displayTasks, direction} = this.state;
    if (column === clickedColumn) {
      this.setState({
        displayTasks: displayTasks.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending'
      })
    } else {
      this.setState({
        column: clickedColumn,
        displayTasks: _.sortBy(displayTasks, [ clickedColumn ]),
        direction: 'ascending',
      })
    }
  }

  /* this is so fucking terrible. why are you copying the entire goddamn task list to update
     one value of one element?!? this is O(n) in size of task list but should be O(1)...
   */
  handlePriorityChange(taskId, e, data) {
    const task = _.find(this.state.tasks, {'task_id': taskId})
    const newPriority = data.value
    if (newPriority !== task.priority) {
      let newTasks = this.state.tasks.slice()
      let newTask = _.find(newTasks, {'task_id': taskId})
      newTask.priority = newPriority
      put(`/tasks/${task.task_id}`, {priority: newPriority})
        .then(res => {
          this.setState({tasks: newTasks})
          console.log(`Successfully changed priority to ${newPriority} for ${task.name}`)
        })
        .catch(err => {console.log(err);})
    }
  }

  // TODO: priority/status change methods should be merged...
  handleStatusChange(taskId, e, data) {
    const task = _.find(this.state.tasks, {'task_id': taskId})
    const newStatus = data.value
    if (newStatus !== task.status) {
      let newTasks = this.state.tasks.slice()
      let newTask = _.find(newTasks, {'task_id': taskId})
      newTask.status = newStatus
      put(`/tasks/${task.task_id}`, {status: newStatus})
        .then(res => {
          this.setState({tasks: newTasks})
          console.log(`Successfully changed status to ${newStatus} for ${task.name}`)
        })
        .catch(err => {console.log(err);})
    }
  }

  getPriorityDisplayName(priority) {
    let p = _.find(priorityOptions, {value: priority})
    return p ? p.text : 'ERR'
  }

  getStatusDisplayName(status) {
    let s = _.find(statusOptions, {value: status})
    return s ? s.text : 'ERR'
  }

  render() {
    const {column, tasks, displayTasks, direction } = this.state;
    return (
      <Table singleLine collapsing compact selectable sortable >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              workspaces:
              <Dropdown
                placeholder='all'
                fluid
                multiple
                selection
                closeOnChange
                tabIndex={ 1 }
                loading={ tasks.length === 0 }
                options={workspaceOptions}
                onChange={this.handleWorkspaceFilterChange}
              />
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'priority' ? direction : null}
              onClick={() => this.handleSort('priority')}
            >
              Priority
              { column !== 'priority' && <Icon name="sort" /> }
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'status' ? direction : null}
              onClick={() => this.handleSort('status')}
            >
              Status
              { column !== 'status' && <Icon name="sort" /> }
            </Table.HeaderCell>
            <Table.HeaderCell>Workspaces</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {_.map(displayTasks, ({task_id, name, priority, status, workspaces}) => (
            <Table.Row key={task_id}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>
                <Dropdown
                  text={this.getPriorityDisplayName(priority)}
                  options={priorityOptions}
                  defaultValue={priority}
                  compact
                  onChange={(e, data) => this.handlePriorityChange(task_id, e, data)}
                >
                </Dropdown>
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  text={this.getStatusDisplayName(status)}
                  options={statusOptions}
                  defaultValue={status}
                  compact
                  onChange={(e, data) => this.handleStatusChange(task_id, e, data)}
                >
                </Dropdown>
              </Table.Cell>
              <Table.Cell>{
                workspaces.reduce((acc, ws) =>
                  acc + ", " + ws
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
  )}
};

export default TaskTable;
