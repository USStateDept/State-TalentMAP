import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Home from '../Home/Home';
import Results from '../Results/Results';
import Details from '../Details/Details';
import items from '../Home/items.json';

const api = 'http://localhost:3005';

const App = () => (
  <HashRouter>
    <main>
      <Switch>
        <Route exact path="/" component={() => <Home items={items} />} />
        <Route path="/results" component={props => <Results {...props} api={api} />} />
        <Route path="/details/:id" component={props => <Details {...props} api={api} />} />
      </Switch>
    </main>
  </HashRouter>
);

export default App;
