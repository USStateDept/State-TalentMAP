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
  ReactDOM.render(<App />, document.getElementById('root') || document.createElement('div'));
};

// Show the loading screen while the app is loading
export const renderLoading = () => {
  ReactDOM.render(<Splash />, document.getElementById('root') || document.createElement('div'));
};

// Render the hronline iframe to the DOM
// This is used for the iframe that is loaded when the app is running in msappproxy mode
export const renderIFrame = (env) => {
  ReactDOM.render(<HrOnlineIFrame env={env} />, document.getElementById('hronlineIframe') || document.createElement('div'));
};

// Load the app using the url
export const loadApp = (url) => {
  axios
    .get(url, { withCredentials: true, Accept: 'application/json' })
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

// Get the feature flags from the database
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
  // Get the environment from the host
  const env = determineEnv(window.location.href);

  // Render the loading screen
  renderLoading();

  switch (env) {
    case 'localhost': {
      // **** DEVELOPMENT ONLY: CHANGE THIS TO THE API URL YOU WANT YOUR INSTANCE TO USE ****
      // eslint-disable-next-line no-console
      console.log('***** Local development mode *****');

      // Set the devApiUrl to the local API URL
      const devApiUrl = 'http://localhost:8000/api/v1';

      // Get the apiUrl from session or set it to the default value
      const apiUrl = sessionStorage.setItem('apiUrl', devApiUrl);

      // Get the feature flags from the database
      const databaseFeatureFlags = await getFeatureFlags(`${apiUrl}/featureflags/`);

      // Give the api_config a blank object to avoid errors
      databaseFeatureFlags.api_config = {};

      // Manually route the apiUrl for development
      databaseFeatureFlags.api_config.baseURL = apiUrl;

      // Set the config in sessionStorage so it can be used in the app.
      sessionStorage.setItem('config', JSON.stringify(databaseFeatureFlags));
      break;
    }

    default: {
      // if not local dev use the server host url
      // Remove everything after /talentmap in the URL to get the base URL for the API
      // Sometimes you'll see /talentmap?tokenvalidation and we don't want
      // This will ensure that the API calls are made to the correct endpoint
      // So 'some.hostname/talentmap?blah' will return the base URL as only'some.hostname/talentmap/'
      sessionStorage.setItem('apiUrl', `${window.location.href.split('/talentmap')[0]}/talentmap/api/api/v1`);

      // Get the feature flags from the database
      const databaseFeatureFlags = await getFeatureFlags(`${sessionStorage.getItem('apiUrl')}/featureflags/`);

      // Set the config in sessionStorage so it can be used in the app.
      sessionStorage.setItem('config', JSON.stringify(databaseFeatureFlags));
      break;
    }
  }

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
        loadApp(sessionStorage.getItem('config').hrAuthUrlPublic);
      }
    });
  } else { // If the URL does not include msappproxy, load the app normally.
    loadApp(sessionStorage.getItem('config').hrAuthUrl);
  }
};

init();
