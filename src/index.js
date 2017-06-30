import React from 'react';
import ReactDOM from 'react-dom';
import './sass/styles.scss';
import App from './Components/App/App';

require('../node_modules/uswds/dist/js/uswds.min.js');

const root = document.getElementById('root');
const api = (root && root.dataset.api) ? root.dataset.api : 'http://localhost:8000/api/v1';

ReactDOM.render((
  <App api={api} />
), root || document.createElement('div'));
