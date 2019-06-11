import chalk from 'chalk';
import config from '../../public/config/config.json';

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

// needed for ScrollContext
global.scrollTo = jest.fn();

// Needed for Object.values, otherwise will receive
// "TypeError: Object.values is not a function"
Object.values = (obj) => Object.keys(obj).map(key => obj[key])

// Avoid jest error: "Error: Not implemented: navigation (except hash changes)"
global.window.location.assign = () => {};

// Stub URL.createObjectURL
global.window.URL.createObjectURL = () => {};

beforeEach(() => {
  // mock sessionStorage - feature flags config
  sessionStorage.setItem('config', JSON.stringify(config));

  // mock querySelector
  global.document.querySelector = () => ({ offsetParent: '50px', scrollIntoView: () => {} });
});
