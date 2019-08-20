import axios from 'axios';
import memoize from 'memoize-one';
import { fetchUserToken, hasValidToken, propOrDefault, redirectToLoginRedirect, fetchJWT } from './utilities';
import { logoutRequest } from './login/actions';
import { checkFlag } from './flags';

export const config = () => ({
  // use API_URL by default, but can be overriden from within api_config flag if exists
  baseURL: process.env.API_URL || 'http://localhost:8000/api/v1',
  ...(checkFlag('api_config') || {}),
});

// Called as a function so that sessionStorage can be set first
const api = () => {
  const api$ = axios.create(config());

  api$.interceptors.request.use((request) => {
    const requestWithAuth = request;
    if (hasValidToken()) {
      requestWithAuth.headers.Authorization = fetchUserToken();
    }

    return requestWithAuth;
  });

  // Add JWT
  api$.interceptors.request.use((request) => {
    const requestWithJwt = request;
    const jwt = fetchJWT();
    if (jwt) {
      requestWithJwt.headers.jwt = jwt;
    }

    return requestWithJwt;
  });

  api$.interceptors.response.use(response => response, (error) => {
    switch (propOrDefault(error, 'response.status')) {
      case 401: {
        // Due to timing of import store before history is created, importing store here causes
        // exports of api to be undefined. So this causes an error for `userProfile.js` when
        // attempting to login. Went with the eslint quick re-enable to get around this.
        /* eslint-disable global-require */
        require('./store').store.dispatch(logoutRequest());
        /* eslint-enable global-require */
        break;
      }

      default: {
        // We don't want to stop the pipeline even if there's a problem with the dispatch
        // and if there is, that should be resolved. This is just a placeholder until we
        // actually need a default case to satisfy eslint.
        const serverMessage = propOrDefault(error, 'response.data.detail');

        if (serverMessage === 'Invalid token') {
          redirectToLoginRedirect();
        }
      }
    }

    return Promise.reject(error);
  });

  return api$;
};

// Memoized, since once sessionStorage is set, this won't change again
const memoizedApi = memoize(api);

export default memoizedApi;
