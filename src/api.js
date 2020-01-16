import axios from 'axios';
import memoize from 'memoize-one';
import { get, throttle } from 'lodash';
import Enum from 'enum';
import { setUserEmpId } from 'actions/userProfile';
import { fetchUserToken, hasValidToken, propOrDefault, redirectToLoginRedirect, fetchJWT } from 'utilities';
import { checkFlag } from 'flags';
import { logoutRequest } from './login/actions';

// Headers that can be set to denote a certain interceptor to be performed
export const INTERCEPTORS = new Enum({ PUT_PERDET: 'AXIOS_ONLY_PUT_PERDET' });

const interceptorCounts = {
  [INTERCEPTORS.PUT_PERDET.value]: 0,
};

// Make sure the user isn't spammed with redirects
const debouncedLogout = throttle(
  // eslint-disable-next-line global-require
  () => require('./store').store.dispatch(logoutRequest()),
  2000,
  { leading: true, trailing: false },
);

export const config = () => ({
  // use API_URL by default, but can be overriden from within api_config flag if exists
  baseURL: process.env.API_URL || 'http://localhost:8000/api/v1',
  ...(checkFlag('api_config') || {}),
});

// Called as a function so that sessionStorage can be set first
const api = (useInterceptor = true) => {
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

  // Call the /perdet_seq_num endpoint if the required header is there
  api$.interceptors.request.use((request) => {
    const header = INTERCEPTORS.PUT_PERDET.value;
    if (get(request, `headers.${header}`)) {
      // clone the request
      const request$ = { ...request };
      // delete the header as we don't want to send it to the server
      delete request$.headers[INTERCEPTORS.PUT_PERDET.value];
      // only perform the additional action if count === 0
      if (get(interceptorCounts, header, 0) === 0) {
        return setUserEmpId()
          .then(() => {
            // increment the counter
            interceptorCounts[header] += 1;
            return Promise.resolve(request$);
          })
          .catch(() => Promise.resolve(request$));
      }
      // otherwise return the request with the header removed
      return request$;
    }
    // otherwise return the original request
    return request;
  });

  if (useInterceptor) {
    api$.interceptors.response.use(response => response, (error) => {
      switch (propOrDefault(error, 'response.status')) {
        case 401: {
          // Due to timing of import store before history is created, importing store here causes
          // exports of api to be undefined. So this causes an error for `userProfile.js` when
          // attempting to login. Went with the eslint quick re-enable to get around this.
          debouncedLogout();
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
  }

  return api$;
};

// Memoized, since once sessionStorage is set, this won't change again
const memoizedApi = memoize(api);

export default memoizedApi;
