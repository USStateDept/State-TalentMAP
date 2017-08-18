const React = require('react');
const { renderToString } = require('react-dom/server');
const { match, RouterContext } = require('react-router');
const { StaticRouter as Router } = require('react-router-dom');

const express = require('express');
const path = require('path');

// define the url consuming the API, provide local dev value as default
const API_URL = process.env.API_URL || 'http://localhost:8000/api/v1';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (request, response) => { 
    let markup = '';

      // eslint-disable-next-line react/jsx-filename-extension
      markup = renderToString(<RouterContext {...renderProps} />);

    response.render('index', markup);

  //response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port);
