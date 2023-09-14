import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
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
import assignmentMaintenance from './assignmentMaintenance';
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
import positionViews from './positionViews';
import clientSuggestions from './clientSuggestions';
import userRoles from './userRoles';
import classifications from './classifications';
import featureFlags from './featureFlags';
import bureauPositionBids from './bureauPositionBids';
import bureauPositionManager from './bureauPositionManager';
import bureauPositionDetails from './bureauPositionDetails';
import shortListLock from './shortListLock';
import cdo from './cdo';
import hs from './handshake2';
import handshake from './handshake';
import agendaItemHistory from './agendaItemHistory';
import positions from './positions';
// TODO: remove handshake2 after PR 1494 merged (bc handshake2 will be moved to handshake.js)
import agendaEmployees from './agendaEmployees';
import gsaLocations from './gsaLocations';
import panelMeetings from './panelMeetings';
import agendaItemMaintenancePane from './agendaItemMaintenancePane';
import panelMeetingAgendas from './panelMeetingAgendas';
import publishablePositions from './publishablePositions';
import remark from './remark';
import panelMeetingAdmin from './panelMeetingAdmin';
import projectedVacancy from './projectedVacancy';
import cycleManagement from './cycleManagement';
import bidSeasons from './bidSeasons';
import PostPanelProcessing from './postPanelProcessing';
import managePostAccess from './managePostAccess';
import searchPostAccess from './searchPostAccess';
import bureauException from './bureauException';
import entryLevel from './entryLevel';
import jobCategories from './jobCategories';
import orgStats from './orgStats';

export default (history) => combineReducers({
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
  ...assignmentMaintenance,
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
  ...positionViews,
  ...clientSuggestions,
  ...userRoles,
  ...classifications,
  ...featureFlags,
  ...bureauPositionBids,
  ...bureauPositionManager,
  ...bureauPositionDetails,
  ...shortListLock,
  ...cdo,
  ...hs,
  ...handshake,
  ...agendaEmployees,
  ...agendaItemHistory,
  ...panelMeetings,
  ...PostPanelProcessing,
  ...agendaItemMaintenancePane,
  ...positions,
  ...panelMeetingAgendas,
  ...publishablePositions,
  ...remark,
  ...panelMeetingAdmin,
  ...gsaLocations,
  ...projectedVacancy,
  ...cycleManagement,
  ...bidSeasons,
  ...managePostAccess,
  ...searchPostAccess,
  ...bureauException,
  ...entryLevel,
  ...jobCategories,
  ...orgStats,
  router: connectRouter(history),
  client,
  login,
  bidCycles,
  highlightPosition,
});
