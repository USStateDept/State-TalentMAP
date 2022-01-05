/* eslint-disable */
/**
 * Simple safari detection based on user agent test
 */
export const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const returnVal = v => v;

export const isJsons = ((array) => Array.isArray(array) && array.every(
 row => (typeof row === 'object' && !(row instanceof Array))
));

export const isArrays = ((array) => Array.isArray(array) && array.every(
 row => Array.isArray(row)
));

export const jsonsHeaders = ((array) => Array.from(
 array.map(json => Object.keys(json))
 .reduce((a, b) => new Set([...a, ...b]), [])
));

export const jsons2arrays = (jsons, headers) => {
  headers = headers || jsonsHeaders(jsons);

  // allow headers to have custom labels, defaulting to having the header data key be the label
  let headerLabels = headers;
  let headerKeys = headers;
  if (isJsons(headers)) {
    headerLabels = headers.map((header) => header.label);
    headerKeys = headers.map((header) => header.key);
  }

  const data = jsons.map((object) => headerKeys.map((header) => getHeaderValue(header, object)));
  return [headerLabels, ...data];
};

export const getHeaderValue = (property, obj) => {
  const foundValue = property
    .replace(/\[([^\]]+)]/g, ".$1")
    .split(".")
    .reduce(function(o, p, i, arr) {
      // if at any point the nested keys passed do not exist, splice the array so it doesnt keep reducing
      if (o[p] === undefined) {
        arr.splice(1);
      } else {
        return o[p];
      }
    }, obj);

  return (foundValue === undefined) ? '' : foundValue;
}

export const elementOrEmpty = (element) => element || element === 0 ? element : '';

export const joiner = ((data, separator = ',', enclosingCharacter = '"', transform = returnVal) => {
  return data
    .filter(e => e)
    .map(
      row => row
        .map((element) => elementOrEmpty(element))
        .map(column => transform(`${enclosingCharacter}${column}${enclosingCharacter}`))
        .join(separator)
    )
    .join(`\n`);
});

export const arrays2csv = ((data, headers, separator, enclosingCharacter, transform = returnVal) =>
 joiner(headers ? [headers, ...data] : data, separator, enclosingCharacter, transform)
);

export const jsons2csv = ((data, headers, separator, enclosingCharacter, transform = returnVal) =>
 joiner(jsons2arrays(data, headers), separator, enclosingCharacter, transform)
);

export const string2csv = ((data, headers, separator, enclosingCharacter) =>
  (headers) ? `${headers.join(separator)}\n${data}`: data
);

export const toCSV = (data, headers, separator, enclosingCharacter, transform = returnVal) => {
 if (isJsons(data)) return jsons2csv(data, headers, separator, enclosingCharacter, transform);
 if (isArrays(data)) return arrays2csv(data, headers, separator, enclosingCharacter, transform);
 if (typeof data ==='string') return string2csv(data, headers, separator);
 throw new TypeError(`Data should be a "String", "Array of arrays" OR "Array of objects" `);
};

export const buildURI = ((data, uFEFF, headers, separator, enclosingCharacter, transform = returnVal) => {
  const csv = toCSV(data, headers, separator, enclosingCharacter, transform);
  const type = isSafari() ? 'application/csv' : 'text/csv';
  const blob = new Blob([uFEFF ? '\uFEFF' : '', csv], {type});
  const dataURI = `data:${type};charset=utf-8,${uFEFF ? '\uFEFF' : ''}${csv}`;

  const URL = window.URL || window.webkitURL;

  return (typeof URL.createObjectURL === 'undefined')
    ? dataURI
    : URL.createObjectURL(blob);
});
/* eslint-enable */
