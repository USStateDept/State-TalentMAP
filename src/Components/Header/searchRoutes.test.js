import * as searchRoutes from './searchRoutes';

describe('searchRoutes', () => {
  it('Should return searchBarRoutes', () => {
    expect(searchRoutes.searchBarRoutes).toBeDefined();
  });

  it('Should return searchBarRoutesForce', () => {
    expect(searchRoutes.searchBarRoutesForce).toBeDefined();
  });

  it('Should return searchBarRoutesHidden', () => {
    expect(searchRoutes.searchBarRoutesForceHidden).toBeDefined();
  });
});
