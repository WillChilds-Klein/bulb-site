import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Logout from './containers/Logout';
import NotFound from './containers/NotFound';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/profile" exact component={Profile} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/login" exact component={Login} />
    <Route path="/logout" exact component={Logout}/>
    <Route component={NotFound} />  // catch-all for unspecified routes
  </Switch>
);
