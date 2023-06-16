import sinon from 'sinon';
import { isEqual } from 'lodash';
import {
  anyToTitleCase,
  cleanQueryParams,
  difference,
  downloadFromResponse,
  existsInNestedObject,
  fetchUserToken,
  focusByFirstOfHeader,
  focusById,
  formExploreRegionDropdown,
  formQueryString,
  formatBidTitle,
  formatDate,
  formatIdSpacing,
  formatWaiverTitle,
  getAccessiblePositionNumber,
  getApplicationPath,
  getAriaValue,
  getAssetPath,
  getBidCycleName,
  getBidListStats,
  getDifferentialPercentage,
  getItemLabel,
  getPostName,
  getScrollDistanceFromBottom,
  getTimeDistanceInWords,
  hasValidToken,
  ifEnter,
  isUrl,
  loadImg,
  localStorageFetchValue,
  localStorageToggleValue,
  mapSavedSearchToDescriptions,
  mapSavedSearchesToSingleQuery,
  move,
  numbersToPercentString,
  propOrDefault,
  propSort,
  redirectToLoginRedirect,
  returnObjectsWherePropMatches,
  scrollToGlossaryTerm,
  scrollToTop,
  shortenString,
  sortGrades,
  spliceStringForCSV,
  splitByLineBreak,
  stopProp,
  userHasPermissions,
  validStateEmail,
  wrapForMultiSelect,
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
    if (filters[0].data)
      expect(regions[1].long_description).toBe(filters[0].data[0].long_description);
  });

  it('can add new properties', () => {
    if (filters[0].data)
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
    if (filters[0].data)
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
    expect(ifEnter({ keyCode: 13 } as React.KeyboardEvent)).toBe(true);
    expect(ifEnter({ keyCode: 14 } as React.KeyboardEvent)).toBe(false);
  });
});

describe('formQueryString', () => {
  it('can return a string', () => {
    expect(formQueryString({ q: 'test' })).toBe('q=test');
  });
});

describe('existsInNestedObject', () => {
  it('can return true when something exists in a nested object', () => {
    const arr = [{ position_info: { id: 1 } }];
    expect(existsInNestedObject(1, arr)).toEqual(arr[0]);
  });

  it('can return false when something does not exist in a nested object', () => {
    expect(existsInNestedObject(1, [{ position: { otherId: 2 } }])).toBe(false);
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

  // Function is type checked in new TS utilities so this unit test may not be needed
  // In that case, remove null from param types in formatDate
  it('returns null if no date is provided', () => {
    expect(formatDate(null)).toBe(null);
  });
});

describe('focusById', () => {
  let focusSpy: sinon.SinonSpy;
  it('can focus by ID', () => {
    focusSpy = sinon.spy();
    const elements: any = {
      test: {
        focus: focusSpy,
      },
    };
    global.document.getElementById = id => elements[id];
    focusById('test');
    sinon.assert.calledOnce(focusSpy);
  });

  it('can focus by ID when there is a timeout', (done) => {
    focusSpy = sinon.spy();
    const elements: any = {
      test: {
        focus: focusSpy,
      },
    };
    global.document.getElementById = id => elements[id];
    const timeout = 10;
    focusById('test', timeout);
    setTimeout(() => {
      sinon.assert.calledOnce(focusSpy);
      done();
    }, timeout);
  });
});

describe('focusByFirstOfHeader', () => {
  let valuesSetBySetAttribute: string[] = [];
  const setAttribute = (attribute: string, value: string) => { valuesSetBySetAttribute = [attribute, value]; };

  let focusSpy = sinon.spy();
  let elements: any = {
    h1: [
      {},
      { focus: focusSpy, setAttribute },
    ],
    h2: {},
  };
  global.document.getElementsByTagName = (tag: string) => elements[tag];
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
    expect(formatIdSpacing(undefined)).toBeDefined();
    expect(formatIdSpacing(null)).toBeDefined();
    // expect(formatIdSpacing(false)).toBeDefined(); // type checked with new TS utility functions
  });
});

describe('userHasPermissions', () => {
  let userPermissions: string[];
  let permissionsToCheck: string[];
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

  it('returns null if positionNumber is undefined', () => {
    const positionNumber = undefined;

    expect(getAccessiblePositionNumber(positionNumber)).toBe(null);
  });
});

describe('getPostName', () => {
  it('returns a domestic post name', () => {
    const post = { location: { city: 'Arlington', state: 'VA', country: 'United States' } };
    expect(getPostName(post)).toBe('Arlington, VA');
  });

  it('returns a domestic post name when country === USA', () => {
    const post = { location: { city: 'Arlington', state: 'VA', country: 'USA' } };
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
    const expected = {
      position__grade__code__in: '02',
      position__post__tour_of_duty__code__in: 'O',
      q: 'german',
      position__skill__code__in: '6080',
    };
    expect(isEqual(mappedSearch, expected)).toBe(true);
  });
});

describe('mapSavedSearchToDescriptions', () => {
  const searches = searchObjectParent;
  const mappedFilters = [{
    codeRef: '6080',
    descCode: 'CONSULAR AFFAIRS',
    description: 'CONSULAR AFFAIRS',
    hasDuplicateDescription: true,
    isCommon: undefined,
    isTandem: true,
    isToggle: undefined,
    selectionRef: 'position__skill__code__in'
  }];

  it('maps saved searches to descriptions', () => {
    const mappedDescriptions = mapSavedSearchToDescriptions(
      searches.results[0].filters, mappedFilters);
    const expected = [
      { description: 'german', isTandem: undefined, isCommon: true, isToggle: undefined },
      { description: 'CONSULAR AFFAIRS', isTandem: true, isCommon: undefined, isToggle: undefined },
    ];
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

describe('isUrl', () => {
  it('returns the expected output for different strings', () => {
    [
      ['http', false], ['https', false], ['ftp', false], ['https://www', false], ['http.goo', false], ['goog.com', false],
      ['http://google.com', true], ['https://www.goo.co', true],
    ].map((u) => {
      // assume first item in array is a string from declaration above
      const output = isUrl(u[0] as string);
      return u[1] ? expect(output).toBeTruthy() : expect(output).toBeFalsy();
    });
  });
});

describe('hasValidToken', () => {
  it('removes the localStorage token if it is invalid', () => {
    localStorage.setItem('token', '{');
    expect(hasValidToken()).toBe(false);
    expect(localStorage.getItem('token')).toBe(null);
  });
});

describe('getScrollDistanceFromBottom', () => {
  it('returns the scroll distance from the bottom of the page', () => {
    window.pageYOffset = 100;
    window.innerHeight = 800;
    const z = document.createElement('body');
    Object.setPrototypeOf(z, { offsetHeight: 3000 });
    document.body = z;
    expect(getScrollDistanceFromBottom()).toBe(2100);
  });
});

describe('getAriaValue', () => {
  [[true, 'true'], [false, 'false'], ['true', 'true'], ['false', 'false'], [null, 'false'], [1, 'true']]
    .map(m => (
      it(`returns ${m[1]} for ${m[0]}`, () => {
        expect(getAriaValue(m[0])).toBe(m[1]);
      })
    ));
});

describe('spliceStringForCSV', () => {
  it('splices the string correctly when index 1 === "="', () => {
    expect(spliceStringForCSV('"=jjj"')).toBe('="jjj"');
  });

  it('returns the value unchanged when index 1 !== "="', () => {
    expect(spliceStringForCSV('"jjj"')).toBe('"jjj"');
  });
});

describe('scrollToGlossaryTerm', () => {
  it("calls element's functions", (done) => {
    const scrollSpy = sinon.spy();
    const clickSpy = sinon.spy();

    window.document.getElementById = () => ({
      scrollIntoView: scrollSpy, 
      getAttribute: () => '', 
      click: clickSpy, 
      focus: () => { },
    } as unknown as HTMLElement);

    scrollToGlossaryTerm('term');

    setTimeout(() => {
      sinon.assert.calledOnce(scrollSpy);
      sinon.assert.calledOnce(clickSpy);
      done();
    }, 500);
  });

  describe('getBidCycleName', () => {
    const cyclename = 'Summer 2020';

    it('returns the correct value for strings', () => {
      expect(getBidCycleName(cyclename)).toBe(cyclename);
    });

    it('returns the correct value for objects', () => {
      expect(getBidCycleName({ name: cyclename })).toBe(cyclename);
    });

    it('returns the correct value when it cannot find a name', () => {
      expect(getBidCycleName({ a: cyclename })).not.toBe(cyclename);
      expect(getBidCycleName([])).not.toBe(cyclename);
      expect(getBidCycleName({ cyclename: 1 })).not.toBe(cyclename);
    });
  });

  describe('loadImg', () => {
    it('does not throw an error', () => {
      expect(loadImg).not.toThrowError();
    });
  });

  describe('downloadFromResponse', () => {
    let blobSpy: sinon.SinonSpy;
    // let blobSpy: sinon.SinonSpy | ((blob: any, defaultName?: string | undefined) => boolean) | undefined;
    // let blobSpy: sinon.SinonSpy<any[], any> | sinon.SinonSpy<any, any>;
    // let blobSpy: sinon.SinonSpy<any[], any> | ((blob: any, defaultName?: string | undefined) => boolean) | sinon.SinonSpy<any, any> | undefined;
    let response: { headers: { 'content-disposition': string; }; data: string; };

    beforeEach(() => {
      blobSpy = sinon.spy();
      response = {
        headers: { 'content-disposition': 'attachment; filename=test.csv' },
        data: 'some data',
      };
      global.window.navigator.msSaveOrOpenBlob = blobSpy;
    });

    it('calls msSaveOrOpenBlob if msSaveBlob exists', () => {
      downloadFromResponse(response);
      sinon.assert.calledOnce(blobSpy);
      blobSpy.reset();
    });

    it('does not call msSaveOrOpenBlob if msSaveBlob does not exist', () => {
      global.window.navigator.msSaveBlob = undefined;
      downloadFromResponse(response);
      sinon.assert.notCalled(blobSpy);
    });
  });

  describe('anyToTitleCase', () => {
    it('converts a string to title case', () => {
      const result = 'The Quick Dog';
      ['tHE qUick Dog', 'THE QUICK DOG', 'the quick dog', 'The Quick Dog', 'tHe Quick dOg']
        .map(m => expect(anyToTitleCase(m)).toBe(result));
    });
  });

  describe('stopProp', () => {
    it('calls stopPropagation on stopProp', () => {
      const spy = sinon.spy();
      const e = { stopPropagation: spy };
      stopProp(e);
      sinon.assert.calledOnce(spy);
    });
  });

  describe('getBidListStats', () => {
    it('properly counts statuses', () => {
      const bidList = [{ status: 'a' }, { status: 'b' }, { status: 'c' }, { status: 'd' }, { status: 'e' }];
      const statuses = ['a', 'b', 'c'];
      expect(getBidListStats(bidList, statuses, false)).toBe(3);
      expect(getBidListStats(bidList, ['x', 'y', 'z'])).toBe(0);
      expect(getBidListStats(bidList, ['d'])).toBe(1);
    });

    it('properly pads numbers less than 10 when padWithZero', () => {
      const bidList = [
        { status: 'a' }, { status: 'a' }, { status: 'a' }, { status: 'a' }, { status: 'a' },
        { status: 'a' }, { status: 'a' }, { status: 'a' }, { status: 'a' },
        { status: 'b' }, { status: 'b' }, { status: 'b' }, { status: 'b' }, { status: 'b' },
        { status: 'b' }, { status: 'b' }, { status: 'b' }, { status: 'b' }, { status: 'b' },
      ];
      const statuses = ['a', 'b', 'c'];
      expect(getBidListStats(bidList, ['x', 'y', 'z'], true)).toBe('00');
      expect(getBidListStats(bidList, ['a'], true)).toBe('09');
      expect(getBidListStats(bidList, ['b'], true)).toBe('10');
      expect(getBidListStats(bidList, statuses, true)).toBe('19');
    });
  });
});

describe('move', () => {
  it('moves an item in an array', () => {
    const arr = [1, 2, 3];
    const exp = move(arr, 0, 1);
    expect(exp).toEqual([2, 1, 3]);
  });
});

describe('splitByLineBreak', () => {
  // We use 3 line breaks to signal a split
  it('splits a single message', () => {
    expect(splitByLineBreak('test')).toEqual(['test']);
  });

  it('splits no messages', () => {
    expect(splitByLineBreak(null)).toEqual(['']);
  });

  it('splits 2 messages', () => {
    expect(splitByLineBreak('test\n\n\ntest2')).toEqual(['test', 'test2']);
  });

  it('splits 5 messages', () => {
    expect(splitByLineBreak('test \n a  \n\n\ntest2 a\n\n\n test 3 \n\n\n test4 4 4 \n\n\ntest5 \n\n').length).toEqual(5);
  });
});
