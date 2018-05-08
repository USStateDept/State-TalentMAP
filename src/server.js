const express = require('express');
const bodyParser = require('body-parser');
const bunyan = require('bunyan');
const helmet = require('helmet');
const path = require('path');
const proxy = require('http-proxy-middleware');
const routesArray = require('./routes.js');

const { metadata, login } = require('./saml2-config');

/**
 * ~ Settings Cache ~
 * This is mainly to prevent the need to include the query parameter on every request.
 * Setting will always update when it is changed according to priority
 * (left is higher priority with right being fallback priority):
 *   Environment Variable -> Query Parameter
 */
const cache = {
  LOGIN_MODE: null, // Only works in DEVELOPMENT
  DEBUG: null,
  WEBPACK: false,
  TEST: false,
};

/**
 * ~ Utilities ~
 * Wrapped in closures for changing modes on the fly (without restarting) via:
 * QueryParams (Dev only) - Matches environment variable in camel-case form )
 * Environment (All environments)
 */
// /development|test/).test(process.env.NODE_ENV
const isDev = () => (process.env.NODE_ENV === 'development');
const isProd = () => (process.env.NODE_ENV === 'production');
// Enables logging middleware
const isDebug = (request) => {
  const debug = cache.DEBUG || process.env.DEBUG || request.query.debug || false;

  if (isDev() && cache.DEBUG !== debug && !cache.TEST) {
    // eslint-disable-next-line no-console
    console.log(`DEBUG => ${debug}`);
  }

  // Cache DEBUG setting
  cache.DEBUG = debug;

  return debug;
};

const isSAML = (request) => {
  const mode = cache.LOGIN_MODE || process.env.LOGIN_MODE || request.query.loginMode || 'password';

  if (isDev() || cache.TEST) {
    if (cache.LOGIN_MODE !== mode && !cache.TEST) {
      // eslint-disable-next-line no-console
      console.log(`LOGIN_MODE => ${mode}`);
    }

    cache.LOGIN_MODE = mode;
    return (mode !== 'password');
  }

  return true;
};

const getEnv = (key = null) => {
  const fallbacks = {
    PORT: 3000,                                     // application port
    STATIC_PATH: path.join(__dirname, '../build'),
    API_ROOT: 'http://localhost:8000',              // define the API root url
    PUBLIC_URL: '/talentmap/',
    ABOUT_PAGE: 'https://github.com/18F/State-TalentMAP',
  };

  const fallback = fallbacks[key] || null;

  if (isDev() && key === 'PUBLIC_URL') {
    process.env[key] = '/';
  }

  return (process.env[key] || fallback);
};

const useSAMLMock = () => (isDev() && isSAML()) || isProd();
const getSAMLRoute = (type = 'login') => {
  let route = null;

  switch (type) {
    // Define the SAML login redirect
    case 'login':
      route = useSAMLMock() ?
        `${getEnv('PUBLIC_URL')}login.html` :
        `${getEnv('API_ROOT')}/saml2/acs/`;

      break;
    // Define the SAML logout redirect
    case 'logout':
      route = useSAMLMock() ?
        `${getEnv('PUBLIC_URL')}login.html` :
        `${getEnv('API_ROOT')}/saml2/logout/`;
      break;
    // Default case
    default:
      break;
  }

  return route;
};

/**
 * ~ TalentMAP Middleware ~
 * Entry Points:
 *   => scripts/server.js
 *   => config/webpackDevServer.config.js
 */
const TalentMAPMiddleware = (app, compiler = null) => {
  cache.WEBPACK = !!compiler;
  cache.TEST = (process.env.NODE_ENV === 'test');

  // Routes from React, with wildcard added to the end if the route is not exact
  const ROUTES = routesArray
    .map(route => `${getEnv('PUBLIC_URL')}${route.path}${route.exact ? '' : '*'}`
    .replace('//', '/'));

  // define full path to static build
  const STATIC_PATH = getEnv('STATIC_PATH');
  // define the prefix for the application
  const PUBLIC_URL = getEnv('PUBLIC_URL');
  // define the OBC root url
  // example: https://www.obcurl.gov
  const OBC_URL = getEnv('OBC_URL');
  // path to external about page
  const ABOUT_PAGE = getEnv('ABOUT_PAGE');

  /**
   * API Proxy
   */
  const apiProxy = proxy({
    target: getEnv('API_ROOT'),
    changeOrigin: true,
    logLevel: getEnv('DEBUG') ? 'debug' : 'silent',
    protocolRewrite: true,
    router: {
      'http://localhost:3000': 'http://localhost:8000',
    },
  });

  app.use(`${PUBLIC_URL}api`, apiProxy);

  /**
   * Body Parser
   */
  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  /**
   * Remove X-Powered-By
   */
  app.disable('x-powered-by');

  /**
   * HTTP Headers
   */
  app.use(helmet());
  app.use(helmet.noCache());

  /**
   * Static Assets
   */
  if (!cache.WEBPACK) {
    app.use(PUBLIC_URL, express.static(STATIC_PATH));
  }

  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  /**
   * Logger
   */
  const logger = bunyan.createLogger({ name: 'TalentMAP' });
  const loggingMiddleware = (request, response, next) => {
    const log = {
      method: request.method,
      headers: request.headers,
      url: request.url,
      query: request.query,
    };

    response.on('error', () => {
      if (isDebug(request)) {
        logger.error(log);
      }
    });

    response.on('finish', () => {
      if (isDebug(request)) {
        logger.info(log);
      }
    });

    next();
  };

  app.use(loggingMiddleware);

  /**
   * SAML
   */
  // ACS
  app.post(PUBLIC_URL, (request, response, next) => {
    if (isSAML(request)) {
      response.redirect(307, getSAMLRoute('login'));
    } else {
      next();
    }
  });

  // Login
  app.get(`${PUBLIC_URL}login`, (request, response, next) => {
    // create handler
    // eslint-disable-next-line no-unused-vars
    const loginHandler = (err, loginUrl, requestId) => {
      if (err) {
        response.sendStatus(500);
      } else {
        response.redirect(loginUrl);
      }
    };

    if (isSAML(request)) {
      if (isProd()) {
        login(loginHandler);
      } else {
        const filename = path.resolve('./public/login.html');
        response.sendFile(filename);
      }
    } else {
      next();
    }
  });

  // Logout
  app.get(`${PUBLIC_URL}logout`, (request, response, next) => {
    if (isSAML(request)) {
      if (isProd()) {
        response.sendFile(getSAMLRoute('logout'));
      } else {
        response.redirect(`${getEnv('PUBLIC_URL')}login`);
      }
    } else {
      next();
    }
  });

  // saml2 metadata
  app.get(`${PUBLIC_URL}metadata`, (request, response) => {
    response.type('application/xml');
    response.send(metadata);
  });

  /**
   * OBC Routes
   */
  // redirect - post data detail
  // endpoint for post-specific data points
  app.get(`${PUBLIC_URL}obc/post/data/:id`, (request, response) => {
    // set the id passed in the route and pass it to the redirect
    const id = request.params.id;
    response.redirect(`${OBC_URL}/post/postdatadetails/${id}`);
  });

  // redirect - posts
  // endpoint for post, ie landing page
  app.get(`${PUBLIC_URL}obc/post/:id`, (request, response) => {
    // set the id passed in the route and pass it to the redirect
    const id = request.params.id;
    response.redirect(`${OBC_URL}/post/detail/${id}`);
  });

  // redirect - countries
  // endpoint for country, ie landing page
  app.get(`${PUBLIC_URL}obc/country/:id`, (request, response) => {
    // set the id passed in the route and pass it to the redirect
    const id = request.params.id;
    response.redirect(`${OBC_URL}/country/detail/${id}`);
  });

  /**
   * About Routes
   */
  app.get(`${PUBLIC_URL}about/more`, (request, response) => {
    response.redirect(`${ABOUT_PAGE}`);
  });

  /**
   * Main Routes
   */
  if (!cache.WEBPACK) {
    if (!cache.TEST) {
      app.get(ROUTES, (request, response) => {
        response.sendFile(path.resolve(STATIC_PATH, 'index.html'));
      });

      // this is our wildcard, 404 route
      app.get('*', (request, response) => {
        response.sendStatus(404).end();
      });
    }/* else {
      app.use('/talentmap', (request, response) => {
        const filename = path.resolve('./public/index.html');
        response.sendFile(filename);
        response.sendStatus(200);
      });
    } */
  }

  return app;
};

TalentMAPMiddleware.getEnv = getEnv;

module.exports = TalentMAPMiddleware;
