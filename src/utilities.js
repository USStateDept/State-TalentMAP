import Scroll from 'react-scroll';

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

// keep sort functions separate in case we want to adjust the logic for some but not others
export const titleSort = (a, b) => {
  const A = a.title.toLowerCase();
  const B = b.title.toLowerCase();
  if (A < B) { // sort string ascending
    return -1;
  }
  if (A > B) { return 1; }
  return 0; // default return value (no sorting)
};

export const descriptionSort = (a, b) => {
  const A = a.description.toLowerCase();
  const B = b.description.toLowerCase();
  if (A < B) { // sort string ascending
    return -1;
  }
  if (A > B) { return 1; }
  return 0; // default return value (no sorting)
};

export const pillSort = (a, b) => {
  const A = (a.description || a.code).toLowerCase();
  const B = (b.description || b.code).toLowerCase();
  if (A < B) { // sort string ascending
    return -1;
  }
  if (A > B) { return 1; }
  return 0; // default return value (no sorting)
};

// function to find the Region filters
export const formExploreRegionDropdown = (filters) => {
  function filterRegion(filterItem) {
    return (filterItem.item && filterItem.item.title === 'Region');
  }
  // set an array so we can render in case we don't find Region
  let regions = [];
  // find the Region filters
  // use .filter and [0] instead of .find because .find breaks pa11y test
  const foundRegion = filters.filter(filterRegion)[0];
  // if found, set foundRegion to a copy of the data
  if (foundRegion && foundRegion.data) { regions = foundRegion.data.slice(); }
  if (regions) {
    regions.forEach((region, i) => {
      // set up our prop names so that SelectForm can read them
      regions[i].text = region.long_description;
      regions[i].value = region.code;
    });
    // also add a placeholder to the top
    regions.unshift(
      {
        text: 'Select a region',
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

// when we want to grab a label, but aren't sure which one exists
export const getItemLabel = itemData =>
  itemData.long_description || itemData.description || itemData.code;

// shortens descriptions to varying lengths
export const shortenString = (string, shortenBy = 250) => {
  let newString = string;
  if (string.length > shortenBy) {
    newString = string.slice(0, shortenBy); // shorten by shortenBy
    newString = newString.trim(); // in case the last character(s) was whitespace
    newString += '...'; // append ellipsis
    return newString; // return newly formed string
  }
  return newString;
};
