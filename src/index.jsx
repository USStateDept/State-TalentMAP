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

export const render = () => {
  ReactDOM.render((
    <App />
  ), document.getElementById('root') || document.createElement('div'));
};

// Because the JWT request could be slow.
export const renderLoading = () => {
  ReactDOM.render((
    <Splash />
  ), document.getElementById('root') || document.createElement('div'));
};

export const renderIFrame = (env) => {
  ReactDOM.render((
    <HrOnlineIFrame env={env} />
  ), document.getElementById('hronlineIframe') || document.createElement('div'));
};

export const loadApp = (url, withCredentials, headers) => {
  axios
    .get(url, { withCredentials, headers })
    .then((response) => {
      sessionStorage.setItem('jwt', response.data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('Error setting public jwt', error);
    }).then(render());
};

// retrieve static config file, pass to app init
export const start = async () => {
  // remove config from sessionStorage to avoid stale data
  sessionStorage.removeItem('config');

  // Set the environment based on the URL
  const env = determineEnv(window.location.href);

  // Set devMode to true if the environment is localhost
  const devMode = env === 'localhost';

  // Set proxyMode to true if the URL includes msappproxy
  const proxyMode = window.location.href.includes('msappproxy');

  // If running in devMode, set withCredentials to false, otherwise set it to true
  const withCredentials = !devMode;

  // fetch config.json to get some startup variables
  const config = ((await axios.get('/config/config.json')).data);

  // Set the api urls from the config file
  const hrAuthUrl = config.hrAuthUrl;
  const hrAuthPublicUrl = config.hrAuthPublicUrl;

  // Initialize the request headers
  const headers = {
    Accept: 'application/json',
  };

  // if the env is localhost set some flags to true
  if (devMode) {
    // eslint-disable-next-line no-console
    console.log('**** DEVELOPMENT MODE ****');
    config.flags.persona_auth = true;
    config.flags.settings = true;
    headers.tmusrname = localStorage.getItem('tmusrname');
  }

  // Render the loading screen
  renderLoading();

  // If the URL includes msappproxy, render the iframe and wait for a message from it.
  if (proxyMode) {
    // eslint-disable-next-line no-console
    console.log('AUTHORIZING IN PROXY MODE');

    // Render the iframe
    renderIFrame(env);

    // Listen for a message from the iframe
    window.addEventListener('message', (e) => {
      // type and body are the properties of the message
      const { type, body } = e.data;

      // if the message is a shakehand, get the jwt from the hrAuthPublicUrl
      if (type === 'shakehand' && body) {
        // Load the app with the jwt
        loadApp(hrAuthPublicUrl, withCredentials, headers);
      }
    });
  } else {
    // eslint-disable-next-line no-console
    console.log('AUTHORIZING IN INTRANET MODE');

    // Load the app with the jwt
    loadApp(hrAuthUrl, withCredentials, headers);
  }

  // Set the config in sessionStorage so it can be used in the app.
  sessionStorage.setItem('config', JSON.stringify(config));
};

start();
