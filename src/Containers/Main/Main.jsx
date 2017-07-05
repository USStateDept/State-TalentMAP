import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../Containers/Home/Home';
import Results from '../../Containers/Results/Results';
import Details from '../../Containers/Details/Details';

const Main = props => (
  <main id="main-content">
    <Switch {...props}>
      <Route exact path="/" component={() => <Home {...props} />} />
      <Route
        path="/results"
        component={() => <Results {...props} />}
      />
      <Route path="/details/:id" component={() => <Details {...props} />} />
    </Switch>
  </main>
);

export default Main;
