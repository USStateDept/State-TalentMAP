import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom'

import Home from '../Home/Home';
import Results from '../Results/Results';
import Details from '../Details/Details';

class App extends Component {

  render() {
    return (
      <HashRouter>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/results" component={Results} />
            <Route path="/details/:id" component={Details} />
          </Switch>
        </main>
      </HashRouter>
    );
  }
}

export default App;
