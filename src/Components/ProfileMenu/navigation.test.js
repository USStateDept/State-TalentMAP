import isCurrentPath from './navigation';

describe('navigation helpers', () => {
  const locationMock = {
    pathname: '/profile/favorites/',
  };
  it('returns true for matching paths', () => {
    // should be true with or without trailing slash
    expect(isCurrentPath(locationMock.pathname, '/profile/favorites/')).toBe(true);
    expect(isCurrentPath(locationMock.pathname, '/profile/favorites')).toBe(true);
  });

  it('returns false for non-matching paths', () => {
    // should be true with or without trailing slash
    expect(isCurrentPath(locationMock.pathname, '/profile')).toBe(false);
    expect(isCurrentPath(locationMock.pathname, '/profile/')).toBe(false);
    expect(isCurrentPath(locationMock.pathname, '/favorites')).toBe(false);
    expect(isCurrentPath(locationMock.pathname, '/profile/bidlist')).toBe(false);
    expect(isCurrentPath(locationMock.pathname, '/profile/bidlist/')).toBe(false);
  });
});
