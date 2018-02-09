import { matchPath } from 'react-router';
import queryString from 'query-string';
import { propOrDefault } from '../../utilities';

// use the matchPath function to compare router's location.pathname to a pathname to compare against
export function isCurrentPath(locationPathName, pathNameToCheck) {
  return matchPath(pathNameToCheck, {
    path: locationPathName,
    exact: true,
    strict: false,
  }) != null;
}

// use the matchPath function to compare router's location.pathname to a pathname to compare against
export function isCurrentPathIn(locationPathName, pathNamesToCheck) {
  let value = null;
  pathNamesToCheck.forEach((pathname) => {
    if (matchPath(pathname, {
      path: locationPathName,
      exact: true,
      strict: false,
    })) {
      value = true;
    }
  });
  return value;
}

// pass two query strings to compare against other, using a specific paramToCheck
export function isCurrentParam(currentParams, comparisonParams, paramToCheck) {
  const currentParamObject = queryString.parse(currentParams);
  const comparisonParamObject = queryString.parse(comparisonParams);
  return (currentParamObject[paramToCheck] === comparisonParamObject[paramToCheck]);
}

// check if any of the children match the current path
export function checkIfChildrenMatchPath(children, pathname) {
  let found = false;
  // Children should be an array. Otherwise return the default value of found.
  if (children && Array.isArray(children)) {
    children.forEach((c) => {
      if (propOrDefault(c, 'props.link') &&
        isCurrentPath(pathname, c.props.link)) {
        found = true;
      }
    });
  }
  return found;
}

export default isCurrentPath;
