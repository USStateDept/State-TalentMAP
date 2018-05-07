import sinon from 'sinon';
import { isEqual } from 'lodash';
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
         existsInNestedObject,
         removeDuplicates,
         getTimeDistanceInWords,
         formatDate,
         focusById,
         focusByFirstOfHeader,
         wrapForMultiSelect,
         returnObjectsWherePropMatches,
         numbersToPercentString,
         formatBidTitle,
         formatWaiverTitle,
         propOrDefault,
         formatIdSpacing,
         userHasPermissions,
         getAssetPath,
         sortGrades,
         getApplicationPath,
         getAccessiblePositionNumber,
         getPostName,
         getDifferentialPercentage,
         mapSavedSearchesToSingleQuery,
         mapSavedSearchToDescriptions,
         difference,
         redirectToLoginRedirect,
       } from './utilities';
import { searchObjectParent } from './__mocks__/searchObject';

describe('local storage', () => {
  it('should be able to fetch the existence of a value when there is one values in the array', () => {
    localStorage.setItem('keyName', JSON.stringify(['1']));
    const retrieved = localStorageFetchValue('keyName', '1');
    expect(retrieved.exists).toBe(true);
    localStorage.clear();
  });

  it('should be able to fetch the existence of a value when there are multiple values in the array', () => {
    localStorage.setItem('keyName', JSON.stringify(['1', '2']));
    const retrieved = localStorageFetchValue('keyName', '1');
    expect(retrieved.exists).toBe(true);
    localStorage.clear();
  });

  it('should be able to fetch the existence of a value when that value is not in the array', () => {
    localStorage.setItem('keyName', JSON.stringify(['2', '3']));
    const retrieved = localStorageFetchValue('keyName', '1');
    expect(retrieved.exists).toBe(false);
    localStorage.clear();
  });

  it('should be able to fetch the count of an array', () => {
    localStorage.setItem('keyName', JSON.stringify(['1', '2']));
    const retrieved = localStorageFetchValue('keyName', '1');
    expect(retrieved.count).toBe(2);
    localStorage.clear();
  });

  it('should be able to toggle a value in the array', () => {
    localStorage.setItem('keyName', JSON.stringify(['1', '2']));
    let retrieved = localStorageFetchValue('keyName', '1');
    expect(retrieved.exists).toBe(true);
    localStorageToggleValue('keyName', '1');
    retrieved = localStorageFetchValue('keyName', '1');
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
    localStorage.clear();
    localStorage.setItem('token', '1234');
    const output = fetchUserToken();
    expect(output).toBe('Token 1234');
    localStorage.clear();
  });
});

describe('sort functions', () => {
  const items = [{ title: 'a', description: 'a' }, { title: 'b', description: 'b' }];
  const pills = [{ description: 'a' }, { code: 'b' }];
  const grades = [{ code: '01' }, { code: '02' }, { code: 'fake' }, { code: 'MC' }];

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

  it('can apply custom sorting to grades', () => {
    expect(sortGrades(grades[0], grades[1])).toBe(-1);
    expect(sortGrades(grades[1], grades[0])).toBe(1);
    expect(sortGrades(grades[0], grades[2])).toBe(-1);
    expect(sortGrades(grades[3], grades[2])).toBe(-1);
    expect(sortGrades(grades[2], grades[3])).toBe(1);
    expect(sortGrades(grades[2], grades[2])).toBe(0);
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

describe('existsInNestedObject', () => {
  it('can return true when something exists in a nested object', () => {
    expect(existsInNestedObject(1, [{ position: { id: 1 } }])).toBe(true);
  });

  it('can return false when something does not exist in a nested object', () => {
    expect(existsInNestedObject(1, [{ position: { otherId: 2 } }])).toBe(false);
  });
});

describe('removeDuplicates', () => {
  const arr = [
    { id: 1, prop: 'a' },
    { id: 2, prop: 'b' },
    { id: 1, prop: 'c' },
  ];
  it('removes duplicate objects from an array by property', () => {
    // it should remove the last object since id is a duplicate
    const newArr = removeDuplicates(arr, 'id');
    expect(newArr.length).toBe(2);
    expect(newArr[0].id).toBe(1);
    expect(newArr[0].prop).toBe('a');
    expect(newArr[1].id).toBe(2);
  });
  it('retains duplicates by properties other than the one specified', () => {
    // no objects should be removed since all prop properties are unique
    const newArr = removeDuplicates(arr, 'prop');
    expect(newArr.length).toBe(3);
    expect(newArr[0].id).toBe(1);
    expect(newArr[0].prop).toBe('a');
    expect(newArr[1].id).toBe(2);
    expect(newArr[2].id).toBe(1);
    expect(newArr[2].prop).toBe('c');
  });
});

describe('distanceInWords', () => {
  it('returns a defined value containg "ago" in the string', () => {
    const timeDistanceInWords = getTimeDistanceInWords(new Date());
    // we won't explicitly test for values since we can expect date-fns to work
    expect(timeDistanceInWords).toBeDefined();
    // but we will test that it contains ' ago' since that is custom text we added in
    expect(timeDistanceInWords).toContain(' ago');
  });
});

describe('formatDate', () => {
  it('returns a properly formatted date', () => {
    // how we expect the date from the API
    const unformattedDate = '2017-01-15';
    // converted date
    const formattedDate = formatDate(unformattedDate);
    // should be formatted using the default format
    expect(formattedDate).toBe('01/15/2017');
  });

  it('returns a properly formatted date with a custom format', () => {
    // how we expect the date from the API
    const unformattedDate = '2017-01-01';
    // converted date
    const formattedDate = formatDate(unformattedDate, 'M-D-YYYY');
    // should be formatted using the custom format
    expect(formattedDate).toBe('1-1-2017');
  });

  it('returns null if no date is provided', () => {
    expect(formatDate(null)).toBe(null);
  });
});

describe('focusById', () => {
  const focusSpy = sinon.spy();
  it('can focus by ID', () => {
    const elements = {
      test: {
        focus: focusSpy,
      },
    };
    global.document.getElementById = id => elements[id];
    focusById('test');
    sinon.assert.calledOnce(focusSpy);
  });
});

describe('focusByFirstOfHeader', () => {
  let valuesSetBySetAttribute = [];
  const setAttribute = (attribute, value) => { valuesSetBySetAttribute = [attribute, value]; };

  let focusSpy = sinon.spy();
  let elements = {
    h1: [
      {},
      { focus: focusSpy, setAttribute },
    ],
    h2: {},
  };
  global.document.getElementsByTagName = tag => elements[tag];
  it('can focus and set attributes to the first header found', (done) => {
    focusByFirstOfHeader();
    const f = () => {
      setTimeout(() => {
        sinon.assert.calledOnce(focusSpy);
        expect(valuesSetBySetAttribute[0]).toBe('tabindex');
        expect(valuesSetBySetAttribute[1]).toBe('-1');
        done();
      }, 10);
    };
    f();
  });

  it('can focus the first h2 if h1 does not exist', (done) => {
    // reset spy and attribute array
    valuesSetBySetAttribute = [];
    focusSpy = sinon.spy();
    elements = {
      h2: [
        { focus: focusSpy, setAttribute },
      ],
    };
    focusByFirstOfHeader();
    const f = () => {
      setTimeout(() => {
        sinon.assert.calledOnce(focusSpy);
        expect(valuesSetBySetAttribute[0]).toBe('tabindex');
        expect(valuesSetBySetAttribute[1]).toBe('-1');
        done();
      }, 10);
    };
    f();
  });
});

describe('wrapForMultiSelect', () => {
  it('can convert properties', () => {
    const options = [{ code: '100', description: 'one hundred' }, { code: '200', description: 'two hundred' }];
    const wrappedOptions = wrapForMultiSelect(options, 'code', 'description');
    expect(wrappedOptions).toBeDefined();
    expect(wrappedOptions[0].value).toBe(options[0].code);
    expect(wrappedOptions[0].label).toBe(options[0].description);
    expect(wrappedOptions[1].value).toBe(options[1].code);
    expect(wrappedOptions[1].label).toBe(options[1].description);
  });
});

describe('returnObjectsWherePropMatches', () => {
  it('can return objects in two arrays where a property matches in both arrays', () => {
    const sourceArray = [
      { code: '1', description: 'one' },
      { code: '2', description: 'two' },
    ];
    const compareArray = [
      { code: '2', description: 't-w-o', label: 'two' },
      { code: '4', description: 'four' },
      { code: '5', description: 'five' },
    ];
    const propToCheck = 'code';
    const newArray = returnObjectsWherePropMatches(sourceArray, compareArray, propToCheck);
    // only one code matches between the two arrays, the one where code === '2'
    expect(newArray.length).toBe(1);
    // the description should be the one from the first array
    expect(newArray[0].description).toBe(sourceArray[1].description);
    // no props from the second array should be used
    expect(newArray[0].label).toBeUndefined();
  });
});

describe('numbersToPercentString', () => {
  let numerator = 2;
  let denominator = 10;

  it('can return a percent', () => {
    const percent = numbersToPercentString(numerator, denominator);
    expect(percent).toBe('20.0%');
  });

  it('can return a percent with proper format', () => {
    numerator = 3;
    denominator = 7;
    const format = '0.00%';
    const percent = numbersToPercentString(numerator, denominator, format);
    expect(percent).toBe('42.86%');
  });
});

describe('formatBidTitle', () => {
  it('can format a bid title', () => {
    const bid = {
      position: {
        position_number: '0AA',
        title: 'Title',
      },
    };
    const expected = 'Title (0AA)';
    expect(formatBidTitle(bid)).toBe(expected);
  });
});

describe('formatWaiverTitle', () => {
  it('can format a bid title', () => {
    const waiver = {
      position: 'Position',
      category: 'category',
    };
    const expected = 'Position - CATEGORY';
    expect(formatWaiverTitle(waiver)).toBe(expected);
  });
});

describe('propOrDefault', () => {
  const nestedObject = {
    a: {
      b: true,
      c: {
        d: {},
        e: 1,
        f: 0,
      },
    },
  };

  it('traverses nested objects', () => {
    expect(propOrDefault(nestedObject, 'a.b')).toBe(true);
    expect(propOrDefault(nestedObject, 'a.c.d')).toBeDefined();
    expect(propOrDefault(nestedObject, 'a.c.e')).toBe(1);
  });

  it('returns the default value when the nested property does not exist', () => {
    expect(propOrDefault(nestedObject, 'a.b.e.e.e')).toBe(null);
    expect(propOrDefault(nestedObject, 'a.g')).toBe(null);
    expect(propOrDefault(nestedObject, 'a.b.c.d.d', 'value')).toBe('value');
  });

  it('returns the property value when the property value exists, but is 0', () => {
    expect(propOrDefault(nestedObject, 'a.c.f')).toBe(0);
  });
});

describe('formatIdSpacing', () => {
  it('can format strings', () => {
    expect(formatIdSpacing('two words')).toBe('two-words');
    expect(formatIdSpacing('has Three words')).toBe('has-Three-words');
  });

  it('can format numbers', () => {
    expect(formatIdSpacing(3)).toBe('3');
  });

  it('can format undefined values', () => {
    // these will be randomly generated shortids, so we just check that they have length
    // greater than 3
    expect(formatIdSpacing(undefined).length).toBeGreaterThan(3);
    expect(formatIdSpacing(null).length).toBeGreaterThan(3);
    expect(formatIdSpacing(false).length).toBeGreaterThan(3);
  });
});

describe('userHasPermissions', () => {
  let userPermissions;
  let permissionsToCheck;
  beforeEach(() => {
    userPermissions = ['a', 'b', 'c'];
    permissionsToCheck = ['a', 'c'];
  });

  it('returns true if the user has all the needed permissions', () => {
    expect(userHasPermissions(permissionsToCheck, userPermissions)).toBe(true);
  });

  it('returns false if the user has some of the needed permissions', () => {
    userPermissions = ['a'];
    expect(userHasPermissions(permissionsToCheck, userPermissions)).toBe(false);
  });

  it('returns true if the user has more than the needed permissions', () => {
    userPermissions.push('d', 'e');
    expect(userHasPermissions(permissionsToCheck, userPermissions)).toBe(true);
  });

  it('returns false if userPermissions are not provided', () => {
    userPermissions = [];
    expect(userHasPermissions(permissionsToCheck, userPermissions)).toBe(false);
  });

  it('returns true if permissionsToCheck are not provided', () => {
    permissionsToCheck = [];
    expect(userHasPermissions(permissionsToCheck, userPermissions)).toBe(true);
  });

  it('returns true if permissionsToCheck and userPermissions are not provided', () => {
    permissionsToCheck = [];
    userPermissions = [];
    expect(userHasPermissions(permissionsToCheck, userPermissions)).toBe(true);
  });
});

describe('getAssetPath', () => {
  it('returns the correct path with no PUBLIC_URL', () => {
    const assetPath = '/image.png';
    const result = getAssetPath(assetPath);
    expect(result).toBe(assetPath);
  });

  it('returns the correct path with a PUBLIC_URL', () => {
    process.env.PUBLIC_URL = '/public';
    const assetPath = '/image.png';
    const result = getAssetPath(assetPath);
    expect(result).toBe(`/public${assetPath}`);
  });

  it('returns the correct path with a PUBLIC_URL with a trailing slash', () => {
    process.env.PUBLIC_URL = '/public/';
    const assetPath = '/image.png';
    const result = getAssetPath(assetPath);
    expect(result).toBe(`/public${assetPath}`);
  });
});

describe('getApplicationPath', () => {
  it('returns a valid path', () => {
    // set env
    process.env.PUBLIC_URL = '/application/';

    const result = getApplicationPath();

    expect(result).toBe('http://localhost/application/');
  });
});

describe('getAccessiblePositionNumber', () => {
  it('adds spaces to a position number', () => {
    const positionNumber = 'S7001';

    expect(getAccessiblePositionNumber(positionNumber)).toBe('S 7 0 0 1');
  });
});

describe('getPostName', () => {
  it('returns a domestic post name', () => {
    const post = { location: { city: 'Arlington', state: 'VA', country: 'United States' } };
    expect(getPostName(post)).toBe('Arlington, VA');
  });

  it('returns an overseas post name', () => {
    const post = { location: { city: 'London', state: null, country: 'United Kingdom' } };
    expect(getPostName(post)).toBe('London, United Kingdom');
  });

  it('returns the code when location data is not available', () => {
    const post = { location: null, code: '0AA' };
    expect(getPostName(post)).toBe('0AA');
  });

  it('returns the default defaultValue when the code and location data are not available', () => {
    const post = { location: null };
    expect(getPostName(post)).toBe(null);
  });

  it('returns a custom defaultValue when the code and location data are not available', () => {
    const post = { location: null };
    expect(getPostName(post, 'default')).toBe('default');
  });
});

describe('getDifferentialPercentage', () => {
  it('returns a percentage for a differential', () => {
    expect(getDifferentialPercentage(30)).toBe('30%');
  });

  it('returns a percentage for a differential of 0', () => {
    expect(getDifferentialPercentage(0)).toBe('0%');
  });

  it('returns the default value for a differential of null', () => {
    expect(getDifferentialPercentage(null)).toBe('');
  });

  it('returns a custom default value for a differential of null', () => {
    expect(getDifferentialPercentage(null, 'custom')).toBe('custom');
  });
});

describe('mapSavedSearchesToSingleQuery', () => {
  const searches = searchObjectParent;
  it('maps multiple saved searches to a single query', () => {
    const mappedSearch = mapSavedSearchesToSingleQuery(searches);
    const expected = { grade__code__in: '02', post__tour_of_duty__code__in: 'O', q: 'german', skill__code__in: '6080' };
    expect(isEqual(mappedSearch, expected)).toBe(true);
  });
});

describe('mapSavedSearchToDescriptions', () => {
  const searches = searchObjectParent;
  const mappedFilters = [{ selectionRef: 'skill__code__in', description: 'test A', codeRef: '6080' }];
  it('maps saved searches to descriptions', () => {
    const mappedDescriptions = mapSavedSearchToDescriptions(
      searches.results[0].filters, mappedFilters,
    );
    const expected = ['german', 'test A'];
    expect(isEqual(mappedDescriptions, expected)).toBe(true);
  });
});

describe('difference', () => {
  it('verify diff between 2 - 1 level objects when there ARE differences', () => {
    const itemA = {
      boolean: true,
      array: null,
    };

    const itemB = {
      boolean: false,
      array: [],
      new: 'I am new!',
    };

    const diff = difference(itemA, itemB);
    const expected = {
      boolean: false,
      array: [],
      new: 'I am new!',
    };

    expect(diff).toEqual(expected);
  });

  it('verify diff between 2 - 1 level objects when there NO differences', () => {
    const itemA = {
      boolean: true,
      array: [],
      string: 'string',
    };

    const itemB = {
      boolean: true,
      array: [],
    };

    const diff = difference(itemA, itemB);
    const expected = {};

    expect(diff).toEqual(expected);
  });

  it('verify diff between 2 - deep level objects', () => {
    const itemA = {
      data: {
        boolean: false,
        number: -1,
        key: 'key',
      },

      params: {
        config: '/var/usr/app',
        count: 0,
        data: {
          boolean: false,
          page: 1,
        },
      },
    };

    const itemB = {
      data: {
        boolean: false,
        number: -1,
        key: 'key',
      },

      params: {
        config: '/var/usr/app',
        count: 320,
        data: {
          boolean: false,
          page: 10,
        },
      },
    };

    const diff = difference(itemA, itemB);
    const expected = {
      params: {
        count: 320,
        data: {
          page: 10,
        },
      },
    };

    expect(diff).toEqual(expected);
  });
});

describe('redirectToLoginRedirect', () => {
  it('assigns a new window location', () => {
    let newLocation;
    process.env.PUBLIC_URL = '/test';
    // eslint-disable-next-line no-return-assign
    window.location.assign = loc => newLocation = loc;
    redirectToLoginRedirect();
    expect(newLocation).toBe('/test/loginRedirect');
  });
});
