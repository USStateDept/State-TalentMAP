import isCurrentPath, { checkIfChildrenMatchPath } from './navigation';

describe('navigation helpers', () => {
  const locationMock = {
    pathname: '/profile/favorites/',
  };
  const children = [
    {
      props: {
        link: '/profile/portfolio',
      },
    },
    {
      props: {
        link: '/profile/dashboard',
      },
    },
    {
      props: {
        link: '/profile/favorites',
      },
    },
  ];
  it('returns true for matching paths', () => {
    // should be true with or without trailing slash
    expect(isCurrentPath(locationMock.pathname, '/profile/favorites/')).toBe(true);
    expect(isCurrentPath(locationMock.pathname, '/profile/favorites')).toBe(true);
  });

  it('returns false for non-matching paths', () => {
    expect(isCurrentPath(locationMock.pathname, '/profile')).toBe(false);
    expect(isCurrentPath(locationMock.pathname, '/profile/')).toBe(false);
    expect(isCurrentPath(locationMock.pathname, '/favorites')).toBe(false);
    expect(isCurrentPath(locationMock.pathname, '/profile/bidlist')).toBe(false);
    expect(isCurrentPath(locationMock.pathname, '/profile/bidlist/')).toBe(false);
  });

  it('returns true when a child path matches the current path', () => {
    expect(checkIfChildrenMatchPath(children, '/profile/portfolio')).toBe(true);
    expect(checkIfChildrenMatchPath(children, '/profile/otherroute')).toBe(false);
  });
});
