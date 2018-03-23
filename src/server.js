const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const routesArray = require('./routes.js');

// define full path to static build
const STATIC_PATH = process.env.STATIC_PATH || path.join(__dirname, '../build');

// Are we using a mock SAML for demo purposes?
// If so, the env var USE_MOCK_SAML should be 1.
const USE_MOCK_SAML = process.env.USE_MOCK_SAML === '1';

// define the API root url
const API_ROOT = process.env.API_ROOT || 'http://localhost:8000';

// define the prefix for the application
const PUBLIC_URL = process.env.PUBLIC_URL || '/talentmap/';

// Define the SAML login redirect
let SAML_LOGIN = `${API_ROOT}/saml2/acs/`;
if (USE_MOCK_SAML) {
  SAML_LOGIN = `${PUBLIC_URL}login.html`;
}

// Define the SAML logout redirect
let SAML_LOGOUT = `${API_ROOT}/saml2/logout/`;
if (USE_MOCK_SAML) {
  SAML_LOGOUT = `${PUBLIC_URL}login.html`;
}

// Routes from React, with wildcard added to the end if the route is not exact
const ROUTES = routesArray.map(route => `${PUBLIC_URL}${route.path}${route.exact ? '' : '*'}`.replace('//', '/'));

// define the OBC root url
// example: https://www.obcurl.gov
const OBC_URL = process.env.OBC_URL;

// application port
const port = process.env.PORT || 3000;

const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// middleware for HTTP headers
app.use(helmet());

// middleware for static assets
app.use(PUBLIC_URL, express.static(STATIC_PATH));

// saml2 acs
app.post(PUBLIC_URL, (request, response) => {
  response.redirect(307, `${API_ROOT}/saml2/acs/`);
});

// saml2 login
app.get(`${PUBLIC_URL}login`, (request, response) => {
  response.redirect(SAML_LOGIN);
});

// saml2 metadata
app.get(`${PUBLIC_URL}metadata/`, (request, response) => {
  response.redirect(`${API_ROOT}/saml2/metadata/`);
});

app.get(`${PUBLIC_URL}logout`, (request, response) => {
  response.redirect(SAML_LOGOUT);
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
