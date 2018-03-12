import Scroll from 'react-scroll';
import queryString from 'query-string';
import distanceInWords from 'date-fns/distance_in_words';
import format from 'date-fns/format';
import numeral from 'numeral';
import cloneDeep from 'lodash/cloneDeep';
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

export const propSort = propName => (a, b) => {
  const A = a[propName].toString().toLowerCase();
  const B = b[propName].toString().toLowerCase();
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

// Format the date into our preferred format.
// We can take any valid date and convert it into M.D.YYYY format, or any
// format provided with the dateFormat param.
export const formatDate = (date, dateFormat = 'M.D.YYYY') => {
  if (date) {
    // then format the date with dateFormat
    const formattedDate = format(date, dateFormat);
    // and finally return the formatte date
    return formattedDate;
  }
  return null;
};

// Prefix asset paths with the PUBLIC_URL
export const getAssetPath = strAssetPath =>
  `${process.env.PUBLIC_URL}${strAssetPath}`;

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

// focus an element on the page based on its ID
export const focusById = (id) => {
  const element = document.getElementById(id);
  if (element) { element.focus(); }
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
export const propOrDefault = (obj, path, defaultToReturn = null) => {
  // split the path into individual strings
  const args = path.split('.');

  let valueToReturn = obj;

  // function to determine if object contains the next i property
  const returnSubProp = i => Object.prototype.hasOwnProperty.call(valueToReturn, args[i]);

  // iterate through each arg and change valueToReturn to the next i property if it exists,
  // otherwise return the defaultToReturn
  for (let i = 0; i < args.length; i += 1) {
    if (valueToReturn && returnSubProp(i)) {
      valueToReturn = valueToReturn[args[i]];
    } else if (!valueToReturn || !returnSubProp(i)) {
      return defaultToReturn;
    }
  }
  return valueToReturn;
};

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
    const idString = id.toString();
    return idString.split(' ').join('-');
  }
  // if id is not defined, return null
  return null;
};

// provide an array of permissions to check if they all exist in an array of user permissions
export const userHasPermissions = (permissionsToCheck = [], userPermissions = []) =>
  permissionsToCheck.every(val => userPermissions.indexOf(val) >= 0);

export const mapSavedSearchesToSingleQuery = (savedSearchesObject) => {
  const clonedSavedSearches = cloneDeep(savedSearchesObject.results);
  const mappedSearchTerms = clonedSavedSearches.slice().map(s => s.filters);
  const mappedSearchTermsFormatted = mappedSearchTerms.map((m) => {
    const filtered = m;
    // eslint-disable-next-line
    Object.keys(m).forEach(k => { if (!Array.isArray(filtered[k])){ filtered[k] = filtered[k].split(',') }});
    return filtered;
  });

  const merge = function (/* ...objs */) {
    // eslint-disable-next-line
    return [].reduce.call(arguments, (acc, x) => {
      Object.keys(x).forEach((k) => {
        acc[k] = (acc[k] || []).concat(x[k]);
        acc[k] = acc[k].filter((item, index, self) => self.indexOf(item) === index);
      });
      return acc;
    }, {});
  };

  const mergedFilters = mappedSearchTermsFormatted.length ?
    merge(...mappedSearchTermsFormatted) : {};

  const mergedFiltersWithoutArrays = { ...mergedFilters };

  // eslint-disable-next-line
  Object.keys(mergedFilters).forEach(f => { if (Array.isArray(mergedFilters[f])){ mergedFiltersWithoutArrays[f] = mergedFilters[f].join() } });

  const newQuery = mergedFiltersWithoutArrays;

  return newQuery;
};

export const mapSavedSearchToDescriptions = (savedSearchObject, mappedParams) => {
  const clonedSearchObject = cloneDeep(savedSearchObject);
  const searchKeys = Object.keys(clonedSearchObject);
  // eslint-disable-next-line
  searchKeys.forEach(s => clonedSearchObject[s] = clonedSearchObject[s].split(','));

  const arrayToReturn = [];

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
