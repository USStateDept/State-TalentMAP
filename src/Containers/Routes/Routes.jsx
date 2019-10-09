import React from 'react';
import { Switch, Route } from 'react-router-dom';
import mappedRoutesArray from './RoutesMap';
import NotFound from '../../Components/NotFound404';

const Routes = props => (
  <Switch {...props}>
    {
      mappedRoutesArray.map(route => (
        <Route
          key={route.key || route.path}
          exact={route.exact}
          path={route.path}
          component={() => route.component(props)}
        />
      ))
    }
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
