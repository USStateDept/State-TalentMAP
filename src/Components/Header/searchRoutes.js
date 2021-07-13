import { LOGIN_REDIRECT, LOGIN_ROUTE, LOGOUT_ROUTE, TOKEN_VALIDATION } from '../../login/routes';

// routes to display the search bar by default
export const searchBarRoutes = ['/', '/results'];

// routes that contain their own search bar
export const searchBarRoutesForce = ['/results'];

// routes to always force hide the search bar
export const searchBarRoutesForceHidden = [
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  TOKEN_VALIDATION,
  LOGIN_REDIRECT,
];
