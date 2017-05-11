import React from 'react';
import { Table } from 'semantic-ui-react';


const DocumentTable = props => {
  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Progress</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.documents.map(doc => (
          <Table.Row key={ doc.doc_id }>
            <Table.Cell>{ doc.name }</Table.Cell>
            <Table.Cell>{ doc.type }</Table.Cell>
            <Table.Cell>{ doc.status }</Table.Cell>
            <Table.Cell>{ doc.progress }</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
};

export default DocumentTable;
