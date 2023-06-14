import { useEffect } from 'react';
import {
  cloneDeep, get, has, identity, includes, intersection, isArray, isEmpty, isEqual,
  isFunction, isNumber, isObject, isString, keys, lowerCase, merge as merge$, omit, orderBy,
  padStart, pick, pickBy, split, startCase, take, toLower, toString, transform, uniqBy
} from 'lodash';
import { LOGIN_REDIRECT, LOGIN_ROUTE, LOGOUT_ROUTE } from './login/routes';
import { NO_BID_CYCLE, NO_POST } from './Constants/SystemMessages';
import FLAG_COLORS from './Constants/FlagColors';
import queryString from 'query-string'; //need to check if this is compatible with typescript
import swal from '@sweetalert/with-react'; //need to check if this is compatible with typescript
import Fuse from 'fuse.js';
import shortid from 'shortid';
import Bowser from 'bowser';

//converted utilities JS file to TS
// Focus an element on the page based on its ID. Pass an optional, positive timeout number to
// execute the focus within a timeout.
export const focusById = (id: string, timeout: number, config: { preventScroll?: boolean } = {}): void => {
  const config$ = {
    preventScroll: true,
    ...config,
  };
  let element = document.getElementById(id);
  if (typeof timeout !== 'number') {
    if (element) { element.focus(config$); }
  } else {
    setTimeout(() => {
      element = document.getElementById(id);
      if (element) {
        element.focus(config$);
      }
    }, timeout);
  }
};


export const propOrDefault = (obj: any, path: string, defaultToReturn: any = null): any =>
  get(obj, path, defaultToReturn);

export const formatIdSpacing = (id: any): string => {
  if (id && toString(id)) {
    let idString: string = toString(id);
    idString = split(idString, ' ').join('-');
    // remove any non-alphanumeric character, excluding hyphen
    idString = idString.replace(/[^a-zA-Z0-9 -]/g, '');
    return idString;
  }
  // if id is not defined, return a shortid
  return shortid.generate();
};


// Takes multiple saved search objects and combines them into one object,
// where the value for each property is an array of all individual values
// found across the different saved search objects.
// See Constants/PropTypes SAVED_SEARCH_OBJECT
export const mapSavedSearchesToSingleQuery = (savedSearchesObject: any): any => {
  const clonedSavedSearchesObject = cloneDeep(savedSearchesObject);
  const clonedSavedSearches = clonedSavedSearchesObject.results;
  const mappedSearchTerms = clonedSavedSearches.slice().map((s: any) => s.filters);
  const mappedSearchTermsFormatted = mappedSearchTerms.map((m: any) => {
    const filtered: any = m;
    Object.keys(m).forEach((k) => {
      if (!Array.isArray(filtered[k])) {
        filtered[k] = filtered[k].split(',');
      }
    });
    return filtered;
  });
  function merge(...rest: any[]): any {
    return [].reduce.call(rest, (acc: any, x: any) => {
      const acc$ = merge$({}, acc);
      Object.keys(x).forEach((k) => {
        acc$[k] = (acc$[k] || []).concat(x[k]);
        acc$[k] = acc$[k].filter((item: any, index: any, self: any[]) => self.indexOf(item) === index);
      });
      return acc$;
    }, {});
  }
  const mergedFilters = mappedSearchTermsFormatted.length ? merge(...mappedSearchTermsFormatted) : {};
  const mergedFiltersWithoutArrays: any = { ...mergedFilters };
  Object.keys(mergedFilters).forEach((f) => {
    if (Array.isArray(mergedFilters[f])) {
      mergedFiltersWithoutArrays[f] = mergedFilters[f].join();
    }
  });
  const newQuery = mergedFiltersWithoutArrays;
  return newQuery;
};

// Maps a saved search object against the full filter objects its related to, so that
// we can return an array of descriptions based on the codes in the savedSearchObject.
// See Constants/PropTypes SAVED_SEARCH_OBJECT and MAPPED_PARAM_ARRAY
export const mapSavedSearchToDescriptions = (savedSearchObject: any, mappedParams: any[]): any[] => {
  const clonedSearchObject = cloneDeep(savedSearchObject);
  const searchKeys = Object.keys(clonedSearchObject);
  searchKeys.forEach((s) => { clonedSearchObject[s] = clonedSearchObject[s].split(','); });
  const arrayToReturn: any[] = [];
  // Push the keyword search, since it won't match up with a real filter
  if (savedSearchObject.q) {
    arrayToReturn.push(
      {
        description: savedSearchObject.q,
        isTandem: undefined,
        isCommon: true,
        isToggle: undefined,
      }
    );
  }
  searchKeys.forEach((s) => {
    clonedSearchObject[s].forEach((c: any) => {
      const foundParam = mappedParams.find(m => m.selectionRef === s && m.codeRef === c);
      if (foundParam && foundParam.description) {
        arrayToReturn.push(pick(foundParam, ['description', 'isTandem', 'isCommon', 'isToggle']));
      }
    });
  });
  return arrayToReturn;
};

export const getPostName = (post: any, defaultValue: any = null): string => {
  let valueToReturn: any = defaultValue;


  if (propOrDefault(post, 'location.city') &&
    includes(['United States', 'USA'], get(post, 'location.country'))) {
    valueToReturn = `${post.location.city}, ${post.location.state}`;
  } else if (propOrDefault(post, 'location.city')) {
    valueToReturn = `${post.location.city}${post.location.country ? `, ${post.location.country}` : ''}`;
  } else if (propOrDefault(post, 'code')) {
    valueToReturn = post.code;
  }

  return valueToReturn;
};

// returns the base application path,
// ie, https://hostname:8080/PUBLIC_URL/
export const getApplicationPath = () => `${window.location.origin}${process.env.PUBLIC_URL}`;

// Adds spaces between position number characters so that it's accessible for screen readers.
// Based on this accessibility feedback:
// When a letter is used in the position number, such as S7250404,
// the screen reader reads the number as a full-length numeral
// (i.e., "S. 7 million two hundred thousand ….). This can confuse or disorient the user as
// they navigate and search for positions.
export const getAccessiblePositionNumber = (positionNumber: string | null) => {
  if (positionNumber) {
    return positionNumber.split('').join(' ');
  }
  return null;
};

// returns a percentage string for differential data.
export const getDifferentialPercentage = (differential: number | null, defaultValue: string = ''): string => {
  if (isNumber(differential)) {
    return `${differential}%`;
  }
  return defaultValue;
};

// redirect to express /login route
export const redirectToLogin = () => {
  const prefix: string = process.env.PUBLIC_URL || '';
  window.location.assign(`${prefix}${LOGIN_ROUTE}`);
};

// redirect to react /loginRedirect route
export const redirectToLoginRedirect = () => {
  const prefix: string = process.env.PUBLIC_URL || '';
  window.location.assign(`${prefix}${LOGIN_REDIRECT}`);
};

// redirect to express /logout route
export const redirectToLogout = () => {
  const prefix: string = process.env.PUBLIC_URL || '';
  window.location.assign(`${prefix}${LOGOUT_ROUTE}`);
};

/**
* ~ Returns a Deep Diff Object Between 2 Objects (First parameter as base) ~
* base = { param1: true, param2: 'loading' };
* object = { param1: false, param2: 'loading' };
*
* difference(base, object) => { param1: false }
* difference(object, base) => { param1: true }
*/
export const difference = (base: any, object: any): any => {
  return transform(object, (result: any, value: any, key: any) => {
    /* eslint-disable no-param-reassign */
    if (!isEqual(value, base[key])) {
      result[key] = (isObject(value) && isObject(base[key]) && difference(base[key], value)) || value;
    }
    /* eslint-enable no-param-reassign */
  });
};

/* returns true/false whether url is a valid url that contains http/https/ftp */
export const isUrl = (url: string): RegExpMatchArray | null => {
  const expression = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/;
  const regex = new RegExp(expression);
  return url.match(regex);
};

export const getScrollDistanceFromBottom = (): number => {
  const scrollPosition: number = window.pageYOffset;
  const windowSize: number = window.innerHeight;
  const bodyHeight: number = document.body.offsetHeight;
  return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
};

// eslint-disable-next-line no-confusing-arrow
export const getFormattedNumCSV = (v: any): string => {
  if (v === null || v === undefined) {
    return '';
  }
  // else
  return !isNaN(v) ? `=${v}` : v;
};

export const spliceStringForCSV = (v: any): string => {
  if (v[1] === '=' && typeof v === 'string') {
    return `=${v.slice(0, 1)}${v.slice(2)}`;
  }
  return v;
};

// Returns a paginated array based on page size and the desired page number
export const paginate = (array: any[], pageSize: number, pageNumber: number): any[] => {
  // because pages logically start with 1, but technically with 0
  const pageNumber$ = pageNumber - 1;
  return array.slice(pageNumber$ * pageSize, (pageNumber$ + 1) * pageSize);
};

// Looks for duplicates in a data set by property, and adds a "hasDuplicateDescription" property
// to any objects that are duplicates.
export const mapDuplicates = (
  data: any[] = [],
  propToCheck: string = 'custom_description',
  transformFunc?: (item: any) => any
): any[] => {
  return data.slice().map((p) => {
    let p$ = { ...p };
    const matching = data.filter(f => f[propToCheck] === p$[propToCheck]) || [];
    if (matching.length >= 2) {
      p$.hasDuplicateDescription = true;
      if (typeof transformFunc === 'function') {
        transformFunc = (e: any) => ({
          ...e,
          name: e.code ? `${e.name} (${e.code})` : e.name
        });
        p$ = transformFunc(p$);
      }
    }
    return p$;
  });
};

export const termInGlossary = (term: string): boolean => {
  const id: string = `${formatIdSpacing(term)}-button`;
  return document.getElementById(id) !== null;
};

// scroll to a specific glossary term
export const scrollToGlossaryTerm = (term: string): void => {
  // id formatting used for glossary accordion buttons
  const id: string = `${formatIdSpacing(term)}-button`;

  const el: HTMLElement | null = document.getElementById(id);
  if (el) {
    setTimeout(() => {
      el.scrollIntoView();
      focusById(id, 0, { preventScroll: false });

      if (el.getAttribute('aria-expanded') !== 'true') {
        el.click();
      }
    }, 300);
  }
};

export const getBrowserName = () => Bowser.getParser(window.navigator.userAgent).getBrowserName();

export const getBrowser = () => Bowser.getParser(window.navigator.userAgent).getBrowser();

// Convert values used in aria-* attributes to 'true'/'false' string.
// Perform a string check, if for some reason the value was already a string.
// https://github.com/cerner/terra-core/wiki/React-16-Migration-Guide#noted-changes
export const getAriaValue = (e: string) => {
  if (e === 'true') {
    return e;
  } else if (e === 'false') {
    return e;
  } else if (e) {
    return 'true';
  }
  return 'false';
};

export const downloadFromResponse = (
  response: any,
  fileNameAlt: string = '',
  type: string = 'text/csv'
): void => {
  const cd: string = get(response, 'headers.content-disposition', '');
  const filename: string = cd.replace('attachment; filename=', '') || fileNameAlt;

  const a: HTMLAnchorElement = document.createElement('a');
  const url: string = window.URL.createObjectURL(new Blob([response.data]));
  a.href = url;
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  const _win = window.navigator as any;

  if (_win.msSaveBlob) {
    a.onclick = (() => {
      const BOM: string = '\uFEFF';
      const blobObject: Blob = new Blob([BOM + response.data], { type: ` type: "${type}; charset=utf-8"` });
      _win.msSaveOrOpenBlob(blobObject, filename);
    });
    a.click();
  } else {
    a.click();
  }
};

export const downloadPdfBlob = (
  response: any,
  filename: string = 'employee-profile.pdf'
): void => {
  const _win = window.navigator as any;

  if (_win.msSaveBlob) {
    // const BOM = '\uFEFF';
    const blobObject: Blob = new Blob([response], { type: 'application/pdf; charset=utf-8' });
    _win.msSaveOrOpenBlob(blobObject, filename);
  } else {
    const blob: Blob = new Blob([response], { type: 'application/pdf' });
    const win: Window | null = window.open('', '_blank');
    const URL = window.URL || window.webkitURL;
    const dataUrl: string = URL.createObjectURL(blob);
    if (win) {
      win.location.href = dataUrl;
    }
  }
};

const saveByteArray = (reportName: string, byte: Uint8Array): void => {
  const blob: Blob = new Blob([byte], { type: 'application/pdf' });
  const _win = window.navigator as any;

  if (_win && _win.msSaveOrOpenBlob) { // if IE
    _win.msSaveOrOpenBlob(blob);
  } else {
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName: string = reportName;
    link.download = fileName;
    link.click();
  }
}

export const downloadPdfStream = (response: any, filename: string = 'employee-profile.pdf') => {
  saveByteArray(filename, response);
};


//Create a tsx file for the constants
export const getBidCycleName = (bidcycle: {
  name: any,
}): string => {
  let text: string = isObject(bidcycle) && has(bidcycle, 'name') ? bidcycle.name : bidcycle;
  if (!isString(text) || !text) { text = NO_BID_CYCLE; }
  return text;
};


export const anyToTitleCase = (str: string = '') => startCase(toLower(str));

export const loadImg = (src: string, callback: () => void): void => {
  const sprite: HTMLImageElement = new Image();
  sprite.onload = callback;
  sprite.onerror = callback;
  sprite.src = src;
};

export const isNumeric = (value: any): boolean => isNumber(value) || (!isEmpty(value) && !isNaN(value));

// BEGIN FUSE SEARCH //
interface FuseOptions {
  shouldSort?: boolean;
  tokenize?: boolean;
  includeScore?: boolean;
  threshold?: number;
  location?: number;
  distance?: number;
  maxPatternLength?: number;
  minMatchCharLength?: number;
  keys?: string[];
}

const fuseOptions: FuseOptions = {
  shouldSort: true,
  tokenize: true,
  includeScore: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  keys: [
    'name',
  ],
};

const flagFuse = new Fuse(FLAG_COLORS, fuseOptions);

export const getFlagColorsByTextSearch = (t: string = '', limit: number = 5): string[] | false => {
  let value: string[] | false = false;
  if (t && isString(t)) {
    const result = flagFuse.search(t).map(({ item }) => item);
    const colors = get(result, '[0].item.colors', false);
    value = colors;
  }
  if (value) {
    value = take(value, limit);
  }
  return value;
};
// END FUSE SEARCH //
export const stopProp = (event: Event | {}): void => {
  const e: Event = get(event, 'target') || event;
  if (e && e.stopPropagation && isFunction(e.stopPropagation)) {
    e.stopPropagation();
  }
};

export const getContrastYIQ = (hexcolor: string): 'black' | 'white' => {
  const r: number = parseInt(hexcolor.substr(0, 2), 16);
  const g: number = parseInt(hexcolor.substr(2, 2), 16);
  const b: number = parseInt(hexcolor.substr(4, 2), 16);
  const yiq: number = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
};

// Supply a user's full name
// Returns background color and text color
// Supply a user's full name
// Returns background color and text color
export const getAvatarColor = (str: string, hashAdjuster: number = 0): { backgroundColor: string, color: 'black' | 'white' } | null => {
  if (str) {
    let hash: number = Math.floor(Math.random() * hashAdjuster);

    //replaced this loop with the for loop below

    // [...str].forEach((s: string, i: number) => {
    //   if (i) {
    //     hash = str.charCodeAt(i) + ((hash << 5) - hash);
    //   }
    // });


    for (let i = 0; i < str.length; i++) {
      if (i) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
    }

    const c: string = (hash & 0x00FFFFFF).toString(16).toUpperCase();

    const backgroundColor: string = '00000'.substring(0, 6 - c.length) + c;
    const color: 'black' | 'white' = getContrastYIQ(backgroundColor);

    const backgroundColorWithHash: string = `#${backgroundColor}`;

    return { backgroundColor: backgroundColorWithHash, color };
  }

  return null;
};

export function getBidListStats(bidList: any[], statuses: string, padWithZero: boolean): number | string {
  let numBids: any = 0;
  bidList.forEach((b: any) => {
    if (includes(statuses, b.status)) numBids += 1;
  });
  if (padWithZero) {
    numBids = padStart(toString(numBids), 2, '0');
  }
  return padWithZero ? numBids : numBids.toString();
}

export const isOnProxy = (): boolean => !!includes(get(window, 'location.host'), 'msappproxy');

export function move<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const element: T = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr;
}

export function getCustomLocation(loc: any, org: string): string {
  if (!loc) return NO_POST;
  // DC Post - org ex. GTM/EX/SDD
  if (get(loc, 'state') === 'DC') return org || NO_POST;
  // Domestic outside of DC - City, State
  if (get(loc, 'country') === 'USA') return `${get(loc, 'city')}, ${get(loc, 'state')}`;
  if (!get(loc, 'city') && !get(loc, 'country')) return '';
  // Foreign posts - City, Country
  let x: string = `${get(loc, 'city')}, ${get(loc, 'country')}`;
  if (!get(loc, 'city')) { x = get(loc, 'country'); }
  if (!get(loc, 'country')) { x = get(loc, 'city'); }
  return x;
}

export const closeSwal = (): void | null => {
  try {
    swal.close();
  } catch { return null; }
  return null;
};

export const useCloseSwalOnUnmount = (): void =>
  useEffect(() => () => {
    closeSwal();
  }, []);

export const splitByLineBreak = (text: string) => (text || '').split('\n\n\n');

export const convertQueryToString = (query: Record<string, any>): string | Record<string, any> => {
  let q: Record<string, any> = pickBy(query, identity);
  Object.keys(q).forEach((queryk: string) => {
    if (isArray(q[queryk])) {
      q[queryk] = q[queryk].join();
    }
    if (isString(q[queryk]) && !q[queryk]) {
      q[queryk] = undefined;
    }
  });
  q = queryString.stringify(q);
  return q;
};

export const determineEnv = (url: string): string => {
  const expression = /(dev1|dev2|tst1|tst2|asb|ivv1|uat|prd|cpy|localhost|metaphasedev)/i;
  const regex = new RegExp(expression);
  const match = url.match(regex);
  if (!match) {
    console.log('no valid env found');
    throw new Error('No valid env found');
  }
  return match[0];
};

// Search Tags: common.js, helper file, helper functions, common helper file, common file
