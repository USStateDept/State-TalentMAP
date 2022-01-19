import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import localforage from 'localforage';
import memoize from 'memoize-one';
import { get, throttle } from 'lodash';
import Enum from 'enum';
import bowser from 'bowser';
import { hoursToMilliseconds } from 'date-fns-v2';
import { setUserEmpId } from 'actions/userProfile';
import { toastWarning } from 'actions/toast';
import { fetchJWT, fetchUserToken, hasValidToken, isOnProxy, propOrDefault, redirectToLoginRedirect } from 'utilities';
import { checkFlag } from 'flags';
import { staticFilters } from './reducers/filters/filters';
import { logoutRequest } from './login/actions';

const version = process.env.VERSION;

// Headers that can be set to denote a certain interceptor to be performed
export const INTERCEPTORS = new Enum({ PUT_PERDET: 'AXIOS_ONLY_PUT_PERDET' });

const interceptorCounts = {
  [INTERCEPTORS.PUT_PERDET.value]: 0,
};

const browser = bowser.getParser(window.navigator.userAgent);
const isIE = browser.satisfies({ 'internet explorer': '<=11' });

let sessionExpired = false;
let hasShownAlert = false;
setTimeout(() => {
  sessionExpired = true;
}, hoursToMilliseconds(1));

// Make sure the user isn't spammed with redirects
const debouncedLogout = throttle(
  // eslint-disable-next-line global-require
  () => require('./store').store.dispatch(logoutRequest()),
  2000,
  { leading: true, trailing: false },
);

// eslint-disable-next-line no-unused-vars
const debouncedNetworkAlert = throttle(
  // eslint-disable-next-line global-require
  () => require('./store').store.dispatch(toastWarning(
    "We're having trouble reaching our servers. Some information on TalentMAP may not display correctly.",
    'Server Error',
    'network-error',
    true,
    { position: 'bottom-center', autoClose: 6500 },
  )),
  10000,
  { leading: true, trailing: false },
);

// eslint-disable-next-line no-unused-vars
const debouncedExpiredSessionAlert = throttle(
  // eslint-disable-next-line global-require
  () => require('./store').store.dispatch(toastWarning(
    'Your Go Browser session may have expired. Try refreshing the page if you are encountering issues.',
    'Network Session',
    'network-error',
    true,
    { position: 'bottom-center', autoClose: false },
  )),
  10000,
  { leading: true, trailing: false },
);

// Request paths that we want cached. In case they fail, an older response can be used.
const pathsToCache = [
  ...staticFilters.filters.filter(f => f.item.tryCache).map(m => m.item.endpoint)
    .filter(f => f),
  // could add other paths here...
];

// Create localforage instance
const localforageStore = localforage.createInstance({
  // List of drivers used. Use IndexedDB.
  driver: [
    localforage.INDEXEDDB,
  ],
  // Prefix all storage keys to prevent conflicts.
  // Base this on the app version to prevent data structure conflicts.
  name: `talentmap-api-cache-${version}`,
});

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 1,
  store: localforageStore,
  readOnError: (error) => {
    const err = get(error, 'response.status');
    if (err === 401) { // ingore 401s (unauthenticated)
      return false;
    }
    return true;
  },
  // Deactivate `clearOnStale` option so that we can actually read stale cache data
  clearOnStale: false,
  // {Boolean} Clear all cache when a cache write error occurs
  // (prevents size quota problems in `localStorage`).
  clearOnError: true,
  exclude: {
    // {Boolean} Exclude requests with query parameters.
    query: false,
    // {Function} Method which returns a `Boolean` to determine if request
    // should be excluded from cache.
    filter: (r) => {
      const paths$ = pathsToCache || [];
      const url = get(r, 'url');
      const includesValue = paths$.some(value => url.indexOf(value) !== -1);
      if (includesValue) {
        return false;
      }
      return true;
    },
  },
});

export const config = () => ({
  // use API_URL by default, but can be overriden from within api_config flag if exists
  baseURL: process.env.API_URL || 'http://localhost:8000/api/v1',
  adapter: !isIE ? cache.adapter : undefined, // axios-cache-adapter does not work in IE11
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

  api$.interceptors.response.use(response => response, (error) => {
    // We want to perform this on 302 to Microsoft, but CORS blocks visibility from axios,
    // so this is the closest we can get to capturing the session expiring.
    // https://github.com/axios/axios/issues/838#issuecomment-304033403
    if (typeof error.response === 'undefined' && isOnProxy() && sessionExpired && !hasShownAlert) {
      debouncedExpiredSessionAlert();
      hasShownAlert = true;
    }

    switch (propOrDefault(error, 'response.status')) {
      case 401: {
      // Due to timing of import store before history is created, importing store here causes
      // exports of api to be undefined. So this causes an error for `userProfile.js` when
      // attempting to login. Went with the eslint quick re-enable to get around this.
        debouncedLogout();
        break;
      }

      /* case 500: {
        debouncedNetworkAlert();
        break;
      } */

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
