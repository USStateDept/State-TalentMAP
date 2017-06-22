import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Home from '../Home/Home';
import Results from '../Results/Results';
import Details from '../Details/Details';
import items from '../Home/items.json';

const App = () => (
  <HashRouter>
    <main>
      <Switch>
        <Route exact path="/" render={() => <Home items={items} />} />
        <Route path="/results" component={Results} />
        <Route path="/details/:id" component={Details} />
      </Switch>
    </main>
  </HashRouter>
);

export default App;
