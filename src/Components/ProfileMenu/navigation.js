import { matchPath } from 'react-router';

// use the matchPath function to compare router's location.pathname to a pathname to compare against
export function isCurrentPath(locationPathName, pathNameToCheck) {
  let active = false;
  active = matchPath(pathNameToCheck, {
    path: locationPathName,
    exact: true,
    strict: false,
  }) != null;
  return active;
}

export default isCurrentPath;
