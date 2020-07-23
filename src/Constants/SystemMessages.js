import RegisterHandshakeSuccess from 'Components/BidListMessages/RegisterSuccess';
import FavoriteSuccess from 'Components/FavoriteMessages/Success';
import RemoveSuccess from 'Components/FavoriteMessages/RemoveSuccess';
import BidAddSuccess from 'Components/BidListMessages/Success';
import BidRemoveSuccess from 'Components/BidListMessages/RemoveSuccess';
import SavedSearchSuccess from 'Components/SavedSearchMessages/Success';

export const DEFAULT_TEXT = 'None listed';

export const NO_ASSIGNMENT_DATE = DEFAULT_TEXT;
export const NO_ASSIGNMENT_POSITION = DEFAULT_TEXT;
export const NO_BID_CYCLE = DEFAULT_TEXT;
export const NO_BIRTHDAY = DEFAULT_TEXT;
export const NO_BUREAU = DEFAULT_TEXT;
export const NO_CREATE_DATE = 'Unknown';
export const NO_COLA = DEFAULT_TEXT;
export const NO_DANGER_PAY = DEFAULT_TEXT;
export const NO_DATE = DEFAULT_TEXT;
export const NO_EMAIL = DEFAULT_TEXT;
export const NO_END_DATE = DEFAULT_TEXT;
export const NO_FAVORITES = 'You do not have any favorited positions.';
export const NO_GRADE = DEFAULT_TEXT;
export const NO_LANGUAGES = 'None';
export const NO_UPDATE_DATE = 'Unknown';
export const NO_ORG = DEFAULT_TEXT;
export const NO_POSITION_DESCRIPTION = 'There is no description for this position.';
export const NO_POSITION_NUMBER = '';
export const NO_POSITION_POC = DEFAULT_TEXT;
export const NO_POSITION_TITLE = DEFAULT_TEXT;
export const NO_POSITION_WEB_SITE = DEFAULT_TEXT;
export const NO_POST = DEFAULT_TEXT;
export const NO_POST_DIFFERENTIAL = DEFAULT_TEXT;
export const NO_REST_RELAXATION = DEFAULT_TEXT;
export const NO_SAVED_SEARCHES = 'You do not have any saved searches.';
export const NO_SKILL = DEFAULT_TEXT;
export const NO_TOUR_OF_DUTY = DEFAULT_TEXT;
export const NO_USER_LISTED = DEFAULT_TEXT;
export const NO_USER_SKILL_CODE = 'No Skills listed';
export const NO_TOUR_END_DATE = DEFAULT_TEXT;

export const GENERAL_SAVED_SEARCH_ERROR = 'An error occurred trying to save this search.';

export const DELETE_BID_ITEM_SUCCESS = (pos, onToggle) => BidRemoveSuccess({ pos, onToggle });
export const DELETE_BID_ITEM_ERROR = 'Error trying to delete this bid.';
export const ADD_BID_ITEM_SUCCESS = (pos, props = {}) => BidAddSuccess({ pos, ...props });
export const ADD_BID_ITEM_ERROR = 'Error trying to add this bid.';

export const ADD_FAVORITE_TITLE = 'Favorite Added';
export const DELETE_FAVORITE_TITLE = 'Favorite Removed';
export const ERROR_FAVORITE_TITLE = 'Favorite Error';
export const DELETE_FAVORITE_SUCCESS = (pos, onToggle) => RemoveSuccess({ pos, onToggle });
export const DELETE_FAVORITE_ERROR = () => "We're experiencing an error attempting to remove this position from your Favorites. Please try again.";
export const ADD_FAVORITE_SUCCESS = pos => FavoriteSuccess({ pos });
export const ADD_FAVORITE_ERROR = () => "We're experiencing an error attempting to add this position to your Favorites. Please try again.";
export const ADD_FAVORITE_LIMIT_ERROR_AP = limit => `You have reached the limit of ${limit} for Open Position favorites. Please remove a favorite and try again.`;
export const ADD_FAVORITE_LIMIT_ERROR_PV = limit => `You have reached the limit of ${limit} for Projected Vacancy favorites. Please remove a favorite and try again.`;
export const TANDEM_FAVORITE_MISSING = () => 'Please add at least 1 favorite for both user and tandem within tandem search.';

export const ACCEPT_BID_SUCCESS = 'Bid successfully accepted.';
export const ACCEPT_BID_ERROR = 'Error trying to accept this bid.';
export const DECLINE_BID_SUCCESS = 'Bid successfully declined.';
export const DECLINE_BID_ERROR = 'Error trying to decline this bid.';
export const SUBMIT_BID_SUCCESS = 'Bid successfully submitted.';
export const SUBMIT_BID_ERROR = 'Error trying to submit this bid.';

export const REGISTER_HANDSHAKE_SUCCESS = undo => RegisterHandshakeSuccess({ undo });
export const REGISTER_HANDSHAKE_ERROR = 'Error trying to register handshake.';
export const UNREGISTER_HANDSHAKE_SUCCESS = 'Handshake successfully unregistered.';
export const UNREGISTER_HANDSHAKE_ERROR = 'Error trying to unregister handshake.';

export const NEW_SAVED_SEARCH_SUCCESS_TITLE = 'Success';
export const UPDATED_SAVED_SEARCH_SUCCESS_TITLE = 'Saved search updated';
export const DELETE_SAVED_SEARCH_SUCCESS_TITLE = 'Success';
export const DELETE_SAVED_SEARCH_ERROR_TITLE = 'Saved search error';


export const NEW_SAVED_SEARCH_SUCCESS = name => SavedSearchSuccess({ name });
export const UPDATED_SAVED_SEARCH_SUCCESS = name => SavedSearchSuccess({ name, isUpdated: true });
export const DELETE_SAVED_SEARCH_SUCCESS = 'Successfully deleted the selected search';
export const DELETE_SAVED_SEARCH_ERROR = 'An error occurred trying to delete this search.';

export const CANNOT_BID_SUFFIX = ', but can be favorited for the future.';
export const CANNOT_BID_DEFAULT = `This position is not available to bid on${CANNOT_BID_SUFFIX}`;

export const GET_NOW_AVAILABLE = n => `${n} Now available!`;
export const GET_POSITIONS_ADDED = n => `${n} Position${n !== 1 ? 's' : ''} added`;

export const SET_CLIENT_SUCCESS = 'Success';
export const SET_CLIENT_ERROR = 'Error setting client';
export const GET_CLIENT_SUCCESS_MESSAGE = user => `You are now searching as ${user.name}.`;
export const UNSET_CLIENT_SUCCESS = SET_CLIENT_SUCCESS;
export const UNSET_CLIENT_SUCCESS_MESSAGE = 'You have exited client view.';

export const POST_FEATURE_FLAGS_SUCCESS = 'Config File successfully updated.';
export const POST_FEATURE_FLAGS_ERROR = 'Error updating Config File. Please try again.';

export const COMING_SOON = 'Coming Soon';

