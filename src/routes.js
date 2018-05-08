const routesArray = [
  { path: '/login', exact: true, componentName: 'Login' },
  { path: '/', exact: true, componentName: 'Home', pageTitle: 'Home' },
  { path: '/results', componentName: 'Results', pageTitle: 'Search Results' },
  { path: '/profile', componentName: 'Profile', pageTitle: 'Profile' },
  { path: '/details/:id', componentName: 'Position', pageTitle: 'Position details' },
  { path: '/compare/:ids', componentName: 'Compare', pageTitle: 'Compare Positions' },
  { path: '/about', exact: true, componentName: 'About', pageTitle: 'About' },
  { path: '/tokenValidation', componentName: 'Login', pageTitle: 'Token Validation' },
  { path: '/loginRedirect', exact: true, componentName: 'LoginRedirect', pageTitle: 'Login Redirect' },
];

module.exports = routesArray;
