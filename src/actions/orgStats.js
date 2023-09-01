import { batch } from 'react-redux';

const dummyOrgStat = [{
  id: '2561',
  bureau: '(EUR) BUR OF EUROPEAN AFF AND EURASIAN AFFAIRS',
  bureau_code: '120000',
  bureau_short_desc: 'EUR',
  organization: '(A/LM/OPS/TTM) TRANSPORTATION & TRAVEL MANAGEMENT DIVISION',
  title: 'Now & Summer 2020',
  bidcycle: {
    id: 160,
    name: 'Details/Training 2019',
    cycle_start_date: null,
    cycle_deadline_date: null,
    cycle_end_date: null,
    active: null,
    handshake_allowed_date: null,
  },
  total_pos: 1,
  total_filled: 1,
  total_percent: 1,
  overseas_pos: 1,
  overseas_filled: 1,
  overseas_percent: 1,
  domestic_pos: 1,
  domestic_filled: 1,
  domestic_percent: 1,
}, {
  id: '2562',
  bureau: '(EUR) BUR OF EUROPEAN AFF AND EURASIAN AFFAIRS',
  bureau_code: '120000',
  bureau_short_desc: 'EUR',
  organization: '(A/LM/OPS/TTM) TRANSPORTATION & TRAVEL MANAGEMENT DIVISION',
  title: 'Now & Summer 2020',
  bidcycle: {
    id: 160,
    name: 'Details/Training 2019',
    cycle_start_date: null,
    cycle_deadline_date: null,
    cycle_end_date: null,
    active: null,
    handshake_allowed_date: null,
  },
  total_pos: 1,
  total_filled: 1,
  total_percent: 1,
  overseas_pos: 1,
  overseas_filled: 1,
  overseas_percent: 1,
  domestic_pos: 1,
  domestic_filled: 1,
  domestic_percent: 1,
}, {
  id: '2562',
  bureau: '(EUR) BUR OF EUROPEAN AFF AND EURASIAN AFFAIRS',
  bureau_code: '120000',
  bureau_short_desc: 'EUR',
  organization: '(A/LM/OPS/TTM) TRANSPORTATION & TRAVEL MANAGEMENT DIVISION',
  title: 'Now & Summer 2020',
  bidcycle: {
    id: 160,
    name: 'Details/Training 2019',
    cycle_start_date: null,
    cycle_deadline_date: null,
    cycle_end_date: null,
    active: null,
    handshake_allowed_date: null,
  },
  total_pos: 1,
  total_filled: 1,
  total_percent: 1,
  overseas_pos: 1,
  overseas_filled: 1,
  overseas_percent: 1,
  domestic_pos: 1,
  domestic_filled: 1,
  domestic_percent: 1,
}];


export function orgStatsFetchDataErrored(bool) {
  return {
    type: 'ORG_STATS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function orgStatsFetchDataLoading(bool) {
  return {
    type: 'ORG_STATS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function orgStatsFetchDataSuccess(results) {
  return {
    type: 'ORG_STATS_FETCH_SUCCESS',
    results,
  };
}

export function orgStatsFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(orgStatsFetchDataSuccess(dummyOrgStat));
      dispatch(orgStatsFetchDataErrored(false));
      dispatch(orgStatsFetchDataLoading(false));
    });
  };
}


export function orgStatsSelectionsSaveSuccess(result) {
  return {
    type: 'ORG_STATS_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveOrgStatsSelections(queryObject) {
  return (dispatch) => dispatch(orgStatsSelectionsSaveSuccess(queryObject));
}
