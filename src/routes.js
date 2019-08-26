const routesArray = [
  { path: '/login', componentName: 'Login' },
  { path: '/', exact: true, componentName: 'Home', pageTitle: 'Home' },
  { path: '/results', componentName: 'Results', pageTitle: 'Search Results' },
  { path: '/profile', componentName: 'Profile', pageTitle: 'Profile' },
  { path: '/details/:id', componentName: 'Position', pageTitle: 'Position details' },
  { path: '/compare/:ids', key: 'compareID', componentName: 'Compare', pageTitle: 'Compare Positions' },
  { path: '/compare', key: 'compareNoID', componentName: 'Compare', pageTitle: 'Compare Positions' },
  { path: '/about', exact: true, componentName: 'About', pageTitle: 'About' },
  { path: '/tokenValidation', componentName: 'TokenValidation', pageTitle: 'Token Validation' },
  { path: '/loginRedirect', componentName: 'LoginRedirect', pageTitle: 'Login Redirect' },
];

module.exports = routesArray;
