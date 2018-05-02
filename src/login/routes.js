// react routes
export const PRIVATE_ROOT = '/';
export const TOKEN_VALIDATION = '/tokenValidation';
export const LOGIN_REDIRECT = '/loginRedirect';

// Express routes. Users should never access these directly within React.
export const LOGIN_ROUTE = '/login';
export const LOGOUT_ROUTE = process.env.LOGIN_MODE === 'saml' ? '/logout' : '/login';
