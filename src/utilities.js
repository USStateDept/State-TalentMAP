import axios from 'axios';

export const ajax = url => (
  axios.get(url)
    .then((res) => {
      const data = res;
      return data;
    })
);

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
  const existingArray = JSON.parse(localStorage.getItem(key));
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

export default ajax;
