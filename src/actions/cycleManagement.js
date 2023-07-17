import { batch } from 'react-redux';
// import { convertQueryToString } from 'utilities';
// import api from '../api';

const dummyData = [
  {
    cycle_name: 'Fall Cycle 2023',
    id: 96,
    cycle_status: 'Proposed',
    cycle_category: 'Active',
    cycle_begin_date: '2023-09-01T21:12:12.854000Z',
    cycle_end_date: '2025-11-30T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  },
  {
    cycle_name: 'Summer Cycle 2023',
    id: 97,
    cycle_status: 'Complete',
    cycle_category: 'Active',
    cycle_begin_date: '2025-06-01T21:12:12.854000Z',
    cycle_end_date: '2025-08-30T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  },
  {
    cycle_name: 'Spring Cycle 2023',
    id: 98,
    cycle_status: 'Closed',
    cycle_category: 'Closed',
    cycle_begin_date: '2025-03-01T21:12:12.854000Z',
    cycle_end_date: '2025-05-30T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  },
  {
    cycle_name: 'Winter Cycle 2023',
    id: 99,
    cycle_status: 'Merged',
    cycle_category: 'Active',
    cycle_begin_date: '2022-12-01T21:12:12.854000Z',
    cycle_end_date: '2023-02-28T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
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
    cycle_name: `${randomSeason} Cycle ${index}`,
    id: index,
    cycle_status: randomStatus,
    cycle_category: 'Closed',
    cycle_begin_date: `${index}-${monthInt < 10 ? (`0${monthInt}`) : monthInt}-01T21:12:12.854000Z`,
    cycle_end_date: `${index}-${monthInt < 10 ? (`0${monthInt}`) : monthInt + 2}-28T21:12:12.854000Z`,
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
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
const cyclePosDummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: dummyData.slice(0, limit),
    count: dummyData.length,
    next: null,
    previous: null,
  });
});

export function cycleManagementFetchDataErrored(bool) {
  return {
    type: 'CYCLE_MANAGEMENT_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function cycleManagementFetchDataLoading(bool) {
  return {
    type: 'CYCLE_MANAGEMENT_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function cycleManagementFetchDataSuccess(results) {
  return {
    type: 'CYCLE_MANAGEMENT_FETCH_SUCCESS',
    results,
  };
}

export function cycleManagementFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(cycleManagementFetchDataLoading(true));
      dispatch(cycleManagementFetchDataErrored(false));
    });
    // const q = convertQueryToString(query);
    // const endpoint = `sweet/new/endpoint/we/can/pass/a/query/to/?${q}`;
    // api().get(endpoint)
    dispatch(cycleManagementFetchDataLoading(true));
    dummyDataToReturn(query)
      .then((data) => {
        batch(() => {
          dispatch(cycleManagementFetchDataSuccess(data));
          dispatch(cycleManagementFetchDataErrored(false));
          dispatch(cycleManagementFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(cycleManagementFetchDataLoading(true));
            dispatch(cycleManagementFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(cycleManagementFetchDataSuccess(dummyDataToReturn));
            dispatch(cycleManagementFetchDataErrored(false));
            dispatch(cycleManagementFetchDataLoading(false));
          });
        }
      });
  };
}

export function cycleManagementSelectionsSaveSuccess(result) {
  return {
    type: 'CYCLE_MANAGEMENT_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveCycleManagementSelections(queryObject) {
  return (dispatch) => dispatch(cycleManagementSelectionsSaveSuccess(queryObject));
}

export function cyclePositionSearchFetchDataErrored(bool) {
  return {
    type: 'CYCLE_POSITION_SEARCH_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function cyclePositionSearchFetchDataLoading(bool) {
  return {
    type: 'CYCLE_POSITION_SEARCH_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function cyclePositionSearchFetchDataSuccess(results) {
  return {
    type: 'CYCLE_POSITION_SEARCH_FETCH_SUCCESS',
    results,
  };
}

export function cyclePositionSearchFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(cyclePositionSearchFetchDataLoading(true));
      dispatch(cyclePositionSearchFetchDataErrored(false));
    });
    // const q = convertQueryToString(query);
    // const endpoint = `sweet/new/endpoint/we/can/pass/a/query/to/?${q}`;
    // api().get(endpoint)
    dispatch(cyclePositionSearchFetchDataLoading(true));
    cyclePosDummyDataToReturn(query)
      .then((data) => {
        batch(() => {
          dispatch(cyclePositionSearchFetchDataSuccess({ data, count: 5 }));
          dispatch(cyclePositionSearchFetchDataErrored(false));
          dispatch(cyclePositionSearchFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(cyclePositionSearchFetchDataLoading(true));
            dispatch(cyclePositionSearchFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(cyclePositionSearchFetchDataErrored(true));
            dispatch(cyclePositionSearchFetchDataLoading(false));
          });
        }
      });
  };
}

export function cyclePositionSearchSelectionsSaveSuccess(result) {
  return {
    type: 'CYCLE_POSITION_SEARCH_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveCyclePositionSearchSelections(queryObject) {
  return (dispatch) => dispatch(cyclePositionSearchSelectionsSaveSuccess(queryObject));
}
