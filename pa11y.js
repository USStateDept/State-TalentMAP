// run node pa11y.js
// you can pass optional parameters
// --c : relative path to the config file
// --host : hostname where front-end web app is running
// --h --help : show help

// We want to output the results to console to visualize and save in circleci,
// so we can ignore no-console lint errors.
/* eslint no-console: 0 */

// pa11y and chalk aren't used in the front-end application,
// so we can ignore dependencies vs devDependencies lint errors.
/* eslint import/no-extraneous-dependencies: 0 */

const argv = require('yargs').argv;
const pa11y = require('pa11y');
const chalk = require('chalk');

// get around object spread not included in node v6
// eslint-disable-next-line
const _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// get arguments
const configRef = argv.c || './pa11y.json'; // the config file
const host = argv.host || 'localhost:3000'; // the host where the web app is running (defaults to localhost:3000)
const help = argv.h || argv.help; // show help
const debug = argv.d || argv.debug; // show debug

// show arguments passed and recognized
if (debug) {
  console.log(
    "Arguments passed:\n\tconfigRef: %s\n\thost: %s\n\thelp: %s\n\tdebug: %s",
    configRef, host, help, debug
  )
}

// show help and exit if -help is passed
if (help) {
  console.log(`
  Example: node pa11y.js --c ./pa11y.json --host localhost:3000
  Parameters take precendence over config file values.
  --host : hostname where front-end web app is running.
  --c : relative path to the config file.
  example config.json:
  {
      "defaults": {
          "wait": 7000,
          "standard": "WCAG2AA",
          "ignore": ["notice", "warning"]
          ...other pa11y options
      },
      "host": "http://localhost:3000",
      "token": {
        "name": "token",
        "value": "value"
      },
      "urls": [
          "/",
          "/login",
      ]
  }
  `);
  process.exit(1);
}

// get config file
const configFile = require(configRef); // eslint-disable-line import/no-dynamic-require


// set up the routes to check
let routes;
if (!configFile || !configFile.urls) {
  console.error(chalk.red('Need a valid config file with "urls" property'));
  process.exit(1);
} else {
  if (debug) {
    console.log('Config File found')
    console.log(configFile)
  }
  routes = configFile.urls;
}

// set our default local storage values
let localStorageConfig = {
  'token': '"someToken"',
  'compare': '["00003026","00003033"]'
};

if (configFile && configFile.localStorage && Object.keys(configFile.localStorage).length > 0) {
  localStorageConfig = configFile.localStorage;
  if (debug) {
    console.log("localStorageConfig:")
    console.log(localStorageConfig)
  }
}

// configure phantom's local storage
const staticConfig = {
  phantom: {
    parameters: {
      'local-storage-quota': 5000,
    },
  },
  beforeScript(page, options, next) {
    page.evaluate(() => {
      // clear any old local storage values from other tests
      window.localStorage.clear();
      // Apply the local storage config so that routes can pass auth checks
      Object.keys(localStorageConfig).forEach(function(key) {
        window.localStorage.setItem(localStorageConfig, localStorageConfig[key]);
      });
      if (debug) {
        console.log("Dump of window.localStorage:")
        console.log(window.localStorage)
      }
    });
    next();
  },
};

// combine objects
const pa11yConfig = _extends(staticConfig, configFile.defaults);
// set up pa11y and its config
const withLogin = pa11y(pa11yConfig);
// if (debug) {
//   console.log(withLogin)
// }
// watch for pa11y errors
let didError = false;

// to test our routes with login
const runWithLogin = (url, iterator) => {
  withLogin.run(url, (error, result) => {
    if (error) {
      console.error(error.message);
      didError = true;
    }
    if ( typeof result === 'undefined' || result === null ) {
      console.error("Result object is undefined or null");
      didError = true;
    }
    else if (result.length === 0) {
      console.log(chalk.green(`${url} passed!`));
    }
    else if (result.length > 0) {
      console.error(chalk.red(`${url} failed with ${result.length} errors`));
      console.error(result);
      didError = true;
    }
    if (iterator === routes.length) {
      if (didError) { process.exit(1); }
      process.exit(0);
    }
  });
};

// finally test our routes
routes.forEach((route, i) => {
  runWithLogin(`${host}${route}`, i);
});
