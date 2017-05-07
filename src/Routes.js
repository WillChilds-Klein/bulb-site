import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/profile" exact component={Profile} />
    <Route path="/login" exact component={Login} />
    <Route path="/logout" render={ () => <Redirect to="/" /> }/>
    <Route component={ NotFound } />  // catch-all for unspecified routes
  </Switch>
);
