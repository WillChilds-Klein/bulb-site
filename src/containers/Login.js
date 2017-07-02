import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

import { get, post } from '../Client.js';
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

    post('/auth', {'email': email, 'password': password})
      .then(res => {
        alert('user logged in with token ' + res.access_token)
        this.setState({email: '', password: ''});   // clear form on submit
        window.localStorage.setItem("access_token", res.access_token);
        let uid = jwt_decode(res.access_token).uid;
        window.localStorage.setItem("uid", uid);
        get('/users/' + uid)
          .then(res => {
            window.localStorage.setItem("uname", res.name);
            window.localStorage.setItem("email", res.email);
            window.localStorage.setItem("organization", res.organization);
          })
          .catch(err => {
            console.log(err);
            alert(`Somehow, we cant fine user {uid}!`);
          });
        this.props.history.push('/');   // redirect to home page
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 404) {
          alert('user not found!');
          this.setState({email: '', password: ''});   // clear form on bad email
        } else if (err.response.status === 401) {
          alert('invalid password!');
          this.setState({password: ''});   // clear password
        }
      })
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
