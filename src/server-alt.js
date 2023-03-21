const url = require('url');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const hostValidation = require('./host-validation');
const routesArray = require('./routes.js');
const { metadata, login, metadataPublic, loginPublic } = require('./saml2-config');

// middleware to override helmet.noCache
const removeCacheControl = (req, res, next) => {
  res.set({
    'Cache-Control': 'public',
  });
  res.removeHeader('Surrogate-Control');
  res.removeHeader('Pragma');
  res.removeHeader('Expires');
  next();
};
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
// allowed referers
const APPROVED_REFERERS = process.env.APPROVED_REFERERS;
// application port
const port = process.env.PORT || 3000;
// path to external about page
const ABOUT_PAGE = process.env.ABOUT_PAGE || 'https://github.com/18F/State-TalentMAP';

const app = express();
if (APPROVED_REFERERS) {
  // cast APPROVED_REFERERS to an array
  app.use(ROUTES, hostValidation({
    referers: [/^https:\/\/hrtst\.hr\.state\.sbu(?:\/[^]*)?$/, /^https:\/\/hrivv\.hr\.state\.sbu(?:\/[^]*)?$/, /^https:\/\/stsent\.state\.gov(?:\/[^]*)?$/, /^https:\/\/hronlinetest-usdos\.msappproxy\.net(?:\/[^]*)?$/, /^https:\/\/hronline-usdos\.msappproxy\.net(?:\/[^]*)?$/],
    fail: (req, res) => res.redirect(process.env.SSO_LOGOUT_URL),
  }));
}

// remove 'X-Powered-By' header
app.disable('x-powered-by');

// middleware for HTTP headers
app.use(helmet());
app.use(helmet.noCache());

// cache certain extensions (images and fonts)
app.use(PUBLIC_URL, (req, res, next) => {
  const urlObj = url.parse(req.originalUrl);
  const matches = urlObj.pathname.match(/\.(jpe?g|png|gif|svg|woff2)$/i);
  if (matches) {
    removeCacheControl(req, res, next);
  } else {
    next();
  }
});

// middleware for static assets
app.use(PUBLIC_URL, express.static(STATIC_PATH));
app.use(bodyParser.urlencoded({
  extended: true,
}));

// saml2 acs
app.post(PUBLIC_URL, (request, response) => {
  // acs(options, acsHandler);
  response.redirect(307, `${API_ROOT}api/v1/saml2/acs/${(request.headers['x-ms-proxy'] || '').includes('AzureAD') ? '?public=true' : ''}`);
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
  if ((request.headers['x-ms-proxy'] || '').includes('AzureAD')) {
    loginPublic(loginHandler);
  } else {
    login(loginHandler);
  }
});

app.get(`${PUBLIC_URL}logout`, (request, response) => {
  response.redirect('http://intranet.state.sbu/Pages/Home.aspx');
});

// saml2 metadata
app.get(`${PUBLIC_URL}metadata`, (request, response) => {
  response.type('application/xml');
  if (request.query.public) {
    response.send(metadataPublic);
  } else {
    response.send(metadata);
  }
});

app.get(`${PUBLIC_URL}obc/post/data/:id`, (request, response) => {
  const id = request.params.id;
  response.redirect(`${OBC_URL}/post/postdatadetails/${id}`);
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

app.get(`${PUBLIC_URL}about/more`, (request, response) => {
  response.redirect(`${ABOUT_PAGE}`);
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
