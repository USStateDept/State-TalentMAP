import { findIndex, findLastIndex, get, isEqual, last, startsWith } from 'lodash';

// map paths to readable link text
export function mapRoutesToNames(route) {
  const preText = 'Back to';
  // Special cases
  if (startsWith(route, '/details') || startsWith(route, '/vacancy')) {
    return `${preText} Position Details`;
  }
  if (startsWith(route, '/results')) {
    return `${preText} Search Results`;
  }
  // Use switch for others
  switch (route) {
    case '/':
      return `${preText} Home Page`;
    case '/profile':
      return `${preText} Profile`;
    case '/profile/dashboard':
      return `${preText} Dashboard`;
    case '/compare':
      return `${preText} Comparison`;
    case '/profile/bidtracker/':
      return `${preText} Bid Tracker`;
    default: // else, just return generic "Go back" text
      return 'Go back';
  }
}

// Get the full object for the most recently visited route, as well as the distance from
// the last unique page visited.
// routerLocations is the array of history objects, created by the routerLocations reducer
// location is the current location object, created by withRouter
// ignoreCurrentPath determines whether subsequent history pushes to the same path should be ignored
export function getLastRoute(routerLocations = [], location = {}, ignoreCurrentPath = false) {
  // no history, return false
  if (!routerLocations || routerLocations.length <= 1) {
    return false;
  }

  // Else, return the pathname...
  // by first getting the current route
  const currentRoute = location;

  // set up routerLocations$ to be used by ignoreCurrentPath branch if needed
  let routerLocations$ = [...routerLocations];

  // Ignore any history that matches the current route
  // This is good for the Compare page, where new history is written, but the user
  // is still on the same screen and wants to navigate to the last unique page they were on.
  // This only works for the path after the first slash (doesn't match nested paths).
  if (ignoreCurrentPath) {
    const currentBasePath = get(location, 'pathname', '').split('/')[1];
    routerLocations$ = routerLocations$.filter(f => f.pathname.split('/')[1] !== currentBasePath);
    const index = findIndex(routerLocations, a => isEqual(last(routerLocations$), a));
    const distance = routerLocations.length - index - 1;
    const lastLocation = last(routerLocations$);
    return { lastLocation, distance };
  }

  // Find out the first time the route was visited via its key.
  // The key prop is unique to an explicit navigation to a page.
  // In other words, navigating to a single page via 'Link's will return a new key,
  // but using back/forward won't affect the key
  const lastVisitedIndex = findLastIndex(routerLocations$, f => f.key === currentRoute.key);
  const previousRoute = routerLocations$[lastVisitedIndex - 1];
  // was there a previous route within this session?
  if (previousRoute && previousRoute.pathname) {
    // then use -1 to get the previous route
    return { lastLocation: routerLocations$[lastVisitedIndex - 1], distance: 1 };
  }
  // this must have been the page the user initially landed on
  return false;
}

// return just the name of that route, using the mapping
export function getLastRouteName(location) {
  if (location && location.pathname) { return mapRoutesToNames(location.pathname); }
  return false;
}

// return the full route, including the pathname and any search parameters
export function getLastRouteLink(routerLocations, location, ignoreCurrentPath) {
  const { lastLocation, distance } = getLastRoute(routerLocations, location, ignoreCurrentPath);
  const text = getLastRouteName(lastLocation);
  if (!text || !lastLocation) {
    return {};
  }
  const navigateTo = `${lastLocation.pathname}${lastLocation.search}`;
  return { text, link: navigateTo, distance };
}
