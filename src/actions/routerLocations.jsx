import React from 'react';
import { Link } from 'react-router-dom';

// map paths to readable link text
export function mapRoutesToNames(route) {
  const preText = 'Go back';
  switch (route) {
    case '/results':
      return `${preText} to search results`;
    case '/':
      return `${preText} to the home page`;
    case '/details':
      return `${preText} to position details`;
    case '/post':
      return `${preText} to post details`;
    default: // else, just return generic "Go back" text
      return preText;
  }
}

// get the full object for the most recently visited route
export function getLastRoute(routerLocations) {
  if (!routerLocations || routerLocations.length <= 1) {
    return false;
  }
  // else, return the pathname
  const lastLocation = routerLocations[routerLocations.length - 2];
  return lastLocation;
}

// return just the name of that route, using the mapping
export function getLastRouteName(routerLocations) {
  const path = getLastRoute(routerLocations).pathname;
  if (path) { return mapRoutesToNames(path); }
  return false;
}

// return the full route, including the pathname and any search parameters
export function getLastRouteLink(routerLocations) {
  const text = getLastRouteName(routerLocations);
  const lastLocation = getLastRoute(routerLocations);
  if (!text || !lastLocation) {
    return false;
  }
  const navigateTo = `${lastLocation.pathname}${lastLocation.search}`;
  return (<Link to={navigateTo}>{text}</Link>);
}
