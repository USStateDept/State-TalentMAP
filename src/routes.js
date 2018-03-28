const routesArray = [
  { path: '/login', componentName: 'Login' },
  { path: '/', exact: true, componentName: 'Home', pageTitle: 'Home' },
  { path: '/profile', componentName: 'Profile', pageTitle: 'Profile' },
  { path: '/results', componentName: 'Results', pageTitle: 'Search Results' },
  { path: '/details/:id', componentName: 'Position' },
  { path: '/compare/:ids', componentName: 'Compare', pageTitle: 'Compare Positions' },
  { path: '/tokenValidation', componentName: 'Login', pageTitle: 'Login' },
  { path: '/loginRedirect', componentName: 'LoginRedirect', pageTitle: 'Redirecting...' },
];

module.exports = routesArray;
