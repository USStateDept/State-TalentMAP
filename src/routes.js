const routesArray = [
  { path: '/', exact: true, componentName: 'Home' },
  { path: '/profile', componentName: 'Profile' },
  { path: '/results', componentName: 'Results' },
  { path: '/details/:id', componentName: 'Position' },
  { path: '/post/:id', componentName: 'Post' },
  { path: '/compare/:ids', componentName: 'Compare' },
  { path: '/tokenValidation', componentName: 'Login' },
];

module.exports = routesArray;
