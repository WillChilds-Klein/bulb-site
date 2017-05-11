import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './Routes';
import { Menu } from 'semantic-ui-react'
import NavMenuItem from './components/NavMenuItem';
import './App.css';

class App extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
    <div className="App">
      <div className="Menu">
        <Menu pointing secondary>
          <NavMenuItem header name='home' onClick={this.handleItemClick} href="/">bulb</NavMenuItem>
          <NavMenuItem name='dashboard' onClick={this.handleItemClick} href="/dashboard" />
          <NavMenuItem name='profile' onClick={this.handleItemClick} href="/profile" />
          <Menu.Menu position='right'>
            <NavMenuItem name='login' onClick={this.handleItemClick} href="/login" />
            <NavMenuItem name='logout' onClick={this.handleItemClick} href="/logout" />
          </Menu.Menu>
        </Menu>
      </div>
      <Routes />
    </div>
    );
  }
}

export default withRouter(App);
