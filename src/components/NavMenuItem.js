import React from 'react';
import { Route } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';


export default (props) => (
  <Route path={props.href} exact children={({ match }) => (
    <Menu.Item {...props} active={ match ? true : false }>{ props.children }</Menu.Item>
  )}/>
);
