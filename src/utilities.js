import Scroll from 'react-scroll';
import { distanceInWords, format } from 'date-fns';
import { cloneDeep, get, isEqual, isNumber, isObject, keys, merge as merge$, transform } from 'lodash';
import numeral from 'numeral';
import queryString from 'query-string';
import shortid from 'shortid';
import { VALID_PARAMS } from './Constants/EndpointParams';
import { LOGOUT_ROUTE, LOGIN_ROUTE, LOGIN_REDIRECT } from './login/routes';

const scroll = Scroll.animateScroll;

export function localStorageFetchValue(key, value) {
  const saved = { exists: true, count: 0 };
  const retrievedKey = localStorage.getItem(key);
  let parsedKey = JSON.parse(retrievedKey);
  const arrayExists = Array.isArray(parsedKey);
  if (!arrayExists) {
    localStorage.setItem(key, JSON.stringify([]));
    parsedKey = JSON.parse(localStorage.getItem(key));
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

export function localStorageToggleValue(key, value) {
  const existingArray = JSON.parse(localStorage.getItem(key)) || [];
  const indexOfId = existingArray.indexOf(value);
  if (indexOfId !== -1) {
    existingArray.splice(indexOfId, 1);
    localStorage.setItem(key,
        JSON.stringify(existingArray));
  } else {
    existingArray.push(value);
    localStorage.setItem(key,
        JSON.stringify(existingArray));
  }
}

export function validStateEmail(email) {
  return /.+@state.gov$/.test(email.trim());
}

export function hasValidToken() {
  try {
    /* eslint-disable no-unused-vars */
    const token = JSON.parse(localStorage.getItem('token'));
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

export function fetchUserToken() {
  const key = JSON.parse(localStorage.getItem('token'));
  if (key) {
    return `Token ${key}`;
  }
  return null;
}

export const pillSort = (a, b) => {
  const A = (a.description || a.code).toString().toLowerCase();
  const B = (b.description || b.code).toString().toLowerCase();
  if (A < B) { // sort string ascending
    return -1;
  }
  if (A > B) { return 1; }
  return 0; // default return value (no sorting)
};

export const propSort = (propName, nestedPropName) => (a, b) => {
  let A = a[propName];
  if (nestedPropName) { A = a[propName][nestedPropName]; }
  A = A.toString().toLowerCase();
  let B = b[propName];
  if (nestedPropName) { B = b[propName][nestedPropName]; }
  B = B.toString().toLowerCase();
  if (A < B) { // sort string ascending
    return -1;
  }
  if (A > B) { return 1; }
  return 0; // default return value (no sorting)
};

// Custom grade sorting
export const sortGrades = (a, b) => {
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
export const formExploreRegionDropdown = (filters) => {
  function filterRegion(filterItem) {
    return (filterItem.item && filterItem.item.title === 'Bureau');
  }
  // set an array so we can render in case we don't find Region
  let regions = [];
  // find the Region filters
  const foundRegion = filters.find(filterRegion);
  // if found, set foundRegion to a copy of the data
  if (foundRegion && foundRegion.data) { regions = foundRegion.data.slice(); }
  if (regions.length) {
    regions.forEach((region, i) => {
      // set up our prop names so that SelectForm can read them
      regions[i].text = region.long_description;
      regions[i].value = region.code;
    });
    // also add a placeholder to the top
    regions.unshift(
      {
        text: 'Select a Regional Bureau',
        value: '',
        disabled: true,
      },
    );
  }
  return regions;
};

// see all props at https://github.com/fisshy/react-scroll#propsoptions
const defaultScrollConfig = {
  duration: 700,
  delay: 270,
  smooth: 'easeOutQuad',
};

export const scrollToTop = (config = defaultScrollConfig) => {
  scroll.scrollToTop(config);
};

// When we want to grab a label, but aren't sure which one exists.
// We set custom ones first in the list.
export const getItemLabel = itemData =>
  itemData.custom_description || itemData.long_description ||
  itemData.description || itemData.code || itemData.name;

// abcde 4 // a...
// Shortens strings to varying lengths
export const shortenString = (string, shortenTo = 250, suffix = '...') => {
  let newString = string;
  let newSuffix = suffix;
  if (!newSuffix) {
    newSuffix = '';
  }
  // return the suffix even if the shortenTo is less than its length
  if (shortenTo < newSuffix.length) {
    return suffix;
  }
  if (string.length > shortenTo) {
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

// for checking if a favorite_position exists in the user's profile
export const existsInArray = (ref, array) => {
  let found = false;
  array.forEach((i) => {
    if (i.id === ref) {
      found = true;
    }
  });
  return found;
};

// for checking if a position is in the user's bid list
export const existsInNestedObject = (ref, array, prop = 'position', nestedProp = 'id') => {
  let found = false;
  array.forEach((i) => {
    if (i[prop] && i[prop][nestedProp] === ref) {
      found = true;
    }
  });
  return found;
};

// clean our query object for use with the saved search endpoint
// make sure query object only uses real parameters (no extras that may have been added to the URL)
// we also want to get rid of page and limit,
// since those aren't valid params in the saved search endpoint
export const cleanQueryParams = (q) => {
  const object = Object.assign({}, q);
  Object.keys(object).forEach((key) => {
    if (VALID_PARAMS.indexOf(key) <= -1) {
      delete object[key];
    }
  });
  return object;
};

export const ifEnter = (e) => {
  if (e.keyCode === 13) {
    return true;
  }
  return false;
};

// convert a query object to a query string
export const formQueryString = queryObject => queryString.stringify(queryObject);

// remove duplicates from an array by object property
export const removeDuplicates = (myArr, prop) => (
    myArr.filter((obj, pos, arr) => arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos)
);

// Format date for notifications.
// We want to use minutes for recent notifications, but days for older ones.
export const getTimeDistanceInWords = (dateToCompare, date = new Date(), options = {}) =>
  `${distanceInWords(dateToCompare, date, options)} ago`;

// Format the date into our preferred format.
// We can take any valid date and convert it into M.D.YYYY format, or any
// format provided with the dateFormat param.
export const formatDate = (date, dateFormat = 'MM/DD/YYYY') => {
  if (date) {
    // then format the date with dateFormat
    const formattedDate = format(date, dateFormat);
    // and finally return the formatted date
    return formattedDate;
  }
  return null;
};

// Prefix asset paths with the PUBLIC_URL
export const getAssetPath = strAssetPath =>
  `${process.env.PUBLIC_URL}${strAssetPath}`.replace('//', '/');

// Filter by objects that contain a specified prop(s) that match a string.
// Check if any of "array"'s objects' "props" contain "keyword"
export const filterByProps = (keyword, props = [], array = []) => {
  // keyword should have length
  if (keyword.length) {
    // filter the array and return its value
    return array.filter((data) => {
      let doesMatch;
      // iterate through props and see if keyword is found in their values
      props.forEach((prop) => {
        // if so, doesMatch = true
        if (data[prop].toString().toLowerCase().indexOf(keyword.toString().toLowerCase()) !== -1) {
          doesMatch = true;
        }
      });
      // if keyword was found in at least one of the props, doesMatch should be true
      return doesMatch;
    },
    );
  }
  // if keyword length === 0, return the unfiltered array
  return array;
};

// Focus an element on the page based on its ID. Pass an optional, positive timeout number to
// execute the focus within a timeout.
export const focusById = (id, timeout) => {
  let element = document.getElementById(id);
  if (!timeout) {
    if (element) { element.focus(); }
  } else {
    setTimeout(() => {
      element = document.getElementById(id);
      if (element) {
        element.focus();
      }
    }, timeout);
  }
};

// Determine which header type to focus. We always have a page title h1, so we
// search for 1. The second h1, 2. the first h2, 3. the first h3, and focus which ever
// is found first.
export const focusByFirstOfHeader = (timeout = 1) => {
  setTimeout(() => {
    let element = document.getElementsByTagName('h1');
    if (element) { element = element[1]; }
    if (!element) { element = document.getElementsByTagName('h2')[0]; }
    if (!element) { element = document.getElementsByTagName('h3')[0]; }
    if (element) { element.setAttribute('tabindex', '-1'); }
    if (element) {
      element.focus();
    }
  }, timeout);
};

// Give objects in an array the necessary value and label props needed when
// they're used in a multi-select list.
export const wrapForMultiSelect = (options, valueProp, labelProp) => options.slice().map((f) => {
  const newObj = { ...f };
  newObj.value = f[valueProp];
  newObj.label = f[labelProp];
  return newObj;
});

// Provide two arrays, a sourceArray and a compareArray, and a property to check (propToCheck),
// and this function will return objects from the sourceArray where a given propToCheck value exists
// in at least one object in both arrays.
export const returnObjectsWherePropMatches = (sourceArray = [], compareArray = [], propToCheck) =>
  sourceArray.filter(o1 => compareArray.some(o2 => o1[propToCheck] === o2[propToCheck]));

// Convert a numerator and a denominator to a percentage.
export const numbersToPercentString = (numerator, denominator, percentFormat = '0.0%') => {
  const fraction = numerator / denominator;
  const percentage = numeral(fraction).format(percentFormat);
  return percentage;
};

export const formatBidTitle = bid => `${bid.position.title} (${bid.position.position_number})`;

export const formatWaiverTitle = waiver => `${waiver.position} - ${waiver.category.toUpperCase()}`;

// for traversing nested objects.
// obj should be an object, such as { a: { b: 1, c: { d: 2 } } }
// path should be a string to the desired path - "a.b.c.d"
// defaultToReturn should be the default value you want to return if the traversal fails
export const propOrDefault = (obj, path, defaultToReturn = null) =>
  get(obj, path, defaultToReturn);

// Return the correct object from the bidStatisticsArray.
// If it doesn't exist, return an empty object.
export const getBidStatisticsObject = (bidStatisticsArray) => {
  if (Array.isArray(bidStatisticsArray) && bidStatisticsArray.length) {
    return bidStatisticsArray[0];
  }
  return {};
};

// replace spaces with hyphens so that id attributes are valid
export const formatIdSpacing = (id) => {
  if (id) {
    let idString = id.toString();
    idString = idString.split(' ').join('-');
    // remove any non-alphanumeric character, excluding hyphen
    idString = idString.replace(/[^a-zA-Z0-9 -]/g, '');
    return idString;
  }
  // if id is not defined, return a shortid
  return shortid.generate();
};

// provide an array of permissions to check if they all exist in an array of user permissions
export const userHasPermissions = (permissionsToCheck = [], userPermissions = []) =>
  permissionsToCheck.every(val => userPermissions.indexOf(val) >= 0);

// Takes multiple saved search objects and combines them into one object,
// where the value for each property is an array of all individual values
// found across the different saved search objects.
// See Constants/PropTypes SAVED_SEARCH_OBJECT
export const mapSavedSearchesToSingleQuery = (savedSearchesObject) => {
  const clonedSavedSearchesObject = cloneDeep(savedSearchesObject);
  const clonedSavedSearches = clonedSavedSearchesObject.results;
  const mappedSearchTerms = clonedSavedSearches.slice().map(s => s.filters);
  const mappedSearchTermsFormatted = mappedSearchTerms.map((m) => {
    const filtered = m;
    Object.keys(m).forEach((k) => { if (!Array.isArray(filtered[k])) { filtered[k] = filtered[k].split(','); } });
    return filtered;
  });

  function merge(...rest) {
    return [].reduce.call(rest, (acc, x) => {
      const acc$ = merge$({}, acc);

      keys(x).forEach((k) => {
        acc$[k] = (acc$[k] || []).concat(x[k]);
        acc$[k] = acc$[k].filter((item, index, self) => self.indexOf(item) === index);
      });

      return acc$;
    }, {});
  }

  const mergedFilters = mappedSearchTermsFormatted.length ?
    merge(...mappedSearchTermsFormatted) : {};

  const mergedFiltersWithoutArrays = { ...mergedFilters };

  Object.keys(mergedFilters)
    .forEach((f) => {
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
export const mapSavedSearchToDescriptions = (savedSearchObject, mappedParams) => {
  const clonedSearchObject = cloneDeep(savedSearchObject);
  const searchKeys = Object.keys(clonedSearchObject);

  searchKeys.forEach((s) => { clonedSearchObject[s] = clonedSearchObject[s].split(','); });

  const arrayToReturn = [];

  // Push the keyword search, since it won't match up with a real filter
  if (savedSearchObject.q) {
    arrayToReturn.push(savedSearchObject.q);
  }

  searchKeys.forEach((s) => {
    clonedSearchObject[s].forEach((c) => {
      const foundParam = mappedParams.find(m => m.selectionRef === s && m.codeRef === c);
      if (foundParam && foundParam.description) {
        arrayToReturn.push(foundParam.description);
      }
    });
  });

  return arrayToReturn;
};

export const getPostName = (post, defaultValue = null) => {
  let valueToReturn = defaultValue;
  if (propOrDefault(post, 'location.city') && propOrDefault(post, 'location.country') === 'United States') {
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
export const getAccessiblePositionNumber = (positionNumber) => {
  if (positionNumber) {
    return positionNumber.split('').join(' ');
  }
  return null;
};

// returns a percentage string for differential data.
export const getDifferentialPercentage = (differential, defaultValue = '') => {
  if (isNumber(differential)) {
    return `${differential}%`;
  }
  return defaultValue;
};

// redirect to express /login route
export const redirectToLogin = () => {
  const prefix = process.env.PUBLIC_URL || '';
  window.location.assign(`${prefix}${LOGIN_ROUTE}`);
};

// redirect to react /loginRedirect route
export const redirectToLoginRedirect = () => {
  const prefix = process.env.PUBLIC_URL || '';
  window.location.assign(`${prefix}${LOGIN_REDIRECT}`);
};

// redirect to express /logout route
export const redirectToLogout = () => {
  const prefix = process.env.PUBLIC_URL || '';
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
export const difference = (base, object) => transform(object, (result, value, key) => {
  /* eslint-disable no-param-reassign */
  if (!isEqual(value, base[key])) {
    result[key] = isObject(value) && isObject(base[key]) ?
      difference(base[key], value) :
      value;
  }
  /* eslint-enable no-param-reassign */
});
