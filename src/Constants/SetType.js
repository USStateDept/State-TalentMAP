// forked from https://github.com/andrewbranch/es6-set-proptypes

const methods = [
  'add',
  'clear',
  'delete',
  'entries',
  'forEach',
  'has',
  'keys',
  'values',
];

function error(propName, componentName, property, condition) {
  return new Error([
    'Invalid prop `',
    propName,
    '` supplied to `',
    componentName,
    '`. Must be a Set. (`',
    propName,
    '.',
    property,
    '` was not ',
    condition,
    '.)',
  ].join(''));
}

function setType(props, propName, componentName) {
  const s = props[propName];
  if (s == null) { return null; }

  if (typeof s.size !== 'number') {
    return error(propName, componentName, 'size', 'a number');
  }

  // eslint-disable-next-line no-loops/no-loops
  for (let i = 0; i < methods.length; i += 1) {
    const method = methods[i];
    if (typeof s[method] !== 'function') {
      return error(propName, componentName, method, 'a function');
    }
  }

  return null;
}

setType.isRequired = (props, propName, componentName) => {
  if (props[propName] == null) { // null or undefined
    return new Error(`Required prop \`${propName}\` was not specified in ${componentName}.`);
  }

  return setType(props, propName, componentName);
};

module.exports = setType;
