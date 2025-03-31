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
export const loadApp = (url, withCredentials) => {
  axios
    .get(url, { withCredentials, Accept: 'application/json' })
    .then((response) => {
      sessionStorage.setItem('jwt', response.data);
      render();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('Error setting public jwt', error);
      // Render the loading screen again if there is an error
      render();
    });
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

  // Set localDevMode to true if the environment is localhost
  const localDevMode = window.location.href.includes('localhost');

  // If running in localDevMode, set withCredentials to false
  const withCredentials = !localDevMode;

  // Kickoff login process
  if (localDevMode) {
    // eslint-disable-next-line no-console
    console.log('***** DEVELOPER MODE *****');

    // Get the devApiUrl from localStorage or use the default value
    // This is set in the Login.html file
    const devApiUrl = localStorage.getItem('devApiUrl') || 'http://localhost:8000/api/v1';
    // eslint-disable-next-line no-console
    console.log('Using devApiUrl:', devApiUrl);
    sessionStorage.setItem('apiUrl', devApiUrl);
  } else {
    // if not local dev use the server host url
    // Remove everything after /talentmap in the URL to get the base URL for the API
    // Sometimes you'll see /talentmap?tokenvalidation and we don't want
    // This will ensure that the API calls are made to the correct endpoint
    // So "some.hostname/talentmap?blah" will return the base URL as only"some.hostname/talentmap/"
    sessionStorage.setItem('apiUrl', `${window.location.href.split('/talentmap')[0]}/talentmap/api/api/v1`);
  }

  // Get the feature flags from the API
  const featureFlags = await getConfig(`${sessionStorage.getItem('apiUrl')}/featureflags/`);

  // Modify the feature flags as needed
  // If using localDevMode, set the baseURL to the apiUrl from sessionStorage
  if (localDevMode) {
    featureFlags.api_config.baseURL = sessionStorage.getItem('apiUrl') || '';
  }

  // Set the config in sessionStorage so it can be used in the app
  sessionStorage.setItem('config', JSON.stringify(featureFlags));

  // Render the loading screen
  renderLoading();

  // If the URL includes msappproxy, render the iframe and wait for a message from it.
  if (window.location.href.includes('msappproxy')) {
    // Render the iframe
    renderIFrame(env);

    // Listen for a message from the iframe
    window.addEventListener('message', (e) => {
      // type and body are the properties of the message
      const { type, body } = e.data;

      // if the message is a shakehand, get the jwt from the hrAuthUrlPublic
      if (type === 'shakehand' && body) {
        // Load the app with the jwt
        loadApp(featureFlags.hrAuthUrlPublic, withCredentials);
      }
    });
  } else {
    // Load the app with the jwt
    loadApp(featureFlags.hrAuthUrl, withCredentials);
  }
};

init();
