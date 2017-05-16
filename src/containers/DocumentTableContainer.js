import React, { Component } from 'react';
import { get } from '../Client.js';
import DocumentTable from '../components/DocumentTable';

class DocumentTableContainer extends Component {
  constructor() {
    super()
    this.state = { documents: [] }
  }

  componentDidMount() {
    get('/documents')
      .then((docs) =>
        this.setState({ documents: docs })
      ).catch(err => console.log(err))
  }

  render() {
    return <DocumentTable documents={this.state.documents} />;
  }
}

export default DocumentTableContainer
