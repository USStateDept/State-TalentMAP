import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routesArray from './RoutesMap';

const Routes = props => (
  <Switch {...props}>
    {
      routesArray.map(route => (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          component={() => route.component(props)}
        />
      ))
    }
  </Switch>
);

export default Routes;
