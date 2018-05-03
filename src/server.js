const express = require('express');
const bodyParser = require('body-parser');
const bunyan = require('bunyan');
const helmet = require('helmet');
const path = require('path');
const routesArray = require('./routes.js');
const { metadata, login } = require('./saml2-config');

// define full path to static build
const STATIC_PATH = process.env.STATIC_PATH || path.join(__dirname, '../build');

// Are we using a mock SAML for demo purposes?
// If so, the env var USE_MOCK_SAML should be 1.
const USE_MOCK_SAML = process.env.USE_MOCK_SAML === '1';

// define the API root url
const API_ROOT = process.env.API_ROOT || 'http://localhost:8000';

// define the prefix for the application
const PUBLIC_URL = process.env.PUBLIC_URL || '/talentmap/';

/* eslint-disable no-unused-vars */
// Define the SAML login redirect
let SAML_LOGIN = `${API_ROOT}/saml2/acs/`;
if (USE_MOCK_SAML) {
  SAML_LOGIN = `${PUBLIC_URL}login.html`;
}
/* eslint-enable no-unused-vars */

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

// path to external about page
const ABOUT_PAGE = process.env.ABOUT_PAGE || 'https://github.com/18F/State-TalentMAP';

// application port
const port = process.env.PORT || 3000;

// set up logger
const logger = bunyan.createLogger({ name: 'TalentMAP' });

// logging middleware
const loggingMiddleware = (request, response, next) => {
  // object to log
  const log = {
    method: request.method,
    headers: request.headers,
    url: request.url,
    query: request.query,
  };

  response.on('error', () => {
    logger.error(log);
  });

  response.on('finish', () => {
    logger.info(log);
  });

  next();
};

const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// remove 'X-Powered-By' header
app.disable('x-powered-by');

// middleware for HTTP headers
app.use(helmet());
app.use(helmet.noCache());

// middleware for static assets
app.use(PUBLIC_URL, express.static(STATIC_PATH));

app.use(bodyParser.urlencoded({
  extended: true,
}));

// middleware for logging
app.use(loggingMiddleware);

// saml2 acs
app.post(PUBLIC_URL, (request, response) => {
  response.redirect(307, `${API_ROOT}/saml2/acs/`);
});

// saml2 login
app.get(`${PUBLIC_URL}login`, (request, response) => {
  // create handler
  // eslint-disable-next-line no-unused-vars
  const loginHandler = (err, loginUrl, requestId) => {
    if (err) {
      response.sendStatus(500);
    } else {
      response.redirect(loginUrl);
    }
  };

  login(loginHandler);
});


app.get(`${PUBLIC_URL}logout`, (request, response) => {
  response.redirect(`${API_ROOT}/saml2/logout/`);
});


// saml2 metadata
app.get(`${PUBLIC_URL}metadata`, (request, response) => {
  response.type('application/xml');
  response.send(metadata);
});

// OBC redirect - post data detail
// endpoint for post-specific data points
app.get(`${PUBLIC_URL}obc/post/data/:id`, (request, response) => {
  // set the id passed in the route and pass it to the redirect
  const id = request.params.id;
  response.redirect(`${OBC_URL}/post/postdatadetails/${id}`);
});

app.get(`${PUBLIC_URL}logout`, (request, response) => {
  response.redirect(SAML_LOGOUT);
});

// OBC redirect - posts
// endpoint for post, ie landing page
app.get(`${PUBLIC_URL}obc/post/:id`, (request, response) => {
  // set the id passed in the route and pass it to the redirect
  const id = request.params.id;
  response.redirect(`${OBC_URL}/post/detail/${id}`);
});

// OBC redirect - countries
// endpoint for country, ie landing page
app.get(`${PUBLIC_URL}obc/country/:id`, (request, response) => {
  // set the id passed in the route and pass it to the redirect
  const id = request.params.id;
  response.redirect(`${OBC_URL}/country/detail/${id}`);
});

app.get(`${PUBLIC_URL}about/more`, (request, response) => {
  response.redirect(`${ABOUT_PAGE}`);
});

app.get(ROUTES, (request, response) => {
  response.sendFile(path.resolve(STATIC_PATH, 'index.html'));
});

// this is our wildcard, 404 route
app.get('*', (request, response) => {
  response.sendStatus(404).end();
});

const server = app.listen(port);

// export the the app and server separately
module.exports = { app, server };
