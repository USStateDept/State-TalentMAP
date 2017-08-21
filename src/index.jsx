import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './sass/styles.scss';
import App from './Components/App/App';
import api from './api';

require('../node_modules/uswds/dist/js/uswds.min.js');

ReactDOM.render((
  <BrowserRouter>
    <App api={api} />
  </BrowserRouter>
), document.getElementById('root') || document.createElement('div'));
