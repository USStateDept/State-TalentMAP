// important: babel-polyfill needs to be first to avoid any errors in IE11
import 'core-js/shim'; // included < Stage 4 proposals
import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './sass/styles.scss';
import App from './Components/App/App';
import Splash from './Components/Splash';
import HrOnlineIFrame from './Components/HrOnlineIFrame';
import { determineEnv } from './utilities';

import '../node_modules/uswds/dist/js/uswds.min';
import './polyfills';

// Render the app to the DOM
export const render = () => {
  ReactDOM.render((
    <App />
  ), document.getElementById('root') || document.createElement('div'));
};

// Show the loading screen while the app is loading
export const renderLoading = () => {
  ReactDOM.render((
    <Splash />
  ), document.getElementById('root') || document.createElement('div'));
};

// Render the iframe
export const renderIFrame = (env) => {
  ReactDOM.render((
    <HrOnlineIFrame env={env} />
  ), document.getElementById('hronlineIframe') || document.createElement('div'));
};

// Load the app using the url, withCredentials, and headers
export const loadApp = (featureFlags, proxyMode, devMode) => {
  // Set the config in sessionStorage so it can be used in the app.
  sessionStorage.setItem('config', JSON.stringify(featureFlags));

  // Set the url to the hrAuthUrlPublic if the proxyMode is true
  const url = proxyMode ? featureFlags.hrAuthUrlPublic : featureFlags.hrAuthUrl;

  // Set the jwt in sessionStorage so it can be used in the app.
  axios
    .get(url, { withCredentials: !devMode, Accept: 'application/json' })
    .then((response) => {
      sessionStorage.setItem('jwt', response.data);
      // eslint-disable-next-line no-console
      console.log('JWT retrieved...');
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('Error setting public jwt', error);
    });
  render();
};

export const getConfig = async (featureFlagsUrl) => {
  try {
    const response = await axios.get(featureFlagsUrl);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Initialize the app
export const init = async () => {
  // remove config from sessionStorage to avoid stale data
  sessionStorage.removeItem('apiUrl');
  sessionStorage.removeItem('config');

  // Get the environment from the host
  const env = determineEnv(window.location.href);

  // Render the loading screen
  renderLoading();

  // The feature flags will be used to determine the apiUrl and hrAuthUrl
  let featureFlags;
  let devMode = false; // default to false

  // If the URL includes dev, set the devMode to true
  switch (env) {
    case 'localhost': // **** DEVELOPMENT ONLY: CHANGE THIS TO THE API URL YOU WANT YOUR INSTANCE TO USE ****
      // eslint-disable-next-line no-console
      console.log('***** Local development mode *****');
      devMode = true; // set the devMode to true

      // Get the apiUrl from localStorage, this is set in the login.html page
      sessionStorage.setItem('apiUrl', localStorage.getItem('devApiUrl'));

      // Custom handler for the feature flags from the database -------------------------------------
      // Modify the apiUrl to point to the manually set url set in the login.html page
      featureFlags = await getConfig(`${sessionStorage.getItem('apiUrl')}/featureflags/`);

      // Give the api_config a blank object to avoid errors
      featureFlags.api_config = {};

      // Manually route the apiUrl to the api config so we can use it switch in for development
      featureFlags.api_config.baseURL = sessionStorage.getItem('apiUrl');

      break;

    default:
      // if not local dev use the server host url
      // Remove everything after /talentmap in the URL to get the base URL for the API
      // Sometimes you'll see /talentmap?tokenvalidation and we don't want
      // This will ensure that the API calls are made to the correct endpoint
      // So "some.hostname/talentmap?blah" will return the base URL as only"some.hostname/talentmap/"
      sessionStorage.setItem('apiUrl', `${window.location.href.split('/talentmap')[0]}/talentmap/api/api/v1`);

      // Set the apiUrl from the sessionStorage
      featureFlags = await getConfig(`${sessionStorage.getItem('apiUrl')}/featureflags/`);

      break;
  }


  // Initialize the app in non-proxy mode
  let proxyMode = false; // default to false

  // If the URL includes msappproxy, render the iframe and wait for a message from it.
  if (window.location.href.includes('msappproxy')) {
    // Render the ifram
    renderIFrame(env);

    // Listen for a message from the iframe
    window.addEventListener('message', (e) => {
      // type and body are the properties of the message
      const { type, body } = e.data;

      // if the message is a shakehand
      if (type === 'shakehand' && body) {
        // Set the loginUrl to use the hrAuthUrlPublic
        proxyMode = true;
      }
    });
  }

  loadApp(
    featureFlags,
    proxyMode,
    devMode,
  );
};

init();
