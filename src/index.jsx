// Import polyfills for compatibility
import 'core-js/shim'; // Includes Stage 4 proposals
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

// Render the main app to the DOM
export const render = () => {
  ReactDOM.render(<App />, document.getElementById('root') || document.createElement('div'));
};

// Render the loading screen
export const renderLoading = () => {
  ReactDOM.render(<Splash />, document.getElementById('root') || document.createElement('div'));
};

// Render the iframe for msappproxy mode
export const renderIFrame = (env) => {
  ReactDOM.render(<HrOnlineIFrame env={env} />, document.getElementById('hronlineIframe') || document.createElement('div'));
};

// Load the app and retrieve JWT
export const loadApp = (url) => {
  axios
    .get(url, { withCredentials: true, Accept: 'application/json' })
    .then((response) => {
      sessionStorage.setItem('jwt', response.data);
    })
    .catch((error) => {
      ReactDOM.render(`ERROR: ${error}`, document.getElementById('root') || document.createElement('div'));
    });
  render();
};

// Fetch feature flags from the API
export const getFeatureFlags = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Initialize the app
export const init = async () => {
  // Determine the environment (e.g., localhost, production)
  const env = determineEnv(window.location.href);
  // eslint-disable-next-line no-console
  console.log('Environment:', env);

  // Define API paths and session storage keys
  const featureFlagsPath = '/featureflags/';
  const azureApiPath = '/talentmap/api/api/v1';
  const djangoApiPath = ':8000/api/v1';
  const sessionStorageKeys = {
    apiUrl: 'apiUrl',
    config: 'config',
    doLogin: 'doLogin',
  };

  // Show the loading screen
  renderLoading();

  // eslint-disable-next-line no-console
  console.log('Loading switch statments...');
  switch (env) {
    case 'localhost': {
      // eslint-disable-next-line no-console
      console.log('***** Local development mode *****');
      if (sessionStorage.getItem(sessionStorageKeys.doLogin) === 'false') {
        // eslint-disable-next-line no-console
        console.log('Awaiting login from login.html ...');
        return;
      }

      // Set API URL for local development
      const host = window.location.href.split(':')[0];
      const apiUrl = sessionStorage.getItem(sessionStorageKeys.apiUrl) || `${host}${djangoApiPath}`;
      sessionStorage.setItem(sessionStorageKeys.apiUrl, apiUrl);

      // Fetch and store feature flags
      const databaseFeatureFlags = await getFeatureFlags(`${apiUrl}${featureFlagsPath}`);
      databaseFeatureFlags.api_config = {};
      databaseFeatureFlags.api_config.baseURL = apiUrl;
      sessionStorage.setItem(sessionStorageKeys.config, JSON.stringify(databaseFeatureFlags));

      // Render the app
      render();
      break;
    }

    default: {
      // TODO: Remove comments
      console.log('***** Server Mode *****');

      // Set API URL for production
      // eslint-disable-next-line no-console
      const host = window.location.href.split('/talentmap')[0];

      // TODO: Remove comments
      console.log('Host:', host);

      sessionStorage.setItem(sessionStorageKeys.apiUrl, `${host}${azureApiPath}`);

      // TODO: Remove comments
      console.log('API URL:', sessionStorage.getItem(sessionStorageKeys.apiUrl));


      let loginUrl = sessionStorage.getItem(sessionStorageKeys.config).hrAuthUrl;
      // TODO: Remove comments
      console.log('Login URL:', loginUrl);

      // Fetch and store feature flags
      const databaseFeatureFlags = await getFeatureFlags(`${sessionStorage.getItem(sessionStorageKeys.apiUrl)}${featureFlagsPath}`);
      // TODO: Remove comments
      console.log('Feature Flags:', databaseFeatureFlags);

      sessionStorage.setItem(sessionStorageKeys.config, JSON.stringify(databaseFeatureFlags));

      // Handle msappproxy mode
      if (window.location.href.includes('msappproxy')) {
        renderIFrame(env);
        window.addEventListener('message', (e) => {
          const { type, body } = e.data;
          if (type === 'shakehand' && body) {
            loginUrl = sessionStorage.getItem(sessionStorageKeys.config).hrAuthUrlPublic;
          }
        });
      }

      // Load the app
      loadApp(loginUrl);
      break;
    }
  }
};

// Start the app
init();
