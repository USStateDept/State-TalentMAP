import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import client from '../client/reducer';
import login from '../login/reducer';
import { reducer as bidCycles } from './bidCycles';
import { reducer as highlightPosition } from './highlightPosition';
import results from './results';
import filters from './filters';
import post from './post';
import share from './share';
import savedSearch from './savedSearch';
import positionDetails from './positionDetails';
import comparisons from './comparisons';
import homePagePositions from './homePagePositions';
import userProfile from './userProfile';
import userProfilePublic from './userProfilePublic';
import favoritePositions from './favoritePositions';
import bidList from './bidList';
import descriptionEdit from './descriptionEdit';
import missionAutocomplete from './autocomplete/missionAutocomplete';
import postAutocomplete from './autocomplete/postAutocomplete';
import assignment from './assignment';
import notifications from './notifications';
import bidderPortfolio from './bidderPortfolio';
import shouldShowSearchBar from './showSearchBar';
import routerLocations from './routerLocations';
import selectedAccordion from './selectedAccordion';
import shouldShowStaticContent from './showStaticContent';
import profileMenu from './profileMenu';
import showGlossary from './showGlossary';
import glossary from './glossary';
import bidStatistics from './bidStatistics';
import selectedSearchbarFilters from './selectedSearchbarFilters';
import showFeedback from './showFeedback';
import feedback from './feedback';
import features from './features';
import toast from './toast';
import clientView from './clientView';
import preferences from './preferences';
import aboutContent from './aboutContent';
import homeBannerContent from './homeBannerContent';
import logs from './logs';
import synchronizations from './synchronizations';
import positionCount from './positionCount';
import showMobileFilter from './showMobileFilter';
import stats from './stats';
import clientSuggestions from './clientSuggestions';

export default combineReducers({
  ...results,
  ...filters,
  ...post,
  ...positionDetails,
  ...comparisons,
  ...homePagePositions,
  ...share,
  ...savedSearch,
  ...userProfile,
  ...userProfilePublic,
  ...selectedAccordion,
  ...routerLocations,
  ...favoritePositions,
  ...bidList,
  ...descriptionEdit,
  ...missionAutocomplete,
  ...postAutocomplete,
  ...assignment,
  ...notifications,
  ...bidderPortfolio,
  ...shouldShowStaticContent,
  ...shouldShowSearchBar,
  ...profileMenu,
  ...showGlossary,
  ...glossary,
  ...bidStatistics,
  ...selectedSearchbarFilters,
  ...showFeedback,
  ...feedback,
  ...features,
  ...toast,
  ...clientView,
  ...preferences,
  ...aboutContent,
  ...homeBannerContent,
  ...logs,
  ...synchronizations,
  ...positionCount,
  ...showMobileFilter,
  ...stats,
  ...clientSuggestions,
  router,
  client,
  login,
  bidCycles,
  highlightPosition,
});
