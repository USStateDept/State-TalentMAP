// important: babel-polyfill needs to be first to avoid any errors in IE11
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './sass/styles.scss';
import App from './Components/App/App';

require('../node_modules/es6-shim/es6-shim.js');

ReactDOM.render((
  <App />
), document.getElementById('root') || document.createElement('div'));
