import axios from 'axios';
import { propOrDefault, redirectToLoginRedirect } from './utilities';

// Redirect to LOGIN_REDIRECT if token is stale
const setupAxiosInterceptor = () =>
axios.interceptors.response.use(response => response, (error) => {
  const serverMessage = propOrDefault(error, 'response.data.detail');
  if (serverMessage === 'Invalid token') {
    redirectToLoginRedirect();
  }
  return Promise.reject(error);
});

export default setupAxiosInterceptor;
