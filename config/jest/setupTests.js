import chalk from 'chalk';

// Override console.error() for invalid or failed propTypes by throwing an Error
// when either is met, allowing us to be alerted of and fail for any proptype issues.
// Based on answer from https://stackoverflow.com/a/29654112/4584189
const errorWrapper = (message) => {
  if (/(Invalid prop|Failed prop)/.test(message)) {
    throw new Error(message);
  }
  console.log(chalk.red(message));
};

// set globally
global.console.error = errorWrapper;
