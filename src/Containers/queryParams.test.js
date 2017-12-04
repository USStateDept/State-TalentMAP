import queryParamUpdate from './queryParams';

describe('queryParams', () => {
  it('can call the queryParamUpdate function and return a query string', () => {
    const newQueryObject = ({ page: 2 });
    const oldQueryString = 'q=french&page=1';
    const newQueryString = queryParamUpdate(newQueryObject, oldQueryString);
    expect(newQueryString).toBe('page=2&q=french');
  });

  it('can call the queryParamUpdate function and return a query object', () => {
    const newQueryObject = ({ page: 2 });
    const oldQueryString = 'q=french&page=1';
    const newQueryString = queryParamUpdate(newQueryObject, oldQueryString, true);
    expect(newQueryString.page).toBe('2');
    expect(newQueryString.q).toBe('french');
  });

  it('can call the queryParamUpdate function and reset the page number when a non-page prop is updated', () => {
    const newQueryObject = ({ q: 'arabic' });
    const oldQueryString = 'q=french&page=2';
    const newQueryString = queryParamUpdate(newQueryObject, oldQueryString);
    expect(newQueryString).toBe('q=arabic');
  });

  it('can call the queryParamUpdate function remove any empty query params', () => {
    const newQueryObject = ({ q: '' });
    const oldQueryString = 'q=french&page=2';
    const newQueryString = queryParamUpdate(newQueryObject, oldQueryString);
    expect(newQueryString).toBe('');
  });
});
