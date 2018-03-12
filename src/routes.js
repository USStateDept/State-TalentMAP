const routesArray = [
  { path: '/login', componentName: 'Login' },
  { path: '/', exact: true, componentName: 'Home' },
  { path: '/profile', componentName: 'Profile' },
  { path: '/results', componentName: 'Results' },
  { path: '/details/:id', componentName: 'Position' },
  { path: '/post/:id', componentName: 'Post' },
  { path: '/compare/:ids', componentName: 'Compare' },
];

module.exports = routesArray;
