import { matchPath } from 'react-router';

// use the matchPath function to compare router's location.pathname to a pathname to compare against
export function isCurrentPath(locationPathName, pathNameToCheck) {
  return matchPath(pathNameToCheck, {
    path: locationPathName,
    exact: true,
    strict: false,
  }) != null;
}

export default isCurrentPath;
