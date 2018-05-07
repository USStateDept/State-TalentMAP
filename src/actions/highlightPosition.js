import api from '../api';
import { positionDetailsPatchState } from './positionDetails';

export const HIGHLIGHT_POSITION_HAS_ERRORED = 'HIGHLIGHT_POSITION_HAS_ERRORED';
export const HIGHLIGHT_POSITION_IS_LOADING = 'HIGHLIGHT_POSITION_IS_LOADING';
export const HIGHLIGHT_POSITION_FETCH_DATA_SUCCESS = 'HIGHLIGHT_POSITION_FETCH_DATA_SUCCESS';

export const highlightPositionIsLoading = bool => ({
  type: HIGHLIGHT_POSITION_IS_LOADING,
  loading: bool,
});

export const highlightPositionHasErrored = bool => ({
  type: HIGHLIGHT_POSITION_HAS_ERRORED,
  error: bool,
});

export const highlightPositionFetchDataSuccess = results => ({
  type: HIGHLIGHT_POSITION_FETCH_DATA_SUCCESS,
  results,
});

export function highlightPositionFetchData() {
  return (dispatch) => {
    const url = '/position/highlighted/';

    dispatch(highlightPositionIsLoading(true));

    api
      .get(url)
      .then(response => response.data)
      .then((results) => {
        dispatch(highlightPositionHasErrored(false));
        dispatch(highlightPositionIsLoading(false));
        dispatch(highlightPositionFetchDataSuccess(results));
      })
      .catch(() => {
        dispatch(highlightPositionHasErrored(true));
        dispatch(highlightPositionIsLoading(false));
      });
  };
}

export function getHighlightedPosition(id) {
  return (dispatch) => {
    const url = `/position/${id}/highlight/`;

    dispatch(highlightPositionIsLoading(true));

    api
      .get(url)
      .then(response => response.data)
      .then(() => {
        dispatch(highlightPositionHasErrored(false));
        dispatch(highlightPositionIsLoading(false));
      })
      .catch(() => {
        dispatch(highlightPositionHasErrored(true));
        dispatch(highlightPositionIsLoading(false));
      });
  };
}

export function putHighlightedPosition(id) {
  return (dispatch) => {
    const url = `/position/${id}/highlight/`;

    dispatch(highlightPositionIsLoading(true));

    api
      .put(url)
      .then(response => response.data)
      .then(() => {
        dispatch(highlightPositionHasErrored(false));
        dispatch(highlightPositionFetchData());
        dispatch(positionDetailsPatchState({
          id,
          is_highlighted: true,
        }));
      })
      .catch(() => {
        dispatch(highlightPositionHasErrored(true));
        dispatch(highlightPositionIsLoading(false));
      });
  };
}

export function deleteHighlightPosition(id) {
  return (dispatch) => {
    const url = `/position/${id}/highlight/`;

    dispatch(highlightPositionIsLoading(true));
    dispatch(highlightPositionHasErrored(false));

    api
      .delete(url)
      .then(response => response.data)
      .then(() => {
        dispatch(highlightPositionHasErrored(false));
        dispatch(highlightPositionFetchData());
        dispatch(positionDetailsPatchState({
          id,
          is_highlighted: false,
        }));
      })
      .catch(() => {
        dispatch(highlightPositionHasErrored(true));
        dispatch(highlightPositionIsLoading(false));
      });
  };
}
