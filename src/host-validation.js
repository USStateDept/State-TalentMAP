// This is an intermediate copy of the npm package 'host-validation'
// Original repo here - https://github.com/brannondorsey/host-validation/
// Original source - https://github.com/brannondorsey/host-validation/blob/master/index.js
/* eslint-disable func-names */
module.exports = function (config) {
  function isAllowed(headerValue, allowedValues) {
    if (!headerValue || !allowedValues) { return false; }
    return allowedValues.some((candidate) => {
      if (typeof candidate === 'string') {
        return candidate === headerValue;
      } else if (candidate instanceof RegExp) {
        console.log(`candidate ${candidate}`);
        return candidate.test(headerValue);
      }
      return false;
    });
  }
  // eslint-disable-next-line no-unused-vars
  function fail(req, res, next) {
    res.status(403).send('Forbidden');
  }
  return function (req, res, next) {
    const allowed = isAllowed(req.headers.referer, config.referers);
    console.log(`ref ${req.headers.referer}`);
    if (allowed) next();
    else if (typeof config.fail === 'function') config.fail(req, res, next);
    else fail(req, res, next);
  };
};
