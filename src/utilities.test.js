import { validStateEmail,
         localStorageFetchValue,
         localStorageToggleValue,
         fetchUserToken,
         pillSort,
         formExploreRegionDropdown,
         scrollToTop,
         getItemLabel,
         shortenString,
         cleanQueryParams,
         ifEnter,
         formQueryString,
         propSort,
       } from './utilities';

describe('local storage', () => {
  it('should be able to fetch the existence of a value when there is one values in the array', () => {
    localStorage.setItem('key', JSON.stringify(['1']));
    const retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.exists).toBe(true);
    localStorage.clear();
  });

  it('should be able to fetch the existence of a value when there are multiple values in the array', () => {
    localStorage.setItem('key', JSON.stringify(['1', '2']));
    const retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.exists).toBe(true);
    localStorage.clear();
  });

  it('should be able to fetch the existence of a value when that value is not in the array', () => {
    localStorage.setItem('key', JSON.stringify(['2', '3']));
    const retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.exists).toBe(false);
    localStorage.clear();
  });

  it('should be able to fetch the count of an array', () => {
    localStorage.setItem('key', JSON.stringify(['1', '2']));
    const retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.count).toBe(2);
    localStorage.clear();
  });

  it('should be able to toggle a value in the array', () => {
    localStorage.setItem('key', JSON.stringify(['1', '2']));
    let retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.exists).toBe(true);
    localStorageToggleValue('key', '1');
    retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.exists).toBe(false);
    localStorage.clear();
  });
});

describe('validStateEmail', () => {
  it('should return true for a valid State email', () => {
    const email = 'joe123@state.gov';
    const output = validStateEmail(email);
    expect(output).toBe(true);
  });

  it('should return false for an invalid State email', () => {
    const email = 'joe123@email.com';
    const output = validStateEmail(email);
    expect(output).toBe(false);
  });
});

describe('fetchUserToken', () => {
  it('should be able to fetch the auth token', () => {
    localStorage.setItem('token', '1234');
    const output = fetchUserToken();
    expect(output).toBe('Token 1234');
    localStorage.clear();
  });
});

describe('sort functions', () => {
  const items = [{ title: 'a', description: 'a' }, { title: 'b', description: 'b' }];
  const pills = [{ description: 'a' }, { code: 'b' }];

  it('can sort by description', () => {
    expect(propSort('description')(items[0], items[1])).toBe(-1);
    expect(propSort('description')(items[1], items[0])).toBe(1);
    expect(propSort('description')(items[0], items[0])).toBe(0);
  });

  it('can sort by title', () => {
    expect(propSort('title')(items[0], items[1])).toBe(-1);
    expect(propSort('title')(items[1], items[0])).toBe(1);
    expect(propSort('title')(items[0], items[0])).toBe(0);
  });

  it('can sort by description or code', () => {
    expect(pillSort(pills[0], pills[1])).toBe(-1);
    expect(pillSort(pills[1], pills[0])).toBe(1);
    expect(pillSort(pills[0], pills[0])).toBe(0);
  });
});

const filters = [{ item: { title: 'Bureau' }, data: [{ long_description: 'regionA', code: 'code' }] }, { item: { title: 'Language' } }];

describe('formExploreRegionDropdown function', () => {
  const regions = formExploreRegionDropdown(filters);

  it('can filter for region', () => {
    expect(regions[1].long_description).toBe(filters[0].data[0].long_description);
  });

  it('can add new properties', () => {
    expect(regions[1].text).toBe(filters[0].data[0].long_description);
  });

  it('adds the placeholder object to the beginning of the array', () => {
    expect(regions[0].disabled).toBe(true);
  });
});

describe('scrollToTop function', () => {
  it('can call the scrollToTop function', () => {
    scrollToTop();
  });
});

describe('getItemLabel function', () => {
  it('can can get an item label', () => {
    expect(getItemLabel(filters[0].data[0])).toBe(filters[0].data[0].long_description);
    expect(getItemLabel({ description: 'test' })).toBe('test');
    expect(getItemLabel({ code: '0' })).toBe('0');
  });
});

describe('shortenString function', () => {
  const string = '012345';
  it('can shorten a string with the default suffix', () => {
    expect(shortenString(string, 0)).toBe('...');
    expect(shortenString(string, 2)).toBe('...');
    expect(shortenString(string, 3)).toBe('...');
    expect(shortenString(string, 4)).toBe('0...');
    expect(shortenString(string, 5)).toBe('01...');
    expect(shortenString(string, 6)).toBe('012345');
    expect(shortenString(string, 7)).toBe('012345');
  });

  it('can shorten a string with a null suffix', () => {
    expect(shortenString(string, 0, null)).toBe('');
    expect(shortenString(string, 2, null)).toBe('01');
    expect(shortenString(string, 3, null)).toBe('012');
    expect(shortenString(string, 4, null)).toBe('0123');
    expect(shortenString(string, 5, null)).toBe('01234');
    expect(shortenString(string, 6, null)).toBe('012345');
    expect(shortenString(string, 7, null)).toBe('012345');
  });
});

describe('cleanQueryParams', () => {
  const query = { q: 'test', fake: 'test' };
  it('retain only real query params', () => {
    expect(cleanQueryParams(query).fake).toBe(undefined);
    expect(cleanQueryParams(query).q).toBe(query.q);
    expect(Object.keys(cleanQueryParams(query)).length).toBe(1);
  });
});

describe('ifEnter', () => {
  it('only returns true for keyCode of 13', () => {
    expect(ifEnter({ keyCode: 13 })).toBe(true);
    expect(ifEnter({ keyCode: 14 })).toBe(false);
  });
});

describe('formQueryString', () => {
  it('can return a string', () => {
    expect(formQueryString({ q: 'test' })).toBe('q=test');
  });
});
