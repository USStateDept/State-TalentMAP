import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../Containers/Home/Home';
import Profile from '../../Containers/Profile/Profile';
import Results from '../../Containers/Results/Results';
import Position from '../../Containers/Position/Position';
import Login from '../../login';
import Compare from '../../Containers/Compare/Compare';

const Routes = props => (
  <Switch {...props}>
    <Route
      path="/login"
      component={() => (<Login {...props} />)}
    />
    <Route
      exact
      path="/"
      component={() => (<Home {...props} />)}
    />
    <Route
      path="/profile"
      component={() => (<Profile {...props} />)}
    />
    <Route
      path="/results"
      component={() => (<Results {...props} />)}
    />
    <Route
      path="/details/:id"
      component={() => (<Position {...props} />)}
    />
    <Route
      path="/compare/:ids"
      component={() => (<Compare {...props} />)}
    />
  </Switch>
);

export default Routes;
