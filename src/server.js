const express = require('express');
const path = require('path');
const bunyan = require('bunyan');
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

// set up logger
const logger = bunyan.createLogger({ name: 'TalentMAP' });

// logging middleware
const loggingMiddleware = (request, response, next) => {
  const log = {
    reqId: request.id,
  };
  logger.info(log);
  next();
};

const app = express();

// remove 'X-Powered-By' header
app.disable('x-powered-by');

// middleware for static assets
app.use(PUBLIC_URL, express.static(STATIC_PATH));

// middleware for logging
app.use(loggingMiddleware);

// saml2 acs
app.post(PUBLIC_URL, (request, response, next) => {
  response.redirect(307, `${API_ROOT}/saml2/acs/`);
  next();
});

// saml2 login
app.get(`${PUBLIC_URL}login`, (request, response, next) => {
  response.redirect(`${API_ROOT}/saml2/login/`);
  next();
});

// saml2 metadata
app.get(`${PUBLIC_URL}metadata/`, (request, response, next) => {
  response.redirect(`${API_ROOT}/saml2/metadata/`);
  next();
});

// OBC redirect - posts
app.get(`${PUBLIC_URL}obc/post/:id`, (request, response, next) => {
  // set the id passed in the route and pass it to the redirect
  const id = request.params.id;
  response.redirect(`${OBC_URL}/post/detail/${id}`);
  next();
});

// OBC redirect - countries
app.get(`${PUBLIC_URL}obc/country/:id`, (request, response, next) => {
  // set the id passed in the route and pass it to the redirect
  const id = request.params.id;
  response.redirect(`${OBC_URL}/country/detail/${id}`);
  next();
});

app.get(ROUTES, (request, response, next) => {
  response.sendFile(path.resolve(STATIC_PATH, 'index.html'));
  response.sendStatus(200);
  next();
});

// this is our wildcard, 404 route
app.get('*', (request, response, next) => {
  response.sendStatus(404);
  next();
});

const server = app.listen(port);

// export the the app and server separately
module.exports = { app, server };
