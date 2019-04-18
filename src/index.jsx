// important: babel-polyfill needs to be first to avoid any errors in IE11
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { get } from 'lodash';
import './sass/styles.scss';
import App from './Components/App/App';
import { getAssetPath } from './utilities';

import '../node_modules/uswds/dist/js/uswds.min';

// function to initialize app, capture feature flags in localStorage
export const init = (config) => {
  sessionStorage.setItem('config', JSON.stringify(config));
  ReactDOM.render((
    <App />
  ), document.getElementById('root') || document.createElement('div'));
};

// retrieve static config file, pass to app init
export const getConfig = () => {
  sessionStorage.removeItem('config');

  axios
  .get(getAssetPath('/config/config.json'))
  .then((response) => {
    init(get(response, 'data', {}));
  })
  .catch(() => init({}));
};
getConfig();
