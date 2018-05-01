import { setClient } from '../client/actions';
import { auth } from '../login/sagas';

function checkAuthorization(dispatch) {
  // attempt to grab the token from localstorage
  const token = auth.get();

  // if it exists
  if (token) {
    // update our redux state with the token and return true
    dispatch(setClient(token));
    return true;
  }

  return false;
}

export default ({ dispatch }) => checkAuthorization(dispatch);
