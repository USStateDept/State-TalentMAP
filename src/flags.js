import { get } from 'lodash';

export const getFlags = () => {
  let flagsSs = sessionStorage.getItem('config');

  if (flagsSs) {
    try {
      flagsSs = JSON.parse(flagsSs);
    } catch (e) {
      flagsSs = {};
    }
  }
  return flagsSs || {};
};

// path is a string path to check
export const checkFlag = (path) => {
  const flags = getFlags();
  const value = get(flags, path, false);
  return value;
};

export default getFlags;
