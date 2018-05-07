import * as actions from './routerLocations';
import routerLocations from '../__mocks__/routerLocations';

describe('routerLocations', () => {
  it('maps routes to names', () => {
    ['/results', '/', '/details', 'fakeroute', '/profile', '/compare', '/profile/bidtracker/'].map(route => (
      expect(actions.mapRoutesToNames(route)).toBeDefined()
    ));
  });

  it('can get the last route', () => {
    expect(actions.getLastRoute(routerLocations)).toBe(routerLocations[routerLocations.length - 2]);
  });

  it('will not return a route if there is no history', () => {
    expect(actions.getLastRoute([])).toBe(false);
  });

  it('can get the last route name', () => {
    expect(actions.getLastRouteName(routerLocations)).toBe('Back to Search Results');
  });

  it('returns false if there is only one item in history', () => {
    expect(actions.getLastRoute(
      [routerLocations[0], routerLocations[1], routerLocations[0]])).toBe(false);
  });

  it('returns false for arrays that do not have pathname', () => {
    expect(actions.getLastRoute([1, 2, 3, 4])).toBe(false);
  });

  it('can get the link object for the last route', () => {
    expect(actions.getLastRouteLink(routerLocations).link).toBeDefined();
    expect(actions.getLastRouteLink(routerLocations).text).toBeDefined();
  });
});
