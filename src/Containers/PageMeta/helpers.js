import { matchPath } from 'react-router';

// Ensure the best route is matched, since multiple could match.
// We can do this by taking the matched path with the longest path length.
// For example, '/profile/dashboard/' might match '/', '/profile', and '/profile/dashboard',
// therefore, we can be sure that the one with the longest length is the best match.
// Takes an array of routes and a history object.
const getBestMatchPath = (routes, historyObject) => {
  // set initial object with properties we will check against
  let result = { path: '', pageTitle: '' };

  routes.forEach((route) => {
    const matched = matchPath(historyObject.pathname, { path: route.path, exact: false });
    // if the route matches, has a page title, and it's path is longer than the current value,
    // then set result to that object.
    if (matched && route.pageTitle && matched.path.length > result.path.length) {
      result = Object.assign({}, matched, route);
    }
  });

  return result;
};

export default getBestMatchPath;
