import * as actions from './routerLocations';
import routerLocations from '../__mocks__/routerLocations';

describe('routerLocations', () => {
  it('maps routes to names', () => {
    ['/results', '/', '/details', '/post', 'fakeroute'].map(route => (
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
    expect(actions.getLastRouteName(routerLocations)).toBe('Go back to search results');
  });

  it('can get the Link element for last route', () => {
    expect(actions.getLastRouteLink(routerLocations)).toBeDefined();
  });
});
