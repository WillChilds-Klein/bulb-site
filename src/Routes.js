import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';

export default () => (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/logout" render={ () => <Redirect to="/" /> }/>
    </Switch>
);
