import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { StaticRouter as Router } from 'react-router-dom';
import App from './Components/App/App';

const express = require('express');
const path = require('path');

// define the url consuming the API, provide local dev value as default
const API_URL = process.env.API_URL || 'http://localhost:8000/api/v1';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (request, response) => {
  let markup = '';
  let status = 200;

  // eslint-disable-next-line react/jsx-filename-extension
  markup = renderToString(<Router api={API_URL}><App api={API_URL} /></Router>);

  response.status(status).render('index', { markup });

  // response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port);
