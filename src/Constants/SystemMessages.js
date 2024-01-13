import RegisterHandshakeSuccess from 'Components/BidListMessages/RegisterSuccess';
import UnregisterHandshakeSuccess from 'Components/BidListMessages/UnregisterSuccess';
import FavoriteSuccess from 'Components/FavoriteMessages/Success';
import RemoveSuccess from 'Components/FavoriteMessages/RemoveSuccess';
import BidAddSuccess from 'Components/BidListMessages/Success';
import BidRemoveSuccess from 'Components/BidListMessages/RemoveSuccess';
import SavedSearchSuccess from 'Components/SavedSearchMessages/Success';
import HandshakeOffered from 'Components/BidTracker/Messages/HandshakeOffered';
import HandshakeRevoked from 'Components/BidTracker/Messages/HandshakeRevoked';
import HandshakeAccepted from 'Components/BidTracker/Messages/HandshakeAccepted';
import GenericSuccessToast from 'Components/GenericToast/Success';
import PanelMeetingMessage from 'Components/AdministratorPage/PanelAdmin/PanelMeetingMessage';

export const DEFAULT_TEXT = 'None listed';

export const NO_ASSIGNMENT_DATE = DEFAULT_TEXT;
export const NO_ASSIGNMENT_POSITION = DEFAULT_TEXT;
export const NO_ASSIGNMENT_STATUS = DEFAULT_TEXT;
export const NO_ASSIGNMENT_TOD_DESC = DEFAULT_TEXT;
export const NO_BID_CYCLE = DEFAULT_TEXT;
export const NO_BIRTHDAY = DEFAULT_TEXT;
export const NO_BUREAU = DEFAULT_TEXT;
export const NO_CDO = DEFAULT_TEXT;
export const NO_CLASSIFICATIONS = DEFAULT_TEXT;
export const NO_COLA = DEFAULT_TEXT;
export const NO_CREATE_DATE = 'Unknown';
export const NO_DANGER_PAY = DEFAULT_TEXT;
export const NO_DATE = DEFAULT_TEXT;
export const NO_EMAIL = DEFAULT_TEXT;
export const NO_END_DATE = DEFAULT_TEXT;
export const NO_ETA = DEFAULT_TEXT;
export const NO_FAVORITES = 'You do not have any favorited positions.';
export const NO_GRADE = DEFAULT_TEXT;
export const NO_LANGUAGES = 'None';
export const NO_LANGUAGE = DEFAULT_TEXT;
export const NO_NOTES = 'None';
export const NO_OC_REASON = DEFAULT_TEXT;
export const NO_OFFICE_ADDRESS = DEFAULT_TEXT;
export const NO_OFFICE_PHONE = DEFAULT_TEXT;
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
export const NO_STATUS = DEFAULT_TEXT;
export const NO_SUBMIT_DATE = DEFAULT_TEXT;
export const NO_TOUR_END_DATE = DEFAULT_TEXT;
export const NO_TOUR_OF_DUTY = DEFAULT_TEXT;
export const NO_UPDATE_DATE = 'Unknown';
export const NO_USER_LISTED = DEFAULT_TEXT;
export const NO_USER_SKILL_CODE = 'No Skills listed';

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
export const GENERIC_SUCCESS =
  (messageBefore, link, messageAfter) =>
    GenericSuccessToast({ messageBefore, link, messageAfter });

export const ACCEPT_BID_SUCCESS = 'Bid successfully accepted.';
export const ACCEPT_BID_ERROR = 'Error trying to accept this bid.';
export const DECLINE_BID_SUCCESS = 'Bid successfully declined.';
export const DECLINE_BID_ERROR = 'Error trying to decline this bid.';
export const SUBMIT_BID_SUCCESS = 'Bid successfully submitted.';
export const SUBMIT_BID_ERROR = 'Error trying to submit this bid.';

export const REGISTER_HANDSHAKE_SUCCESS = undo => RegisterHandshakeSuccess({ undo });
export const REGISTER_HANDSHAKE_ERROR = 'Error trying to register handshake.';
export const UNREGISTER_HANDSHAKE_SUCCESS = undo => UnregisterHandshakeSuccess({ undo });
export const UNREGISTER_HANDSHAKE_ERROR = 'Error trying to unregister handshake.';

export const OFFER_HANDSHAKE_SUCCESS = 'Handshake successfully offered.';
export const OFFER_HANDSHAKE_ERROR = 'Error offering handshake.';
export const REVOKE_HANDSHAKE_SUCCESS = 'Handshake successfully revoked.';
export const REVOKE_HANDSHAKE_ERROR = 'Error revoking handshake.';

export const NEW_SAVED_SEARCH_SUCCESS_TITLE = 'Success';
export const UPDATED_SAVED_SEARCH_SUCCESS_TITLE = 'Saved search updated';
export const DELETE_SAVED_SEARCH_SUCCESS_TITLE = 'Success';
export const DELETE_SAVED_SEARCH_ERROR_TITLE = 'Saved search error';


export const NEW_SAVED_SEARCH_SUCCESS = name => SavedSearchSuccess({ name });
export const UPDATED_SAVED_SEARCH_SUCCESS = name => SavedSearchSuccess({ name, isUpdated: true });
export const DELETE_SAVED_SEARCH_SUCCESS = 'Successfully deleted the selected search';
export const DELETE_SAVED_SEARCH_ERROR = 'An error occurred trying to delete this search.';

export const CANNOT_BID_FILLED_POSITION = 'This position is already filled and not available to bid on.';
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


export const ADD_TO_INTERNAL_LIST_SUCCESS_TITLE = 'Client Added';
export const ADD_TO_INTERNAL_LIST_SUCCESS = 'Client Added to Internal List';

export const REMOVE_FROM_INTERNAL_LIST_SUCCESS_TITLE = 'Client Removed';
export const REMOVE_FROM_INTERNAL_LIST_SUCCESS = 'Client Removed from Internal List';

export const UPDATE_AVAILABLE_BIDDER_SUCCESS_TITLE = 'Success';
export const UPDATE_AVAILABLE_BIDDER_SUCCESS = 'Available Bidder information updated';
export const UPDATE_AVAILABLE_BIDDER_ERROR_TITLE = 'Error';
export const UPDATE_AVAILABLE_BIDDER_ERROR = 'Error updating Available Bidder information. Please try again.';

export const INTERNAL_LIST_ERROR_TITLE = 'Internal list Error';
export const ADD_TO_INTERNAL_LIST_ERROR = "We're experiencing an error attempting to add this client to the Internal list. Please try again.";
export const REMOVE_FROM_INTERNAL_LIST_ERROR = "We're experiencing an error attempting to remove this client from the Internal list. Please try again.";

export const HANDSHAKE_OFFERED_TITLE = 'Handshake Offered!';
export const HANDSHAKE_OFFERED_BODY = ({ name, message }) =>
  HandshakeOffered({ name, message });

export const HANDSHAKE_REVOKED_TITLE = 'Handshake Revoked';
export const HANDSHAKE_REVOKED_BODY = ({ name, message }) =>
  HandshakeRevoked({ name, message });

export const HANDSHAKE_ACCEPTED_TITLE = 'Handshake Accepted!';
export const HANDSHAKE_ACCEPTED_BODY = ({ position_info, username, isCDO }) =>
  HandshakeAccepted({ position_info, username, isCDO });
export const HANDSHAKE_ACCEPT_ERROR = "We're experiencing an error attempting to accept the handshake. Please try again.";

export const HANDSHAKE_DECLINE_TITLE = 'Handshake Declined';
export const HANDSHAKE_DECLINE_BODY = 'Handshake successfully declined.';
export const HANDSHAKE_DECLINE_ERROR = "We're experiencing an error attempting to decline the handshake. Please try again.";

export const COMING_SOON = 'Coming Soon';

export const UPDATE_CLASSIFICATIONS_SUCCESS = "Client's classifications updated";
export const UPDATE_CLASSIFICATIONS_ERROR = "Error updating client's classifications";

export const NO_NUMBER = '--';

export const UPDATE_AGENDA_ITEM_SUCCESS_TITLE = 'Agenda Item Saved';
export const UPDATE_AGENDA_ITEM_SUCCESS = 'This Agenda Item has been saved successfully.';
export const UPDATE_AGENDA_ITEM_ERROR_TITLE = 'Agenda Item Error';
export const UPDATE_AGENDA_ITEM_ERROR = 'There was an issue attempting to save this Agenda Item. Please try again.';

export const ADD_FREQUENT_POSITION_ERROR_TITLE = 'Frequent Position Error';
export const ADD_FREQUENT_POSITION_ERROR = 'Error adding Frequent Position. Please try again.';

export const SAVE_ADMIN_REMARK_SUCCESS_TITLE = 'Remark Saved';
export const SAVE_ADMIN_REMARK_SUCCESS = 'This Remark has been saved successfully.';
export const SAVE_ADMIN_REMARK_HAS_ERRORED_TITLE = 'Remark Save Error';
export const SAVE_ADMIN_REMARK_HAS_ERRORED = 'There was an issue attempting to save this Remark. Please try again.';

export const UPDATE_PANEL_MEETING_SUCCESS_TITLE = 'Panel Meeting Saved';
export const UPDATE_PANEL_MEETING_SUCCESS = (id) => PanelMeetingMessage({ id });
export const UPDATE_PANEL_MEETING_ERROR_TITLE = 'Panel Meeting Error';
export const UPDATE_PANEL_MEETING_ERROR = 'There was an issue attempting to save this Panel Meeting. Please try again.';

export const UPDATE_POST_PANEL_PROCESSING_SUCCESS_TITLE = 'Post Panel Processing Saved';
export const UPDATE_POST_PANEL_PROCESSING_SUCCESS = 'This Post Panel Processing has been saved successfully.';
export const UPDATE_POST_PANEL_PROCESSING_ERROR_TITLE = 'Post Panel Processing Error';
export const UPDATE_POST_PANEL_PROCESSING_ERROR = 'There was an issue attempting to save this Post Panel Processing. Please try again.';

export const UPDATE_PUBLISHABLE_POSITION_SUCCESS_TITLE = 'Publishable Position Saved';
export const UPDATE_PUBLISHABLE_POSITION_SUCCESS = 'This Publishable Position has been successfully saved.';
export const UPDATE_PUBLISHABLE_POSITION_ERROR_TITLE = 'Publishable Position Error';
export const UPDATE_PUBLISHABLE_POSITION_ERROR = 'There was an issue attempting to save this Publishable Position. Please try again.';

export const UPDATE_PROJECTED_VACANCY_SUCCESS_TITLE = 'Projected Vacancy Position Saved';
export const UPDATE_PROJECTED_VACANCY_SUCCESS = 'This Projected Vacancy Position has been successfully saved.';
export const UPDATE_PROJECTED_VACANCY_ERROR_TITLE = 'Projected Vacancy Position Error';
export const UPDATE_PROJECTED_VACANCY_ERROR = 'There was an issue attempting to save this Projected Vacancy Position. Please try again.';

export const ADD_TO_PROPOSED_CYCLE_SUCCESS_TITLE = 'Successfully Added to Proposed Cycle';
export const ADD_TO_PROPOSED_CYCLE_SUCCESS = 'Positions have been successfully added to the proposed cycle.';
export const ADD_TO_PROPOSED_CYCLE_ERROR_TITLE = 'Error Adding to Proposed Cycle';
export const ADD_TO_PROPOSED_CYCLE_ERROR = 'There was an issue attempting to add the positions to the proposed cycle. Please try again.';

export const REMOVE_CYCLE_POSITION_SUCCESS_TITLE = 'Cycle Position Removed';
export const REMOVE_CYCLE_POSITION_SUCCESS = 'Cycle Position has been removed.';
export const REMOVE_CYCLE_POSITION_ERROR_TITLE = 'Cycle Position Delete Error';
export const REMOVE_CYCLE_POSITION_ERROR = 'There was an issue attempting to remove this Cycle Position. Please try again.';

export const EDIT_CYCLE_POSITION_SUCCESS_TITLE = 'Cycle Position Updated';
export const EDIT_CYCLE_POSITION_SUCCESS = 'The Cycle Position has been updated';
export const EDIT_CYCLE_POSITION_ERROR_TITLE = 'Cycle Position Edit Error';
export const EDIT_CYCLE_POSITION_ERROR = 'There was an issue attempting to update this Cycle Position. Please try again.';

export const EDIT_ASSIGNMENT_SUCCESS_TITLE = 'Assignment Updated';
export const EDIT_ASSIGNMENT_SUCCESS = 'The Assignment has been updated';
export const EDIT_ASSIGNMENT_ERROR_TITLE = 'Edit Assignment Error';
export const EDIT_ASSIGNMENT_ERROR = 'There was an issue attempting to update this Assignment. Please try again.';

export const CREATE_ASSIGNMENT_SUCCESS_TITLE = 'Assignment Created';
export const CREATE_ASSIGNMENT_SUCCESS = 'The Assignment has been created';
export const CREATE_ASSIGNMENT_ERROR_TITLE = 'Create Assignment Error';
export const CREATE_ASSIGNMENT_ERROR = 'There was an issue attempting to create this Assignment. Please try again.';

export const ADD_BID_SEASON_SUCCESS_TITLE = 'Bid Season Added';
export const ADD_BID_SEASON_SUCCESS = 'Bid Season has been added.';
export const ADD_BID_SEASON_ERROR_TITLE = 'Bid Season Add Error';
export const ADD_BID_SEASON_ERROR = 'There was an issue attempting to add this Bid Season. Please try again.';

export const EDIT_BID_SEASON_SUCCESS_TITLE = 'Bid Season Updated';
export const EDIT_BID_SEASON_SUCCESS = 'The Bid Season has been updated';
export const EDIT_BID_SEASON_ERROR_TITLE = 'Bid Season Edit Error';
export const EDIT_BID_SEASON_ERROR = 'There was an issue attempting to update this Bid Season. Please try again.';

export const MANAGE_POST_ACCESS_ADD_SUCCESS_TITLE = 'Access Granted for Post(s)';
export const MANAGE_POST_ACCESS_ADD_SUCCESS = 'Access granted to post(s) successfully';
export const MANAGE_POST_ACCESS_ADD_ERROR_TITLE = 'Access Grant Error';
export const MANAGE_POST_ACCESS_ADD_ERROR = 'There was an issue attempting to update access for these post(s). Please try again.';

export const SEARCH_POST_ACCESS_REMOVE_SUCCESS_TITLE = 'Access Removed for Post(s)';
export const SEARCH_POST_ACCESS_REMOVE_SUCCESS = 'Access removed from post(s) successfully';
export const SEARCH_POST_ACCESS_REMOVE_ERROR_TITLE = 'Access Remove Error';
export const SEARCH_POST_ACCESS_REMOVE_ERROR = 'There was an issue attempting to update access for these post(s). Please try again.';

export const UPDATE_CYCLE_JOB_CATEGORIES_SUCCESS_TITLE = 'Cycle Job Categories Saved';
export const UPDATE_CYCLE_JOB_CATEGORIES_SUCCESS = 'This Cycle Job Categories has been successfully saved.';
export const UPDATE_CYCLE_JOB_CATEGORIES_ERROR_TITLE = 'Cycle Job Categories Error';
export const UPDATE_CYCLE_JOB_CATEGORIES_ERROR = 'There was an issue attempting to save this Cycle Job Categories. Please try again.';

export const BIDDER_PORTFOLIO_ADD_SUCCESS_TITLE = 'Bidder Portfolio Added';
export const BIDDER_PORTFOLIO_ADD_SUCCESS = 'Bidder Portfolio has been added.';
export const BIDDER_PORTFOLIO_ADD_ERROR_TITLE = 'Bidder Portfolio Add Error';
export const BIDDER_PORTFOLIO_ADD_ERROR = 'There was an issue attempting to add this Bidder Portfolio. Please try again.';

export const BUREAU_EXCEPTIONS_ADD_SUCCESS_TITLE = 'Bureau Exceptions Added';
export const BUREAU_EXCEPTIONS_ADD_SUCCESS = 'Bureau Exceptions have been added.';
export const BUREAU_EXCEPTIONS_ADD_ERROR_TITLE = 'Adding Bureau Exceptions Error';
export const BUREAU_EXCEPTIONS_ADD_ERROR = 'There was an issue attempting to add Bureau Exceptions. Please try again.';

export const BUREAU_EXCEPTIONS_UPDATE_SUCCESS_TITLE = 'Bureau Exceptions Updated';
export const BUREAU_EXCEPTIONS_UPDATE_SUCCESS = 'Bureau Exceptions have been updated.';
export const BUREAU_EXCEPTIONS_UPDATE_ERROR_TITLE = 'Updating Bureau Exceptions Error';
export const BUREAU_EXCEPTIONS_UPDATE_ERROR = 'There was an issue attempting to update Bureau Exceptions. Please try again.';

export const BUREAU_EXCEPTIONS_DELETE_SUCCESS_TITLE = 'Bureau Exceptions Deleted';
export const BUREAU_EXCEPTIONS_DELETE_SUCCESS = 'Bureau Exceptions have been deleted.';
export const BUREAU_EXCEPTIONS_DELETE_ERROR_TITLE = 'Deleting Bureau Exceptions Error';
export const BUREAU_EXCEPTIONS_DELETE_ERROR = 'There was an issue attempting to delete Bureau Exceptions. Please try again.';

export const UPDATE_ENTRY_LEVEL_SUCCESS_TITLE = 'Entry Level Position Saved';
export const UPDATE_ENTRY_LEVEL_SUCCESS = 'This Entry Level Position has been successfully saved.';
export const UPDATE_ENTRY_LEVEL_ERROR_TITLE = 'Entry Level Position Error';
export const UPDATE_ENTRY_LEVEL_ERROR = 'There was an issue attempting to save this Entry Level Position. Please try again.';

export const UPDATE_BID_AUDIT_SUCCESS_TITLE = 'Bid Audit Saved';
export const UPDATE_BID_AUDIT_SUCCESS = 'This Bid Audit has been successfully saved.';
export const UPDATE_BID_AUDIT_ERROR_TITLE = 'Bid Audit Error';
export const UPDATE_BID_AUDIT_ERROR = 'There was an issue attempting to save this Bid Audit. Please try again.';

export const DELETE_BID_AUDIT_SUCCESS_TITLE = 'Bid Audit Deleted';
export const DELETE_BID_AUDIT_SUCCESS = 'This Bid Audit has been successfully deleted.';
export const DELETE_BID_AUDIT_ERROR_TITLE = 'Bid Audit Error';
export const DELETE_BID_AUDIT_ERROR = 'There was an issue attempting to delete this Bid Audit. Please try again.';

export const JOB_CATEGORIES_EDIT_SUCCESS_TITLE = 'Job Category Edits Successfully Saved';
export const JOB_CATEGORIES_EDIT_SUCCESS = 'Your edits to the selected Job Category have been saved';
export const JOB_CATEGORIES_EDIT_ERROR_TITLE = 'Job Category Edit Error';
export const JOB_CATEGORIES_EDIT_ERROR = 'There was an issue attempting to save your edits to this Job Category. Please try again.';
export const JOB_CATEGORIES_SAVE_NEW_SUCCESS_TITLE = 'New Job Category Successfully Saved';
export const JOB_CATEGORIES_SAVE_NEW_SUCCESS = 'New Job Category has been added';
export const JOB_CATEGORIES_SAVE_NEW_ERROR_TITLE = 'Create New Job Category Error';
export const JOB_CATEGORIES_SAVE_NEW_ERROR = 'There was an issue attempting to save your new Job Category. Please try again.';
export const JOB_CATEGORIES_DELETE_SUCCESS_TITLE = 'Delete Job Category Success';
export const JOB_CATEGORIES_DELETE_SUCCESS = 'The Job Category has been deleted';
export const JOB_CATEGORIES_DELETE_ERROR_TITLE = 'Delete Job Category Error';
export const JOB_CATEGORIES_DELETE_ERROR = 'There was an issue attempting to delete the selected Job Category. Please try again.';

export const EDIT_BIDDING_TOOL_SUCCESS_TITLE = 'Bidding Tool Updated';
export const EDIT_BIDDING_TOOL_SUCCESS = 'The Bidding Tool has been updated';
export const EDIT_BIDDING_TOOL_ERROR_TITLE = 'Edit Bidding Tool Error';
export const EDIT_BIDDING_TOOL_ERROR = 'There was an issue attempting to update this Bidding Tool. Please try again.';

export const CREATE_BIDDING_TOOL_SUCCESS_TITLE = 'Bidding Tool Created';
export const CREATE_BIDDING_TOOL_SUCCESS = 'The Bidding Tool has been created';
export const CREATE_BIDDING_TOOL_ERROR_TITLE = 'Create Bidding Tool Error';
export const CREATE_BIDDING_TOOL_ERROR = 'There was an issue attempting to create this Bidding Tool. Please try again.';

export const DELETE_BIDDING_TOOL_SUCCESS_TITLE = 'Bidding Tool Deleted';
export const DELETE_BIDDING_TOOL_SUCCESS = 'The Bidding Tool has been deleted';
export const DELETE_BIDDING_TOOL_ERROR_TITLE = 'Delete Bidding Tool Error';
export const DELETE_BIDDING_TOOL_ERROR = 'There was an issue attempting to delete this Bidding Tool. Please try again.';

export const ASSIGNMENT_CYCLE_EDIT_SUCCESS_TITLE = 'Assignment Cycle Updated';
export const ASSIGNMENT_CYCLE_EDIT_SUCCESS = 'The Assignment Cycle has been updated';
export const ASSIGNMENT_CYCLE_EDIT_ERROR_TITLE = 'Assignment Cycle Edit Error';
export const ASSIGNMENT_CYCLE_EDIT_ERROR = 'There was an issue attempting to update this Assignment Cycle. Please try again.';

export const ASSIGNMENT_CYCLE_DELETE_SUCCESS_TITLE = 'Assignment Cycle Deleted';
export const ASSIGNMENT_CYCLE_DELETE_SUCCESS = 'The Assignment Cycle has been deleted';
export const ASSIGNMENT_CYCLE_DELETE_ERROR_TITLE = 'Assignment Cycle Delete Error';
export const ASSIGNMENT_CYCLE_DELETE_ERROR = 'There was an issue attempting to delete this Assignment Cycle. Please try again.';

export const ASSIGNMENT_CYCLE_POST_SUCCESS_TITLE = 'Assignment Cycle Created';
export const ASSIGNMENT_CYCLE_POST_SUCCESS = 'The Assignment Cycle has been created';
export const ASSIGNMENT_CYCLE_POST_ERROR_TITLE = 'Assignment Cycle Create Error';
export const ASSIGNMENT_CYCLE_POST_ERROR = 'There was an issue attempting to create this Assignment Cycle. Please try again.';

export const UPDATE_POSITION_CLASSIFICATION_SUCCESS_TITLE = 'Position Clasifications Saved';
export const UPDATE_POSITION_CLASSIFICATION_SUCCESS = 'This Position Clasifications has been successfully saved.';
export const UPDATE_POSITION_CLASSIFICATION_ERROR_TITLE = 'Position Clasifications Error';
export const UPDATE_POSITION_CLASSIFICATION_ERROR = 'There was an issue attempting to save this Position Clasifications. Please try again.';

export const CREATE_POSITION_CLASSIFICATION_SUCCESS_TITLE = 'Position Clasifications Created';
export const CREATE_POSITION_CLASSIFICATION_SUCCESS = 'This Position Clasifications has been successfully created.';
export const CREATE_POSITION_CLASSIFICATION_ERROR_TITLE = 'Position Clasifications Error';
export const CREATE_POSITION_CLASSIFICATION_ERROR = 'There was an issue attempting to create this Position Clasifications. Please try again.';
