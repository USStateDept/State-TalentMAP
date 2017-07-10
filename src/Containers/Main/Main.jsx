import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from '../../Containers/Home/Home';
import Results from '../../Containers/Results/Results';
import Details from '../../Containers/Details/Details';
import Post from '../../Containers/Post/Post';
import configureStore from '../../store/configureStore';

const store = configureStore();

const Main = props => (
  <Provider store={store}>
    <main id="main-content">
      <Switch {...props}>
        <Route exact path="/" component={() => <Home {...props} />} />
        <Route
          path="/results"
          component={() => <Results {...props} />}
        />
        <Route path="/details/:id" component={() => <Details {...props} />} />
        <Route path="/post/:id" component={() => <Post {...props} />} />
      </Switch>
    </main>
  </Provider>
);

export default Main;
