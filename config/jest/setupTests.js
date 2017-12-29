// Override console.warn() for invalid or failed propTypes by throwing an error
// when either is met, allowing us to be alerted of an proptype issues.
// Based on answer from https://stackoverflow.com/a/29654112/4584189
const error = console.error;
const errorWrapper = (message, ...args) => {
  if (/(Invalid prop|Failed prop)/.test(message)) {
    throw new Error(message, ...args);
  }
};

// set globally
global.console.error = errorWrapper;
