import React, { Component } from 'react';

import { Table } from 'semantic-ui-react';
import _ from 'lodash';


class TaskTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      data: null,
      direction: null,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({data: props.tasks})
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;
    if (column === clickedColumn) {
      this.setState({
        data: data.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending'
      })
    } else {
      this.setState({
          column: clickedColumn,
          data: _.sortBy(data, [ clickedColumn ]),
          direction: 'ascending',
      })
    }
  }


  render() {
    const { column, data, direction } = this.state;
    return (
      <Table singleLine collapsable selectable sortable >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell sorted={ column === 'priority' ? direction : null } onClick={ this.handleSort('priority') } >
                Priority
            </Table.HeaderCell>
            <Table.HeaderCell sorted={ column === 'status' ? direction : null } onClick={ this.handleSort('status') } >
                Status
            </Table.HeaderCell>
            <Table.HeaderCell>Workspaces</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {_.map(data, ({task_id, name, priority, status, workspaces}) => (
            <Table.Row key={ task_id }>
              <Table.Cell>{ name }</Table.Cell>
              <Table.Cell>{ priority }</Table.Cell>
              <Table.Cell>{ status }</Table.Cell>
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
