import { setClient } from '../client/actions';

function checkAuthorization(dispatch) {
  // attempt to grab the token from sessionStorage
  const storedToken = sessionStorage.getItem('token');

  // if it exists
  if (storedToken) {
    // parse it down into an object
    const token = JSON.parse(storedToken);

    // TODO include check for token expiration

    // update our redux state with the token and return true
    dispatch(setClient(token));
    return true;
  }

  return false;
}

export default function checkIndexAuthorization({ dispatch }) {
  if (checkAuthorization(dispatch)) {
    return true;
  }
  return false;
}
