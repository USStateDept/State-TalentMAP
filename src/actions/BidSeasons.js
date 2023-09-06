import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import {
  ADD_BID_SEASON_ERROR,
  ADD_BID_SEASON_ERROR_TITLE,
  ADD_BID_SEASON_SUCCESS,
  ADD_BID_SEASON_SUCCESS_TITLE,
  EDIT_BID_SEASON_ERROR,
  EDIT_BID_SEASON_ERROR_TITLE,
  EDIT_BID_SEASON_SUCCESS,
  EDIT_BID_SEASON_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';
// import { convertQueryToString } from 'utilities';

const dummyData = [
  {
    bid_seasons_name: 'Fall Cycle 2023',
    id: 96,
    bid_seasons_begin_date: '2023-09-01T21:12:12.854000Z',
    bid_seasons_end_date: '2025-11-30T21:12:12.854000Z',
    bid_seasons_panel_cutoff: '2025-11-30T21:12:12.854000Z',
    bid_season_excl_position: 'Y',
    bid_seasons_future_vacancy: 'Y',
    description: 'This is a description for Fall Cycle 2023',
  },
  {
    bid_seasons_name: 'Summer Cycle 2023',
    id: 97,
    bid_seasons_begin_date: '2023-09-01T21:12:12.854000Z',
    bid_seasons_end_date: '2025-11-30T21:12:12.854000Z',
    bid_seasons_panel_cutoff: '2025-11-30T21:12:12.854000Z',
    bid_season_excl_position: 'Y',
    bid_seasons_future_vacancy: 'Y',
    description: 'This is a description for Summer Cycle 2023',
  },
  {
    bid_seasons_name: 'Spring Cycle 2023',
    id: 98,
    bid_seasons_begin_date: '2023-09-01T21:12:12.854000Z',
    bid_seasons_end_date: '2025-11-30T21:12:12.854000Z',
    bid_seasons_panel_cutoff: '2025-11-30T21:12:12.854000Z',
    bid_season_excl_position: 'Y',
    bid_seasons_future_vacancy: 'Y',
    description: 'This is a description for Spring Cycle 2023',
  },
  {
    bid_seasons_name: 'Winter Cycle 2023',
    id: 99,
    bid_seasons_begin_date: '2023-09-01T21:12:12.854000Z',
    bid_seasons_end_date: '2025-11-30T21:12:12.854000Z',
    bid_seasons_panel_cutoff: '2025-11-30T21:12:12.854000Z',
    bid_season_excl_position: 'Y',
    bid_seasons_future_vacancy: 'Y',
    description: 'This is a description for Winter Cycle 2023',
  },
];
// eslint-disable-next-line no-loops/no-loops
for (let index = 2022; index > 1975; index -= 1) {
  const monthInt = Math.floor(Math.random() * 10) + 1;
  const seasons = ['Fall', 'Winter', 'Summer', 'Spring'];
  const statuses = ['Proposed', 'Complete', 'Closed', 'Merged'];
  const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  dummyData.push({
    bid_seasons_name: `${randomSeason} Cycle ${index}`,
    id: index,
    bid_seasons_status: randomStatus,
    bid_seasons_begin_date: `${index}-${monthInt < 10 ? (`0${monthInt}`) : monthInt}-01T21:12:12.854000Z`,
    bid_seasons_end_date: `${index}-${monthInt < 10 ? (`0${monthInt}`) : monthInt + 2}-28T21:12:12.854000Z`,
    bid_seasons_panel_cutoff: `${index}-${monthInt < 10 ? (`0${monthInt}`) : monthInt + 3}-28T21:12:12.854000Z`,
    bid_seasons_future_vacancy: 'Y',
  });
}
const dummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: dummyData.slice(0, limit),
    count: dummyData.length,
    next: null,
    previous: null,
  });
});
const bidSeasonsPosDummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: dummyData.slice(0, limit),
    count: dummyData.length,
    next: null,
    previous: null,
  });
});

export function bidSeasonsFetchDataErrored(bool) {
  return {
    type: 'BID_SEASON_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bidSeasonsFetchDataLoading(bool) {
  return {
    type: 'BID_SEASON_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function bidSeasonsFetchDataSuccess(results) {
  return {
    type: 'BID_SEASONS_FETCH_SUCCESS',
    results,
  };
}

export function bidSeasonsFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(bidSeasonsFetchDataLoading(true));
      dispatch(bidSeasonsFetchDataErrored(false));
    });
    // const q = convertQueryToString(query);
    // const endpoint = `sweet/new/endpoint/we/can/pass/a/query/to/?${q}`;
    // api().get(endpoint)
    dispatch(bidSeasonsFetchDataLoading(true));
    dummyDataToReturn(query)
      .then((data) => {
        batch(() => {
          dispatch(bidSeasonsFetchDataSuccess(data));
          dispatch(bidSeasonsFetchDataErrored(false));
          dispatch(bidSeasonsFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(bidSeasonsFetchDataLoading(true));
            dispatch(bidSeasonsFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(bidSeasonsFetchDataSuccess(dummyDataToReturn));
            dispatch(bidSeasonsFetchDataErrored(false));
            dispatch(bidSeasonsFetchDataLoading(false));
          });
        }
      });
  };
}

export function bidSeasonsSelectionsSaveSuccess(result) {
  return {
    type: 'BID_SEASON_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveBidSeasonsSelections(queryObject) {
  return (dispatch) => dispatch(bidSeasonsSelectionsSaveSuccess(queryObject));
}

export function bidSeasonsPositionSearchFetchDataErrored(bool) {
  return {
    type: 'BID_SEASON_POSITION_SEARCH_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bidSeasonsPositionSearchFetchDataLoading(bool) {
  return {
    type: 'BID_SEASON_POSITION_SEARCH_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function bidSeasonsPositionSearchFetchDataSuccess(results) {
  return {
    type: 'BID_SEASON_POSITION_SEARCH_FETCH_SUCCESS',
    results,
  };
}

export function bidSeasonsPositionSearchFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(bidSeasonsPositionSearchFetchDataLoading(true));
      dispatch(bidSeasonsPositionSearchFetchDataErrored(false));
    });
    // const q = convertQueryToString(query);
    // const endpoint = `sweet/new/endpoint/we/can/pass/a/query/to/?${q}`;
    // api().get(endpoint)
    dispatch(bidSeasonsPositionSearchFetchDataLoading(true));
    bidSeasonsPosDummyDataToReturn(query)
      .then((data) => {
        batch(() => {
          dispatch(bidSeasonsPositionSearchFetchDataSuccess(data));
          dispatch(bidSeasonsPositionSearchFetchDataErrored(false));
          dispatch(bidSeasonsPositionSearchFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(bidSeasonsPositionSearchFetchDataLoading(true));
            dispatch(bidSeasonsPositionSearchFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(bidSeasonsPositionSearchFetchDataErrored(true));
            dispatch(bidSeasonsPositionSearchFetchDataLoading(false));
          });
        }
      });
  };
}

export function bidSeasonsPositionSearchSelectionsSaveSuccess(result) {
  return {
    type: 'BID_SEASON_POSITION_SEARCH_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveBidSeasonsPositionSearchSelections(queryObject) {
  return (dispatch) => dispatch(bidSeasonsPositionSearchSelectionsSaveSuccess(queryObject));
}

export function bidSeasonsPositionRemoveHasErrored(bool) {
  return {
    type: 'BID_SEASON_POSITION_REMOVE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidSeasonsPositionRemoveIsLoading(bool) {
  return {
    type: 'BID_SEASON_POSITION_REMOVE_IS_LOADING',
    isLoading: bool,
  };
}
export function bidSeasonsPositionRemoveSuccess(data) {
  return {
    type: 'BID_SEASON_POSITION_REMOVE_SUCCESS',
    data,
  };
}

let cancel;

export function bidSeasonsPositionRemove(position) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(bidSeasonsPositionRemoveIsLoading(true));
    dispatch(bidSeasonsPositionRemoveHasErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        position,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidSeasonsPositionRemoveHasErrored(false));
          dispatch(bidSeasonsPositionRemoveSuccess(data || []));
          dispatch(
            toastSuccess(ADD_BID_SEASON_SUCCESS,
              ADD_BID_SEASON_SUCCESS_TITLE));
          dispatch(bidSeasonsPositionRemoveIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(bidSeasonsPositionRemoveHasErrored(false));
          dispatch(bidSeasonsPositionRemoveIsLoading(false));
        } else {
          dispatch(toastError(ADD_BID_SEASON_ERROR,
            ADD_BID_SEASON_ERROR_TITLE));
          dispatch(bidSeasonsPositionRemoveHasErrored(true));
          dispatch(bidSeasonsPositionRemoveIsLoading(false));
        }
      });
  };
}

export function bidSeasonsPositionEditHasErrored(bool) {
  return {
    type: 'BID_SEASON_POSITION_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidSeasonsPositionEditIsLoading(bool) {
  return {
    type: 'BID_SEASON_POSITION_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function bidSeasonsPositionEditSuccess(data) {
  return {
    type: 'BID_SEASON_POSITION_EDIT_SUCCESS',
    data,
  };
}

export function bidSeasonsPositionEdit(position, incumbent, status) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(bidSeasonsPositionEditIsLoading(true));
    dispatch(bidSeasonsPositionEditHasErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        position,
        incumbent,
        status,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidSeasonsPositionEditHasErrored(false));
          dispatch(bidSeasonsPositionEditSuccess(data || []));
          dispatch(
            toastSuccess(EDIT_BID_SEASON_SUCCESS, EDIT_BID_SEASON_SUCCESS_TITLE));
          dispatch(bidSeasonsPositionEditIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(bidSeasonsPositionEditHasErrored(false));
          dispatch(bidSeasonsPositionEditIsLoading(false));
        } else {
          dispatch(toastError(EDIT_BID_SEASON_ERROR,
            EDIT_BID_SEASON_ERROR_TITLE));
          dispatch(bidSeasonsPositionEditHasErrored(true));
          dispatch(bidSeasonsPositionEditIsLoading(false));
        }
      });
  };
}
