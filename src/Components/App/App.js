import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Home from '../Home/Home';
import Results from '../Results/Results';
import Details from '../Details/Details';

const api = 'http://localhost:8000/api/v1';

const App = () => (
  <HashRouter>
    <main>
      <Switch>
        <Route exact path="/" component={() => <Home api={api} />} />
        <Route
          path="/results"
          component={props => <Results {...props} api={api} />}
        />
        <Route path="/details/:id" component={props => <Details {...props} api={api} />} />
      </Switch>
    </main>
  </HashRouter>
);

export default App;
