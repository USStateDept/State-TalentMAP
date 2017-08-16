import { CLIENT_SET, CLIENT_UNSET } from './constants';

const initialSate = {
  token: null,
};

const reducer = function clientReducer(state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET:
      return {
        token: action.token,
      };

    case CLIENT_UNSET:
      return {
        token: null,
      };

    default:
      return state;
  }
};

export default reducer;
