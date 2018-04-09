const routesArray = [
  { path: '/login', componentName: 'Login' },
  { path: '/', exact: true, componentName: 'Home', pageTitle: 'Home' },
  { path: '/profile', componentName: 'Profile', pageTitle: 'Profile' },
  { path: '/results', componentName: 'Results', pageTitle: 'Search Results' },
  { path: '/details/:id', componentName: 'Position', pageTitle: 'Position details' },
  { path: '/compare/:ids', componentName: 'Compare', pageTitle: 'Compare Positions' },
];

module.exports = routesArray;
