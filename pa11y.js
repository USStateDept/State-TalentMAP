// run node pa11y.js

const pa11y = require('pa11y');
const chalk = require('chalk');

const host = 'localhost:3000';

const routes = [
  '/',
  '/login',
  '/results',
  '/details/55360000',
  '/post/100',
  '/compare/55360000,56001700',
];

const withLogin = pa11y({
  phantom: {
    parameters: {
      'local-storage-quota': 5000,
    },
  },
  ignore: ['notice', 'warning'],
  wait: '2000',
  beforeScript(page, options, next) {
    page.evaluate(() => {
      window.localStorage.clear();
      window.localStorage.setItem('token', '"someToken"');
    });
    next();
  },
});

let didError = false;

const runWithLogin = (url, iterator) => {
  withLogin.run(url, (error, result) => {
    if (error) {
      console.error(error.message);
      didError = true;
    }
    if (result.length === 0) {
      console.log(chalk.green(`${url} passed!`));
    }
    if (result.length > 0) {
      console.error(chalk.red(`${url} failed with ${result.length} errors`), JSON.stringify(result));
      didError = true;
    }
    if (iterator === routes.length) {
      if (didError) { process.exit(1); }
      process.exit(0);
    }
  });
};

routes.forEach((route, i) => {
  runWithLogin(`${host}${route}`, i);
});
