import { matchPath } from 'react-router';
import queryString from 'query-string';

// use the matchPath function to compare router's location.pathname to a pathname to compare against
export function isCurrentPath(locationPathName, pathNameToCheck) {
  return matchPath(pathNameToCheck, {
    path: locationPathName,
    exact: true,
    strict: false,
  }) != null;
}

// pass two query strings to compare against other, using a specific paramToCheck
export function isCurrentParam(currentParams, comparisonParams, paramToCheck) {
  const currentParamObject = queryString.parse(currentParams);
  const comparisonParamObject = queryString.parse(comparisonParams);
  return (currentParamObject[paramToCheck] === comparisonParamObject[paramToCheck]);
}

export default isCurrentPath;
