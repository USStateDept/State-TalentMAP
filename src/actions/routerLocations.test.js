import { last } from 'lodash';
import * as actions from './routerLocations';
import routerLocations from '../__mocks__/routerLocations';

describe('routerLocations', () => {
  it('maps routes to names', () => {
    ['/results', '/', '/details', 'fakeroute', '/profile', '/compare', '/profile/bidtracker/', '/profile/dashboard'].map(route => (
      expect(actions.mapRoutesToNames(route)).toBeDefined()
    ));
  });

  it('returns the last route', () => {
    expect(actions.getLastRoute(routerLocations, last(routerLocations)).lastLocation)
      .toBe(routerLocations[routerLocations.length - 2]);
  });

  it('does not return a route if there is no history', () => {
    expect(actions.getLastRoute([], last(routerLocations))).toBe(false);
  });

  it('returns false if there is only one item in history', () => {
    expect(actions.getLastRoute(
      [routerLocations[0]], last(routerLocations)))
      .toBe(false);
  });

  it('returns false for arrays that do not have pathname', () => {
    expect(actions.getLastRoute([1, 2, 3, 4], last(routerLocations))).toBe(false);
  });

  it('returns the link object for the last route', () => {
    expect(actions.getLastRouteLink(routerLocations, last(routerLocations)).link).toBeDefined();
    expect(actions.getLastRouteLink(routerLocations, last(routerLocations)).text).toBeDefined();
  });

  it('returns the last route name', () => {
    expect(actions.getLastRouteName({ pathname: '/results' })).toBe('Back to Search Results');
  });

  it('returns false if pathname is undefined', () => {
    expect(actions.getLastRouteName({ pathname: null })).toBe(false);
  });
});
