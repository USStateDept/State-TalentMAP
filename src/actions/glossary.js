import axios from 'axios';
import { fetchUserToken } from '../utilities';
import api from '../api';

export function glossaryHasErrored(bool) {
  return {
    type: 'GLOSSARY_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function glossaryIsLoading(bool) {
  return {
    type: 'GLOSSARY_IS_LOADING',
    isLoading: bool,
  };
}
export function glossaryFetchDataSuccess(glossary) {
  return {
    type: 'GLOSSARY_FETCH_DATA_SUCCESS',
    glossary,
  };
}

export function glossaryFetchData() {
  return (dispatch) => {
    dispatch(glossaryIsLoading(true));
    dispatch(glossaryHasErrored(false));
    axios.get(`${api}/glossary/`, { headers: { Authorization: fetchUserToken() } })
        .then(({ data }) => {
          dispatch(glossaryFetchDataSuccess(data));
          dispatch(glossaryIsLoading(false));
          dispatch(glossaryHasErrored(false));
        })
        .catch(() => {
          dispatch(glossaryIsLoading(false));
          dispatch(glossaryHasErrored(true));
        });
  };
}
