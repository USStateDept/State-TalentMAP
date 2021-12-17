const routesArray = [
  { path: '/login', componentName: 'Login' },
  { path: '/logout', componentName: 'Logout' },
  { path: '/', exact: true, componentName: 'Home', pageTitle: 'Home' },
  { path: '/results', componentName: 'Results', pageTitle: 'Search Results' },
  { path: '/profile', componentName: 'Profile', pageTitle: 'Profile' },
  { path: '/details/:id', componentName: 'Position', pageTitle: 'Position details' },
  { path: '/vacancy/:id', componentName: 'Position', pageTitle: 'Projected Vacancy details', props: { isProjectedVacancy: true } },
  { path: '/compare/:ids', key: 'compareID', componentName: 'Compare', pageTitle: 'Compare Positions' },
  { path: '/compare', key: 'compareNoID', componentName: 'Compare', pageTitle: 'Compare Positions' },
  { path: '/help', exact: true, componentName: 'About', pageTitle: 'About' },
  { path: '/tokenValidation', componentName: 'TokenValidation', pageTitle: 'Token Validation' },
  { path: '/loginRedirect', componentName: 'LoginRedirect', pageTitle: 'Login Redirect' },
  { path: '/biddingProcess', componentName: 'Faq', pageTitle: 'Bidding Process' },
];

module.exports = routesArray;
