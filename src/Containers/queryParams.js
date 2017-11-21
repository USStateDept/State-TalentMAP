import queryString from 'query-string';

// when we need to update an existing query string with properties from an object
function queryParamUpdate(newQueryObject, oldQueryString, returnAsObject = false) {
  const parsedQuery = queryString.parse(oldQueryString);
  // unless we're changing the page number, go back to page 1
  if (Object.keys(newQueryObject).indexOf('page') <= -1) {
    if (parsedQuery.page) {
      // deleting the key does the same thing as going back to page 1
      // and also makes our query params cleaner
      delete parsedQuery.page;
    }
  }
  // combine our old and new query objects, overwriting any diffs with new
  const newQuery = Object.assign({}, parsedQuery, newQueryObject);
  // remove any params with no value
  Object.keys(newQuery).forEach((key) => {
    if (!(newQuery[key].toString().length)) {
      delete newQuery[key];
    }
  });
  // convert the object to a string and return it
  const newQueryString = queryString.stringify(newQuery);
  // if returnAsObject is false, return as string
  if (!returnAsObject) {
    return newQueryString;
  }
  // else, return as parsed object
  return queryString.parse(newQueryString);
}

export default queryParamUpdate;
