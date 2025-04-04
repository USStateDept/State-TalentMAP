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
      ReactDOM.render(`jwt error: ${error}`, document.getElementById('root') || document.createElement('div'));
    });
  render();
};

// Fetch feature flags from the API
export const getFeatureFlags = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    ReactDOM.render(`config error: ${error}`, document.getElementById('root') || document.createElement('div'));
    return null;
  }
};

// Initialize the app
export const init = async () => {
  // Show the loading screen
  renderLoading();

  // Define feature flags path
  const featureFlagsPath = '/featureflags/';

  // Define session storage keys
  const sessionStorageKeys = {
    apiUrl: 'apiUrl',
    config: 'config',
    doLogin: 'doLogin',
  };

  // Determine the environment (e.g., localhost, production)
  const env = determineEnv(window.location.href);

  // Handle different environments and load the app accordingly
  switch (env) {
    case 'localhost': {
      // eslint-disable-next-line no-console
      console.log('***** Local development mode *****');

      if (sessionStorage.getItem(sessionStorageKeys.doLogin) === 'false') {
        // eslint-disable-next-line no-console
        console.log('Awaiting login from login.html ...');
        return;
      }

      // Get the API URL from sessionStorage
      const apiUrl = sessionStorage.getItem(sessionStorageKeys.apiUrl);
      sessionStorage.setItem(sessionStorageKeys.apiUrl, apiUrl);

      // Fetch feature flags
      const databaseFeatureFlags = await getFeatureFlags(`${apiUrl}${featureFlagsPath}`);

      // Initialize api_config object
      databaseFeatureFlags.api_config = {};

      // Set the baseURL to the API URL that way its not overwritten by the feature flag in development
      // This makes sure that the API URL is always set to the correct value from the sessionStorage
      databaseFeatureFlags.api_config.baseURL = apiUrl;

      // Set the Config in sessionStorage
      sessionStorage.setItem(sessionStorageKeys.config, JSON.stringify(databaseFeatureFlags));

      // Render the app
      render();
      break;
    }

    // Default case for production or other environments
    default: {
      // eslint-disable-next-line no-console
      const host = window.location.host;

      // Azure server api endpoint
      const serverApiPath = '/talentmap/api/api/v1';

      // Set the apiUrl string
      const apiUrl = `${host}/${env}/${serverApiPath}`;

      // Set the apiUrl in sessionStorage
      sessionStorage.setItem(sessionStorageKeys.apiUrl, apiUrl);

      // Fetch feature flags
      const databaseFeatureFlags = await getFeatureFlags(`${sessionStorage.getItem(sessionStorageKeys.apiUrl)}${featureFlagsPath}`);

      // Set the config in sessionStorage
      sessionStorage.setItem(sessionStorageKeys.config, JSON.stringify(databaseFeatureFlags));

      // Get the config from sessionStorage
      const config = JSON.parse(sessionStorage.getItem(sessionStorageKeys.config));

      // Handle msappproxy mode
      if (window.location.href.includes('msappproxy')) {
        renderIFrame(env);
        window.addEventListener('message', (e) => {
          const { type, body } = e.data;
          if (type === 'shakehand' && body) {
            loadApp(config.hrAuthUrlPublic);
          }
        });
        break;
      }

      // Load the app
      loadApp(config.hrAuthUrl);
      break;
    }
  }
};

// Start the app
init();
