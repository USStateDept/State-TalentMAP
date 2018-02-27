const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routesArray = require('./routes.js');

// define full path to static build
const STATIC_PATH = process.env.STATIC_PATH || path.join(__dirname, '../build');

// define the API root url
const API_ROOT = process.env.API_ROOT || 'http://localhost:8000';

// define the prefix for the application
const PUBLIC_URL = process.env.PUBLIC_URL || '/talentmap/';

// Routes from React, with wildcard added to the end if the route is not exact
const ROUTES = routesArray.map(route => `${PUBLIC_URL}${route.path}${route.exact ? '' : '*'}`.replace('//', '/'));

// define the OBC root url
// example: https://www.obcurl.gov
const OBC_URL = process.env.OBC_URL;

// application port
const port = process.env.PORT || 3000;

const app = express();

// raw parser
const rawParser = bodyParser.raw();

// middleware for static assets
app.use(PUBLIC_URL, express.static(STATIC_PATH));

// saml2 acs
app.post(PUBLIC_URL, rawParser, (request, response) => {
  if (request.body) {
    response.redirect(307, `${API_ROOT}/saml2/acs/`);
  }
});

// saml2 login
app.get(`${PUBLIC_URL}login`, (request, response) => {
  response.redirect(`${API_ROOT}/saml2/login/`);
});

// saml2 metadata
app.get(`${PUBLIC_URL}metadata/`, (request, response) => {
  response.redirect(`${API_ROOT}/saml2/metadata/`);
});

// OBC redirect - posts
app.get(`${PUBLIC_URL}obc/post/:id`, (request, response) => {
  // set the id passed in the route and pass it to the redirect
  const id = request.params.id;
  response.redirect(`${OBC_URL}/post/detail/${id}`);
});

// OBC redirect - countries
app.get(`${PUBLIC_URL}obc/country/:id`, (request, response) => {
  // set the id passed in the route and pass it to the redirect
  const id = request.params.id;
  response.redirect(`${OBC_URL}/country/detail/${id}`);
});

app.get(ROUTES, (request, response) => {
  response.sendFile(path.resolve(STATIC_PATH, 'index.html'));
});

// this is our wildcard, 404 route
app.get('*', (request, response) => {
  response.sendStatus(404);
});

const server = app.listen(port);

// export the the app and server separately
module.exports = { app, server };
