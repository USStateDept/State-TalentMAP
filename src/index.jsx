import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './sass/styles.scss';
import App from './Components/App/App';

require('../node_modules/uswds/dist/js/uswds.min.js');

ReactDOM.render((
  <BrowserRouter>
    <App api={'http://localhost:8000/api/v1'} />
  </BrowserRouter>
), document.getElementById('root') || document.createElement('div'));
