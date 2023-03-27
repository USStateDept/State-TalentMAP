import 'core-js/shim'; // included < Stage 4 proposals
import 'regenerator-runtime/runtime';
import chalk from 'chalk';
import { JSDOM } from 'jsdom';
Object.entries = require('object.entries'); // because jest doesn't import babel
import config from '../../public/config/config.json';
import { configure as configureEnzyme } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configureEnzyme({
  adapter: new Adapter(),
  // Our tests were originally created using enzyme 2, which expected lifecycle methods
  // to be disabled - https://airbnb.io/enzyme/docs/guides/migration-from-2-to-3.html#lifecycle-methods
  disableLifecycleMethods: true
});

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

// Stub msSaveBlob
global.window.navigator.msSaveBlob = () => {};

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
}

// Set initial mockShortIdValue value.
// This variable must be prefixed with "mock".
let mockShortIdValue = 0;

jest.mock('shortid', () => {
  return {
    generate: jest.fn(() => {
      mockShortIdValue += 1;
      return mockShortIdValue;
    })
  };
});

// Mock imagediff
jest.mock('imagediff', () => ({ default: jest.fn() }))

const dom = new JSDOM();

global.document = dom.window.document
global.window = dom.window

beforeEach(() => {
  // reset to 0 before each test
  mockShortIdValue = 0;

  // mock sessionStorage - feature flags config
  sessionStorage.setItem('config', JSON.stringify(config));

  // mock querySelector
  global.document.querySelector = () => ({ offsetParent: '50px', scrollIntoView: () => {} });

  global.document.body.appendChild = () => {};

  global.window.navigator.msSaveOrOpenBlob = () => {};
});

// Mock jsoneditor-react
jest.mock('jsoneditor-react', () => ({ JsonEditor: jest.fn() }))

// fix memory leak - https://github.com/facebook/jest/issues/7874
afterAll(() => {
  // global.gc && global.gc();
})
