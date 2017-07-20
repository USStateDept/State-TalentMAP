import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { comparisons, comparisonsHasErrored, comparisonsIsLoading } from './comparisons';
import { results, resultsHasErrored, resultsIsLoading } from './results';
import { filters, filtersHasErrored, filtersIsLoading } from './filters';
import { post, postHasErrored, postIsLoading } from './post';
import { share, shareHasErrored, shareIsSending } from './share';
import { positionDetails, positionDetailsHasErrored, positionDetailsIsLoading } from './positionDetails';

export default combineReducers({
  results,
  resultsHasErrored,
  resultsIsLoading,
  filters,
  filtersHasErrored,
  filtersIsLoading,
  post,
  postHasErrored,
  postIsLoading,
  positionDetails,
  positionDetailsHasErrored,
  positionDetailsIsLoading,
  comparisons,
  comparisonsHasErrored,
  comparisonsIsLoading,
  share,
  shareHasErrored,
  shareIsSending,
  router: routerReducer,
});
