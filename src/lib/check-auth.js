import { setClient } from '../client/actions';
import { fetchUserToken } from '../utilities';

function checkAuthorization(dispatch) {
  // attempt to grab the token from sessionStorage
  const storedToken = fetchUserToken();

  // if it exists
  if (storedToken) {
    // we return the token as 'Token 123456789'
    // remove the prefix
    const token = storedToken.split('Token ')[1];

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
