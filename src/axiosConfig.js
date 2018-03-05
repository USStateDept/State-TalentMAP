import axios from 'axios';
import { LOGIN_REDIRECT } from './login/DefaultRoutes';
import { propOrDefault } from './utilities';

// Redirect to LOGIN_REDIRECT if token is stale
const setupAxiosInterceptor = () =>
axios.interceptors.response.use(response => response, (error) => {
  const serverMessage = propOrDefault(error, 'response.data.detail');
  if (serverMessage === 'Invalid token') {
    window.location.assign(LOGIN_REDIRECT);
  }
  return Promise.reject(error);
});

export default setupAxiosInterceptor;
