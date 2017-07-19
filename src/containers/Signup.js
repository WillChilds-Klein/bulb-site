import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

import { get, post } from '../Client.js';
import './common.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      submittedName: '',
      submittedEmail: '',
      submittedPassword: '',
      submittedConfirmPassword: '',
    };
  }

  validateForm() {
    // TODO: validate email against regex '^.+@.+\..+$'
    return this.state.email.length > 0
      && this.state.password.length > 0
      && this.state.password === this.state.confirmPassword;
  }

  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;
    this.setState({
      submittedName: name,
      submittedEmail: email,
      submittedPassword: password,
      submittedConfirmPassword: confirmPassword
    });

    post('/users', {'email': email, 'password': password, 'name': name})
      .then(res => {
        window.localStorage.clear();
        this.setState({   // clear form on submit
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        alert('user ' + name + ' successfully created!');
        return post('/auth', {'email': email, 'password': password});
      })
      .then(res => {
        console.log('user logged in with token ' + res.access_token);
        window.localStorage.setItem("access_token", res.access_token);
        let uid = jwt_decode(res.access_token).uid;
        window.localStorage.setItem("user_id", uid);
        return post(['/users', 'init', uid].join('/'));
      })
      .then(res => {
       let uid = window.localStorage.getItem("user_id");
        return get('/users/' + uid);
      })
      .then(res => {
        window.localStorage.setItem("uname", res.name);
        window.localStorage.setItem("email", res.email);
        window.localStorage.setItem("org_id", res.org_id);
        this.props.history.push('/');   // redirect to home page
      })
      .catch(err => {   // TODO: chain all the .then's and have single .catch?
        console.log(err);
        console.log('we had an issue: ' + String(err));
        alert('we had an issue: ' + String(err));
        throw Error(err);
      });
  }

  render() {
    const { email, password, confirmPassword, name } = this.state;

    return (
      <div className="Signup">
        <Form onSubmit={this.handleSubmit}>
          <Form.Input placeholder="name" name="name" value={name} onChange={this.handleChange} />
          <Form.Input placeholder="email" name="email" value={email} onChange={this.handleChange} />
          <Form.Input placeholder="password" type="password" name="password" value={password} onChange={this.handleChange} />
          <Form.Input placeholder="confirm password" type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />
          <Form.Button content="submit" disabled={!this.validateForm()} />
        </Form>
      </div>
    );
  }
}

export default Signup;
