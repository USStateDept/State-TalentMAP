import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import client from '../client/reducer';
import login from '../login/reducer';
import { results, resultsHasErrored, resultsIsLoading } from './results';
import { filters, filtersHasErrored, filtersIsLoading } from './filters';
import { post, postHasErrored, postIsLoading } from './post';
import { share, shareHasErrored, shareIsSending } from './share';
import { positionDetails, positionDetailsHasErrored, positionDetailsIsLoading } from './positionDetails';
import { comparisons, comparisonsHasErrored, comparisonsIsLoading } from './comparisons';
import { homePagePositions, homePagePositionsHasErrored, homePagePositionsIsLoading } from './homePagePositions';
import { userProfile, userProfileHasErrored, userProfileIsLoading } from './userProfile';
import routerLocations from './routerLocations';
import selectedAccordion from './selectedAccordion';


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
  homePagePositions,
  homePagePositionsHasErrored,
  homePagePositionsIsLoading,
  share,
  shareHasErrored,
  shareIsSending,
  userProfile,
  userProfileHasErrored,
  userProfileIsLoading,
  form,
  client,
  login,
  selectedAccordion,
  routerLocations,
  router: routerReducer,
});
