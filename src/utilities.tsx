import { useEffect, KeyboardEvent } from 'react';
import {
  cloneDeep, get, has, identity, includes, intersection, isArray, isEmpty, isEqual,
  isFunction, isNumber, isObject, isString, keys, lowerCase, merge as merge$, omit, orderBy,
  padStart, pick, pickBy, split, startCase, take, toLower, toString, transform, uniqBy
} from 'lodash';
import queryString from 'query-string'; //upgraded package
// import swal from '@sweetalert/with-react'; //need to check if this is compatible with typescript
import Fuse from 'fuse.js';
import shortid from 'shortid';
import Bowser from 'bowser';
import Scroll from 'react-scroll';
import numeral from 'numeral';
import { distanceInWords, format } from 'date-fns';

import { Bid, Grade, Region, Waiver } from './types';
import { LOGIN_REDIRECT, LOGIN_ROUTE, LOGOUT_ROUTE } from './login/routes';
import { NO_BID_CYCLE, NO_POST } from './Constants/SystemMessages';
import { VALID_PARAMS, VALID_TANDEM_PARAMS } from './Constants/EndpointParams';
import FLAG_COLORS from './Constants/FlagColors';

const scroll = Scroll.animateScroll;

export function localStorageFetchValue(key: string, value: any): { exists: boolean; count: number } {
  const saved = { exists: true, count: 0 };
  const retrievedKey = localStorage.getItem(key);
  let parsedKey = JSON.parse(retrievedKey ?? '');
  const arrayExists = Array.isArray(parsedKey);
  if (!arrayExists) {
    localStorage.setItem(key, JSON.stringify([]));
    parsedKey = JSON.parse(localStorage.getItem(key) ?? '');
  }
  saved.count = parsedKey.length;
  const refIsSaved = parsedKey.indexOf(value);
  if (refIsSaved !== -1) {
    saved.exists = true;
  } else {
    saved.exists = false;
  }
  return saved;
}

const dispatchLs = (key: string): void => {
  // create, initialize, and dispatch event
  const event = document.createEvent('Event');
  event.initEvent(`${key}-ls`, true, true);
  document.dispatchEvent(event);
};

export function localStorageSetKey(key: string, value: string): void {
  localStorage.setItem(key, value);
  dispatchLs(key);
}

// toggling a specific value in an array
// useDispatch: only dispatch an event if true.
// onlyDelete: don't add, only delete from the array
export function localStorageToggleValue(key: string, value: any, useDispatch: boolean = true, onlyDelete: boolean = false): void {
  const existingArray = JSON.parse(localStorage.getItem(key) ?? '') || [];
  // check if the value matches, either as a string or as a number
  let indexOfId = existingArray.indexOf(value);
  if (indexOfId <= -1) {
    indexOfId = existingArray.indexOf(Number(value));
  }
  if (indexOfId <= -1) {
    indexOfId = existingArray.indexOf(toString(value));
  }
  if (indexOfId !== -1) {
    existingArray.splice(indexOfId, 1);
    localStorage.setItem(key,
      JSON.stringify(existingArray));
    if (useDispatch) {
      dispatchLs(key);
    }
  } else if (!onlyDelete) {
    existingArray.push(value);
    localStorage.setItem(key,
      JSON.stringify(existingArray));
    if (useDispatch) {
      dispatchLs(key);
    }
  }
}

export function validStateEmail(email: string): boolean {
  return /.+@state.gov$/.test(email.trim());
}

export function hasValidToken(): boolean {
  try {
    /* eslint-disable no-unused-vars */
    const token = JSON.parse(localStorage.getItem('token') ?? '');
    /* eslint-enable no-unused-vars */
    return true;
  } catch (error) {
    // If token exists and is bad (maybe user injected)
    // Drop the token anyways just so we can have the container
    // render login directly
    localStorage.removeItem('token');
    return false;
  }
}

export function fetchUserToken(): (string | null) {
  const key = JSON.parse(localStorage.getItem('token') ?? '');
  if (key) {
    return `Token ${key}`;
  }
  return null;
}

export function fetchJWT(): (string | null) {
  const key = sessionStorage.getItem('jwt');
  if (key) {
    return key;
  }
  return null;
}

export const sortTods = (data: any): any => {
  const sortingArray = ['T', 'C', 'H', 'O', 'V', '1', '2', 'U', 'A', 'B', 'E', 'N', 'S', 'G', 'D', 'F', 'R', 'Q', 'J', 'I', 'P', 'W', 'L', 'K', 'M', 'Y', 'Z', 'X'];
  // eslint-disable-next-line no-confusing-arrow
  return orderBy(data, o => o ? sortingArray.indexOf(o.code) : sortingArray.length);
};

export const propSort = (propName: string, nestedPropName?: string) => (a: any, b: any): number => {
  let A = get(a, `${propName}.${nestedPropName}`) || get(a, propName);
  A = lowerCase(toString(A));
  let B = get(b, `${propName}.${nestedPropName}`) || get(b, propName);
  B = lowerCase(toString(B));
  if (A < B) { // sort string ascending
    return -1;
  }
  if (A > B) { return 1; }
  return 0; // default return value (no sorting)
};

// Custom grade sorting
export const sortGrades = (a: Grade, b: Grade): number => {
  const sortingArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '00', 'CM', 'MC', 'OC', 'OM'];
  const A = a.code;
  const B = b.code;

  // if grade is not in sortingArray, push to bottom of list.
  const indexOfA = sortingArray.indexOf(A) >= 0 ? sortingArray.indexOf(A) : sortingArray.length;
  const indexOfB = sortingArray.indexOf(B) >= 0 ? sortingArray.indexOf(B) : sortingArray.length;

  if (indexOfA < indexOfB) {
    return -1;
  }
  if (indexOfA > indexOfB) { return 1; }
  return 0;
};

// function to find the Region filters
export const formExploreRegionDropdown = (filters: any[]): Region[] => {
  function filterRegion(filterItem: { item: { title: string; }; }) {
    return (filterItem.item && filterItem.item.title === 'Bureau');
  }
  // set an array so we can render in case we don't find Region
  let regions: Region[] = [];
  // find the Region filters
  const foundRegion = filters.find(filterRegion);
  // if found, set foundRegion to a copy of the data
  if (foundRegion && foundRegion.data) { regions = foundRegion.data.slice(); }
  if (regions.length) {
    regions.forEach((region, i) => {
      // set up our prop names so that SelectForm can read them
      regions[i].text = region.long_description ?? '';
      regions[i].value = region.code;
    });
    // also add a placeholder to the top
    regions.unshift(
      {
        text: 'Select a Bureau',
        value: '',
        disabled: true,
      },
    );
  }
  return regions;
};

// see all props at https://github.com/fisshy/react-scroll#propsoptions
const defaultScrollConfig = {
  duration: 900,
  delay: 270,
  smooth: 'easeOutQuad',
};

export const scrollTo = (num: number, config = {}): void => {
  scroll.scrollTo(num, { ...defaultScrollConfig, ...config });
};

export const scrollToTop = (config = {}): void => {
  scroll.scrollToTop({ ...defaultScrollConfig, ...config });
};


export const scrollToId = ({ el, config = {} }: any): void => {
  // Get an element's distance from the top of the page
  const getElemDistance = (elem: HTMLElement) => {
    let location = 0;
    if (elem.offsetParent) {
      // eslint-disable-next-line no-loops/no-loops
      do {
        location += elem.offsetTop;
        elem = elem.offsetParent as HTMLElement; // eslint-disable-line
      } while (elem);
    }
    return location >= 0 ? location : 0;
  };
  const elem = document.querySelector(el);
  const location = getElemDistance(elem);

  scrollTo(location, config);
};

// When we want to grab a label, but aren't sure which one exists.
// We set custom ones first in the list.
export const getItemLabel = (itemData: any): string =>
  itemData.custom_description || itemData.long_description ||
  itemData.description || itemData.code || itemData.name;

// abcde 4 // a...
// Shortens strings to varying lengths
export const shortenString = (string: string, shortenTo: number = 250, suffix: (string | null) = '...'): string => {
  let newString = string;
  let newSuffix = suffix;
  if (!newSuffix) {
    newSuffix = '';
  }
  // return the suffix even if the shortenTo is less than its length, empty string if null
  if (shortenTo < newSuffix.length) {
    return suffix ?? '';
  }
  if (string && string.length > shortenTo) {
    // shorten to the shortenTo param, less the length of our suffix
    newString = string.slice(0, shortenTo - newSuffix.length);
    // in case the last character(s) was whitespace
    newString = newString.trim();
    // append suffix
    newString += newSuffix;
  }
  // return the string
  return newString;
};

// TODO: Clarify type of array, is a variety of objects that have the id attribute or only one
// for checking if a favorite_position exists in the user's profile
export const existsInArray = (ref: any, array: any[]): boolean => {
  let found = false;
  array.forEach((i) => {
    if (get(i, 'id') && ref && `${i.id}` === `${ref}`) {
      found = true;
    }
  });
  return found;
};

// Check if there is an object in the array with a value in the nested prop 
// strictly equal to the given ref value
// Used for checking if a position is in the user's bid list
export const existsInNestedObject = (ref: any, array: any[], prop: string = 'position_info', nestedProp: string = 'id'): boolean => {
  const array$ = isArray(array) ? array : [];
  let found = false;
  array$.some((i) => {
    if (i[prop] && i[prop][nestedProp] === ref) {
      found = i;
      return true;
    }
    return false;
  });
  return found;
};

// clean our query object for use with the saved search endpoint
// make sure query object only uses real parameters (no extras that may have been added to the URL)
// we also want to get rid of page and limit,
// since those aren't valid params in the saved search endpoint
export const cleanQueryParams = (q: any): any => {
  let object = Object.assign({}, q);
  object = omit(object, ['count']);
  Object.keys(object).forEach((key) => {
    if (VALID_PARAMS.indexOf(key) <= -1) {
      delete object[key];
    }
  });
  return object;
};

export const cleanTandemQueryParams = (q: any): any => {
  const object = Object.assign({}, q);
  Object.keys(object).forEach((key) => {
    if (VALID_TANDEM_PARAMS.indexOf(key) <= -1 && VALID_PARAMS.indexOf(key) <= -1) {
      delete object[key];
    }
  });
  return object;
};

export const ifEnter = (event: KeyboardEvent): boolean => {
  if (event.keyCode === 13) {
    return true;
  }
  return false;
};

// convert a query object to a query string
export const formQueryString = (queryObject: any): string => queryString.stringify(queryObject);

// remove duplicates from an array by object property
export const removeDuplicates = (myArr: any[], props: string[] = ['']): any => (
  uniqBy(myArr, elem => props.map(m => elem[m]).join())
);

// Format date for notifications.
// We want to use minutes for recent notifications, but days for older ones.
export const getTimeDistanceInWords = (dateToCompare: Date, date: Date = new Date(), options = {}): string =>
  `${distanceInWords(dateToCompare, date, options)} ago`;

// Format the date into our preferred format.
// We can take any valid date and convert it into M.D.YYYY format, or any
// format provided with the dateFormat param.
export const formatDate = (date: string | null, dateFormat: string = 'MM/DD/YYYY'): (string | null) => {
  if (date) {
    // then format the date with dateFormat
    const formattedDate = format(date, dateFormat);
    // and finally return the formatted date
    return formattedDate;
  }
  return null;
};

// Prefix asset paths with the PUBLIC_URL
export const getAssetPath = (strAssetPath: string): string =>
  `${process.env.PUBLIC_URL}${strAssetPath}`.replace('//', '/');

// Filter by objects that contain a specified prop(s) that match a string.
// Check if any of "array"'s objects' "props" contain "keyword"
export const filterByProps = (keyword: string, props: string[] = [], array: any[] = []): any[] => {
  // keyword should have length
  if (keyword.length) {
    // filter the array and return its value
    return array.filter((data) => {
      let doesMatch = true;
      // iterate through props and see if keyword is found in their values
      keyword.split(' ').filter(f => f.length).forEach((k) => {
        let doesMatch$ = false;
        props.forEach((prop) => {
          if (doesMatch) {
            // if so, doesMatch = true
            if (lowerCase(toString(data[prop])).indexOf(lowerCase(toString(k))) !== -1) {
              doesMatch$ = true;
            }
          }
        });
        doesMatch = doesMatch$;
      });
      // if keyword was found in at least one of the props, doesMatch should be true
      return doesMatch;
    });
  }
  // if keyword length === 0, return the unfiltered array
  return array;
};

// Focus an element on the page based on its ID. Pass an optional, positive timeout number to
// execute the focus within a timeout.
export const focusById = (id: string, timeout?: number, config: { preventScroll?: boolean } = {}): void => {
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

// Determine which header type to focus. We always have a page title h1, so we
// search for 1. The second h1, 2. the first h2, 3. the first h3, and focus which ever
// is found first.
export const focusByFirstOfHeader = (timeout: number = 1): void => {
  setTimeout(() => {
    let element: HTMLCollectionOf<HTMLHeadingElement> | HTMLHeadingElement = document.getElementsByTagName('h1');
    element = (element && element[1]) || document.getElementsByTagName('h2')[0] || document.getElementsByTagName('h3')[0];
    if (element) {
      element.setAttribute('tabindex', '-1');
      element.focus();
    }
  }, timeout);
};

// Give objects in an array the necessary value and label props needed when
// they're used in a multi-select list.
export const wrapForMultiSelect = (options: any[], valueProp: string, labelProp: string): any[] => options.slice().map((f) => {
  const newObj = { ...f };
  newObj.value = f[valueProp];
  newObj.label = f[labelProp];
  return newObj;
});

// Provide two arrays, a sourceArray and a compareArray, and a property to check (propToCheck),
// and this function will return objects from the sourceArray where a given propToCheck value exists
// in at least one object in both arrays.
export const returnObjectsWherePropMatches = (sourceArray: any[] = [], compareArray: any[] = [], propToCheck: string): any[] =>
  sourceArray.filter(o1 => compareArray.some(o2 => o1[propToCheck] === o2[propToCheck]));

// Convert a numerator and a denominator to a percentage.
export const numbersToPercentString = (numerator: number, denominator: number, percentFormat: string = '0.0%'): string => {
  const fraction = numerator / denominator;
  const percentage = numeral(fraction).format(percentFormat);
  return percentage;
};

export const formatBidTitle = (bid: Bid): string => `${bid.position.title} (${bid.position.position_number})`;

export const formatWaiverTitle = (waiver: Waiver): string => `${waiver.position} - ${waiver.category.toUpperCase()}`;

// for traversing nested objects.
// obj should be an object, such as { a: { b: 1, c: { d: 2 } } }
// path should be a string to the desired path - "a.b.c.d"
// defaultToReturn should be the default value you want to return if the traversal fails
export const propOrDefault = (obj: any, path: string, defaultToReturn: any = null): any =>
  get(obj, path, defaultToReturn);

// Return the correct object from the bidStatistics array/object.
// If it doesn't exist, return an empty object.
export const getBidStatisticsObject = (bidStatistics: any | any[]): any => {
  if (Array.isArray(bidStatistics) && bidStatistics.length) {
    return bidStatistics[0];
  } else if (isObject(bidStatistics)) {
    return bidStatistics;
  }
  return {};
};

// replace spaces with hyphens so that id attributes are valid
export const formatIdSpacing = (id?: string | number | null): string => {
  if (id && toString(id)) {
    let idString = toString(id);
    idString = split(idString, ' ').join('-');
    // remove any non-alphanumeric character, excluding hyphen
    idString = idString.replace(/[^a-zA-Z0-9 -]/g, '');
    return idString;
  }
  // if id is not defined, return a shortid
  return shortid.generate();
};

// provide an array of permissions to check if they all exist in an array of user permissions
export const userHasPermissions = (permissionsToCheck: string[] = [], userPermissions: string[] = []): boolean =>
  permissionsToCheck.every(val => userPermissions.indexOf(val) >= 0);

// provide an array of permissions to check if at least one exists in an array of user permissions
export const userHasSomePermissions = (permissionsToCheck: string[] = [], userPermissions: string[] = []): boolean =>
  !!intersection(permissionsToCheck, userPermissions).length;

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
export const getAccessiblePositionNumber = (positionNumber?: string | null) => {
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
export const getAriaValue = (e: string | number | boolean | null) => {
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
export const getBidCycleName = (bidcycle: string | object): string => {
  // TODO: Reference bidcycle type once determined instead of any
  let text: string = isObject(bidcycle) && has(bidcycle, 'name') ? (bidcycle as any).name : bidcycle;
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

export function getBidListStats(bidList: any[], statuses: string[], padWithZero?: boolean): number | string {
  let numBids: number = 0;
  bidList.forEach((b: any) => {
    if (includes(statuses, b.status)) numBids += 1;
  });
  if (padWithZero) {
    return padStart(toString(numBids), 2, '0').toString();
  }
  return numBids;
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


//These will be added back after the swal package is updated to be compatible with typescript
// export const closeSwal = (): void | null => {
//   try {
//     swal.close();
//   } catch { return null; }
//   return null;
// };

// export const useCloseSwalOnUnmount = (): void =>
//   useEffect(() => () => {
//     closeSwal();
//   }, []);

export const splitByLineBreak = (text: string | null) => (text || '').split('\n\n\n');

export const convertQueryToString = (query: Record<string, any>): string | Record<string, any> => {
  let q: any = pickBy(query, identity);
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
