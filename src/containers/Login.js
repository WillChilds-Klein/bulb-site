import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import './common.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submittedEmail: '',
      submittedPassword: '',
    };
  }

  validateForm() {
    // TODO: validate email against regex '^.+@.+\..+$'
    return this.state.email.length > 0
            && this.state.password.length > 0;
  }

  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    });
  }

  handleSubmit = e => {
    e.preventDefault()
    const {email, password} = this.state;

    this.setState({submittedEmail: email, submittedPassword: password});
    this.setState({email: '', password: ''});   // clear form on submit
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Input placeholder="email" name="email" value={email} onChange={this.handleChange} />
          <Form.Input placeholder="password" type="password" name="password" value={password} onChange={this.handleChange} />
          <Form.Button content="submit" disabled={!this.validateForm()} />
        </Form>
      </div>
    );
  }
}

export default Login;
