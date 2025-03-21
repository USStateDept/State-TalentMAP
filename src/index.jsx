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
      console.log('jwt set in sessionStoreage');
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

  // Set the environment based on the URL
  const env = determineEnv(window.location.href);

  // Set devMode to true if the environment is localhost
  const localDevMode = env.includes('localhost');
  const dosdevMode = env.includes('dev');
  const testMode = env.includes('tst');

  // If running in devMode, set withCredentials to false, otherwise set it to true
  const withCredentials = !localDevMode;

  // fetch config.json to get some startup variables
  const initialConfig = ((await axios.get('/init.json')).data);
  sessionStorage.setItem('apiUrl', initialConfig.apiUrl);

  // eslint-disable-next-line no-console
  console.log('apiUrl set to:', initialConfig.apiUrl);

  // fetch the feature flags
  const config = await getConfig(`${initialConfig.apiUrl}/featureflags/`);

  // Set the api urls from the featureflags url
  const hrAuthUrl = config.hrAuthUrl;
  const hrAuthUrlPublic = config.hrAuthUrlPublic;

  // Initialize the request headers
  const headers = {
    Accept: 'application/json',
  };

  // If the environment is localhost, set the headers to include the tmusrname
  if (config.flags.persona_auth) headers.tmusrname = localStorage.getItem('tmusrname');

  // if the env is localhost set some flags to true
  if (localDevMode) {
    // eslint-disable-next-line no-console
    console.log('**** LOCAL DEVELOPMENT MODE ****');
  } else if (dosdevMode) {
    // eslint-disable-next-line no-console
    console.log('**** DOSDEV MODE ****');
  } else if (testMode) {
    // eslint-disable-next-line no-console
    console.log('**** TEST MODE ****');
  } else {
    // eslint-disable-next-line no-console
    console.log('**** PRODUCTION MODE ****');
  }

  // Set the config in sessionStorage so it can be used in the app.
  sessionStorage.setItem('config', JSON.stringify(config));

  // eslint-disable-next-line no-console
  if (localDevMode || dosdevMode || testMode) console.log(`Config stored in sessionStorage: ${JSON.stringify(config)}`);

  // Render the loading screen
  renderLoading();

  // If the URL includes msappproxy, render the iframe and wait for a message from it.
  if (window.location.href.includes('msappproxy')) {
    // eslint-disable-next-line no-console
    console.log('AUTHORIZING IN PROXY MODE');

    // Render the iframe
    renderIFrame(env);

    // Listen for a message from the iframe
    window.addEventListener('message', (e) => {
      // type and body are the properties of the message
      const { type, body } = e.data;

      // if the message is a shakehand, get the jwt from the hrAuthUrlPublic
      if (type === 'shakehand' && body) {
        // Load the app with the jwt
        loadApp(hrAuthUrlPublic, withCredentials, headers);
      }
    });
  } else {
    // eslint-disable-next-line no-console
    console.log('AUTHORIZING IN INTRANET MODE');

    // Load the app with the jwt
    loadApp(hrAuthUrl, withCredentials, headers);
  }
};

init();
