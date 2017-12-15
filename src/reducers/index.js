import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import client from '../client/reducer';
import login from '../login/reducer';
import { results, resultsHasErrored, resultsIsLoading } from './results';
import { filters, filtersHasErrored, filtersIsLoading } from './filters';
import { post, postHasErrored, postIsLoading } from './post';
import { share, shareHasErrored, shareIsSending } from './share';
import { newSavedSearchIsSaving, newSavedSearchHasErrored,
  newSavedSearchSuccess, currentSavedSearch, savedSearchesSuccess,
  savedSearchesIsLoading, savedSearchesHasErrored,
  deleteSavedSearchIsLoading, deleteSavedSearchHasErrored, deleteSavedSearchSuccess,
  cloneSavedSearchIsLoading, cloneSavedSearchHasErrored, cloneSavedSearchSuccess } from './savedSearch';
import { positionDetails, positionDetailsHasErrored, positionDetailsIsLoading } from './positionDetails';
import { comparisons, comparisonsHasErrored, comparisonsIsLoading } from './comparisons';
import { homePagePositions, homePagePositionsHasErrored, homePagePositionsIsLoading } from './homePagePositions';
import { userProfile, userProfileHasErrored, userProfileIsLoading,
        userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored } from './userProfile';
import { favoritePositions, favoritePositionsHasErrored, favoritePositionsIsLoading } from './favoritePositions';
import { bidListHasErrored, bidListIsLoading, bidListFetchDataSuccess,
  bidListToggleHasErrored, bidListToggleIsLoading, bidListToggleSuccess,
  submitBidHasErrored, submitBidIsLoading, submitBidSuccess } from './bidList';
import { descriptionEditHasErrored, descriptionEditIsLoading, descriptionEditSuccess } from './descriptionEdit';
import { missionSearchHasErrored, missionSearchIsLoading, missionSearchSuccess } from './autocomplete/missionAutocomplete';
import { postSearchHasErrored, postSearchIsLoading, postSearchSuccess } from './autocomplete/postAutocomplete';
import { assignment, assignmentHasErrored, assignmentIsLoading } from './assignment';
import { notificationsHasErrored, notificationsIsLoading, notifications,
  notificationsCountHasErrored, notificationsCountIsLoading, notificationsCount } from './notifications';
import { bidderPortfolio, bidderPortfolioIsLoading, bidderPortfolioHasErrored,
  bidderPortfolioCounts, bidderPortfolioCountsIsLoading, bidderPortfolioCountsHasErrored } from './bidderPortfolio';
import shouldShowSearchBar from './showSearchBar';

import routerLocations from './routerLocations';
import selectedAccordion from './selectedAccordion';
import shouldShowStaticContent from './showStaticContent';


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
  newSavedSearchIsSaving,
  newSavedSearchHasErrored,
  newSavedSearchSuccess,
  currentSavedSearch,
  savedSearchesSuccess,
  savedSearchesIsLoading,
  savedSearchesHasErrored,
  deleteSavedSearchIsLoading,
  deleteSavedSearchHasErrored,
  deleteSavedSearchSuccess,
  cloneSavedSearchIsLoading,
  cloneSavedSearchHasErrored,
  cloneSavedSearchSuccess,
  userProfile,
  userProfileHasErrored,
  userProfileIsLoading,
  userProfileFavoritePositionIsLoading,
  userProfileFavoritePositionHasErrored,
  form,
  client,
  login,
  selectedAccordion,
  routerLocations,
  favoritePositions,
  favoritePositionsHasErrored,
  favoritePositionsIsLoading,
  bidListHasErrored,
  bidListIsLoading,
  bidListFetchDataSuccess,
  bidListToggleHasErrored,
  bidListToggleIsLoading,
  bidListToggleSuccess,
  submitBidHasErrored,
  submitBidIsLoading,
  submitBidSuccess,
  descriptionEditHasErrored,
  descriptionEditIsLoading,
  descriptionEditSuccess,
  missionSearchHasErrored,
  missionSearchIsLoading,
  missionSearchSuccess,
  postSearchHasErrored,
  postSearchIsLoading,
  postSearchSuccess,
  assignment,
  assignmentHasErrored,
  assignmentIsLoading,
  notificationsHasErrored,
  notificationsIsLoading,
  notifications,
  notificationsCountHasErrored,
  notificationsCountIsLoading,
  notificationsCount,
  bidderPortfolio,
  bidderPortfolioIsLoading,
  bidderPortfolioHasErrored,
  bidderPortfolioCounts,
  bidderPortfolioCountsIsLoading,
  bidderPortfolioCountsHasErrored,
  shouldShowStaticContent,
  shouldShowSearchBar,
  router: routerReducer,
});
