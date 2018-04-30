import api from '../api';

export function highlightPositionHasErrored(bool) {
  return {
    type: 'HIGHLIGHT_POSITION_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function highlightPositionIsLoading(bool) {
  return {
    type: 'HIGHLIGHT_POSITION_IS_LOADING',
    isLoading: bool,
  };
}

export function highlightPositionFetchDataSuccess(results) {
  return {
    type: 'HIGHLIGHT_POSITION_FETCH_DATA_SUCCESS',
    results,
  };
}

export function highlightPositionFetchData() {
  return (dispatch) => {
    dispatch(highlightPositionIsLoading(true));
    dispatch(highlightPositionHasErrored(false));
    const url = '/position/highlighted/';

    api.get(url)
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
    dispatch(highlightPositionIsLoading(true));
    dispatch(highlightPositionHasErrored(false));
    const url = `/position/${id}/highlight/`;

    api.get(url)
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

export function putHighlightedPosition(id) {
  return (dispatch) => {
    dispatch(highlightPositionIsLoading(true));
    dispatch(highlightPositionHasErrored(false));
    const url = `/position/${id}/highlight/`;

    api.put(url)
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

export function deleteHighlightPosition(id) {
  return (dispatch) => {
    dispatch(highlightPositionIsLoading(true));
    dispatch(highlightPositionHasErrored(false));
    const url = `/position/${id}/highlight/`;

    api.delete(url)
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
