import getBestMatchPath from './helpers';

describe('local storage', () => {
  const routes = [
    { path: '/a/b/c', pageTitle: 'abc' },
    { path: '/a', pageTitle: 'a' },
    { path: '/a/b', pageTitle: 'ab' },
    { path: '/a/b/c/d', pageTitle: 'abcd' },
    { path: '/a/b/c/d/e/', pageTitle: 'abcde' },
  ];

  const historyObject = {
    pathname: '/a/b/',
  };

  it('get the best matched path from an array of routes', () => {
    const result = getBestMatchPath(routes, historyObject);
    expect(result.pageTitle).toBe('ab');
  });
});
