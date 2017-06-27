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
        alert('user ' + name + ' successfully created!')
        post('/auth', {'email': email, 'password': password})
          .then(res => {
            window.localStorage.clear();
            window.localStorage.setItem("access_token", res.access_token);
            this.setState({email: '', password: ''});   // clear form on submit
            alert('user logged in with token ' + res.access_token)
            let uid = jwt_decode(res.access_token).uid;
            window.localStorage.setItem("uid", uid);
            get('/users/' + uid)
              .then(res => {
                window.localStorage.setItem("uname", res.name);
                window.localStorage.setItem("email", res.email);
              })
              .catch(err => {
                console.log(err);
                alert(`Somehow, we cant fine user {uid}!`);
              });
          })
          .catch(err => {
            console.log(err);
            alert('whoops! something went wrong during authentication...');
          });
        this.props.history.push('/');   // redirect to home page
      })
      .catch(err => {
        alert('error creating user!')
      })
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
