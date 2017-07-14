import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore, combineReducers, applyMiddleware } from 'redux'; // eslint-disable-line
import thunk from 'redux-thunk';

import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux'; // eslint-disable-line

import createHistory from 'history/createBrowserHistory';

import rootReducer from '../../reducers';

import Home from '../../Containers/Home/Home';
import Results from '../../Containers/Results/Results';
import Position from '../../Containers/Position/Position';
import Post from '../../Containers/Post/Post';

const history = createHistory();

const middleware = routerMiddleware(history);

function configureStore(initialState) {
  return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, middleware),
    );
}

const store = configureStore();

const Main = props => (
  <Provider store={store} history={history}>
    <ConnectedRouter history={history}>
      <main id="main-content">
        <Switch {...props}>
          <Route exact path="/" component={() => <Home {...props} />} />
          <Route
            path="/results"
            component={() => <Results {...props} />}
          />
          <Route path="/details/:id" component={() => <Position {...props} />} />
          <Route path="/post/:id" component={() => <Post {...props} />} />
        </Switch>
      </main>
    </ConnectedRouter>
  </Provider>
);

export default Main;
