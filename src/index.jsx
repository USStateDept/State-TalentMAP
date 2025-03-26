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
export const loadApp = (url, withCredentials, headers) => {
  axios
    .get(url, { withCredentials, headers })
    .then((response) => {
      sessionStorage.setItem('jwt', response.data);
      render();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('Error setting public jwt', error);
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
  const configUrl = `${window.location.protocol}//${window.location.host}/init.json`;

  // Set the environment based on the URL
  const env = determineEnv(configUrl);

  // Set devMode to true if the environment is localhost
  const localDevMode = configUrl.includes('localhost');

  // If running in devMode, set withCredentials to false, otherwise set it to true
  const withCredentials = !localDevMode;

  // fetch config.json to get some startup variables
  const initConfig = ((await axios.get(configUrl)).data);
  sessionStorage.setItem('apiUrl', initConfig.apiUrl);

  // fetch the feature flags
  const featureFlags = await getConfig(`${initConfig.apiUrl}/featureflags/`);

  // Initialize the request headers
  const headers = {
    Accept: 'application/json',
  };

  // If the environment is localhost, set the headers to include the tmusrname
  if (featureFlags.flags.persona_auth) headers.tmusrname = localStorage.getItem('tmusrname');

  // Set the config in sessionStorage so it can be used in the app.
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
        loadApp(featureFlags.hrAuthUrlPublic, withCredentials, headers);
      }
    });
  } else {
    // Load the app with the jwt
    loadApp(featureFlags.hrAuthUrl, withCredentials, headers);
  }
};

init();
