import Scroll from 'react-scroll';
import queryString from 'query-string';
import distanceInWords from 'date-fns/distance_in_words';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import { VALID_PARAMS } from './Constants/EndpointParams';

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

export function fetchUserToken() {
  const key = JSON.parse(localStorage.getItem('token'));
  const token = `Token ${key}`;
  return token;
}

export const pillSort = (a, b) => {
  const A = (a.description || a.code).toLowerCase();
  const B = (b.description || b.code).toLowerCase();
  if (A < B) { // sort string ascending
    return -1;
  }
  if (A > B) { return 1; }
  return 0; // default return value (no sorting)
};

export const propSort = propName => (a, b) => {
  const A = a[propName].toLowerCase();
  const B = b[propName].toLowerCase();
  if (A < B) { // sort string ascending
    return -1;
  }
  if (A > B) { return 1; }
  return 0; // default return value (no sorting)
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
  itemData.description || itemData.code;

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

// Format the date into out preferred format.
// We can take any valid date and convert it into M.D.YYYY format, or any
// format provided with the dateFormat param. We set an addOneDay param,
// because our API's format of "YYYY.MM.DD", when formatted, gets thrown
// off by a day.
export const formatDate = (date, dateFormat = 'M.D.YYYY', addOneDay = true) => {
  if (date) {
    let newDate = new Date(date);
    // check that addOneDay is true. If so, add 1 day.
    if (addOneDay) { newDate = addDays(newDate, 1); }
    // then format the date with dateFormat
    const formattedDate = format(newDate, dateFormat);
    // and finally return the formatte date
    return formattedDate;
  }
  return null;
};

// Prefix asset paths with the PUBLIC_URL
export const getAssetPath = strAssetPath =>
  `${process.env.PUBLIC_URL}${strAssetPath}`;
