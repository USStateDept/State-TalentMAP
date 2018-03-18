const routesArray = [
  { path: '/login', componentName: 'Login', pageTitle: 'Login' },
  { path: '/', exact: true, componentName: 'Home', pageTitle: 'Home' },
  { path: '/profile', componentName: 'Profile', pageTitle: 'Your Profile' },
  { path: '/results', componentName: 'Results', pageTitle: 'Search Results' },
  { path: '/details/:id', componentName: 'Position', pageTitle: 'Position' },
  { path: '/compare/:ids', componentName: 'Compare', pageTitle: 'Compare' },
];

module.exports = routesArray;
