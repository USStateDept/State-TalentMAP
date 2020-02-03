import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import PositionDetails from '../../Components/PositionDetails/PositionDetails';
// Actions
import { positionDetailsFetchData } from '../../actions/positionDetails';
import { putHighlightedPosition, deleteHighlightPosition } from '../../actions/highlightPosition';
import { bidListFetchData } from '../../actions/bidList';
import {
  editDescriptionContent,
  editPocContent,
  editWebsiteContent,
  resetMessages,
} from '../../actions/descriptionEdit';

import { LOGIN_REDIRECT } from '../../login/routes';
import { DEFAULT_HIGHLIGHT_POSITION } from '../../Constants/DefaultProps';
import {
  POSITION_DETAILS,
  USER_PROFILE,
  BID_LIST,
  BID_LIST_TOGGLE_HAS_ERRORED,
  BID_LIST_TOGGLE_SUCCESS,
  DESCRIPTION_EDIT_HAS_ERRORED,
  EMPTY_FUNCTION,
  HIGHLIGHT_POSITION,
  BIDDER_OBJECT,
} from '../../Constants/PropTypes';

class Position extends Component {
  constructor(props) {
    super(props);
    this.editDescriptionContent = this.editDescriptionContent.bind(this);
    this.editPocContent = this.editPocContent.bind(this);
    this.editWebsiteContent = this.editWebsiteContent.bind(this);
  }

  componentWillMount() {
    const { isArchived, isProjectedVacancy } = this.props;
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(LOGIN_REDIRECT);
    } else if (isArchived) {
      this.getUPDetails(this.props.match.params.id);
    } else if (isProjectedVacancy) {
      this.getPVDetails(this.props.match.params.id);
    } else {
      this.getDetails(this.props.match.params.id);
      this.props.fetchBidList();
    }
  }

  getDetails(id) {
    this.props.fetchData(id);
  }

  getPVDetails(id) {
    this.props.fetchPVData(id);
  }

  getUPDetails(id) {
    this.props.fetchUPData(id);
  }

  editDescriptionContent(content) {
    this.props.editDescriptionContent(this.props.positionDetails.description.id, content);
  }

  editPocContent(content) {
    this.props.editPocContent(this.props.positionDetails.description.id, content);
  }

  editWebsiteContent(content) {
    this.props.editWebsiteContent(this.props.positionDetails.description.id, content);
  }

  render() {
    const {
      positionDetails,
      isLoading,
      hasErrored,
      userProfile,
      userProfileIsLoading,
      bidList,
      bidListHasErrored,
      bidListIsLoading,
      bidListToggleHasErrored,
      bidListToggleSuccess,
      descriptionEditHasErrored,
      descriptionEditIsLoading,
      descriptionEditSuccess,
      resetDescriptionEditMessages,
      highlightPosition,
      onHighlight,
      isProjectedVacancy,
      isArchived,
      client,
      clientIsLoading,
      clientHasErrored,
    } = this.props;

    const isClient = client && !!client.id && !clientIsLoading && !clientHasErrored;

    return (
      <PositionDetails
        details={positionDetails}
        isLoading={isLoading}
        hasErrored={hasErrored}
        userProfile={userProfile}
        userProfileIsLoading={userProfileIsLoading}
        bidList={bidList}
        bidListHasErrored={bidListHasErrored}
        bidListIsLoading={bidListIsLoading}
        bidListToggleHasErrored={bidListToggleHasErrored}
        bidListToggleSuccess={bidListToggleSuccess}
        editDescriptionContent={this.editDescriptionContent}
        editPocContent={this.editPocContent}
        editWebsiteContent={this.editWebsiteContent}
        descriptionEditHasErrored={descriptionEditHasErrored}
        descriptionEditIsLoading={descriptionEditIsLoading}
        descriptionEditSuccess={descriptionEditSuccess}
        resetDescriptionEditMessages={resetDescriptionEditMessages}
        highlightPosition={highlightPosition}
        onHighlight={onHighlight}
        isProjectedVacancy={isProjectedVacancy}
        isArchived={isArchived}
        isClient={isClient}
      />
    );
  }
}

Position.contextTypes = {
  router: PropTypes.object,
};

Position.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchData: PropTypes.func,
  fetchPVData: PropTypes.func,
  fetchUPData: PropTypes.func,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  positionDetails: POSITION_DETAILS,
  isAuthorized: PropTypes.func.isRequired,
  userProfile: USER_PROFILE,
  userProfileIsLoading: PropTypes.bool,
  fetchBidList: PropTypes.func,
  bidListHasErrored: PropTypes.bool,
  bidListIsLoading: PropTypes.bool,
  bidList: BID_LIST,
  bidListToggleHasErrored: BID_LIST_TOGGLE_HAS_ERRORED,
  bidListToggleSuccess: BID_LIST_TOGGLE_SUCCESS,
  editDescriptionContent: PropTypes.func.isRequired,
  editPocContent: PropTypes.func.isRequired,
  editWebsiteContent: PropTypes.func.isRequired,
  descriptionEditHasErrored: DESCRIPTION_EDIT_HAS_ERRORED,
  descriptionEditIsLoading: PropTypes.bool,
  descriptionEditSuccess: PropTypes.bool,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
  highlightPosition: HIGHLIGHT_POSITION,
  onHighlight: PropTypes.func.isRequired,
  isProjectedVacancy: PropTypes.bool,
  isArchived: PropTypes.bool,
  client: BIDDER_OBJECT,
  clientIsLoading: PropTypes.bool,
  clientHasErrored: PropTypes.bool,
};

Position.defaultProps = {
  positionDetails: {},
  fetchData: EMPTY_FUNCTION,
  fetchPVData: EMPTY_FUNCTION,
  fetchUPData: EMPTY_FUNCTION,
  hasErrored: false,
  isLoading: true,
  userProfile: {},
  userProfileIsLoading: false,
  fetchBidList: EMPTY_FUNCTION,
  bidList: { results: [] },
  bidListHasErrored: false,
  bidListIsLoading: false,
  bidListToggleHasErrored: false,
  bidListToggleSuccess: false,
  editDescriptionContent: EMPTY_FUNCTION,
  editPocContent: EMPTY_FUNCTION,
  editWebsiteContent: EMPTY_FUNCTION,
  descriptionEditHasErrored: false,
  descriptionEditIsLoading: false,
  descriptionEditSuccess: false,
  highlightPosition: DEFAULT_HIGHLIGHT_POSITION,
  onHighlight: EMPTY_FUNCTION,
  isProjectedVacancy: false,
  isArchived: false,
  client: {},
  clientIsLoading: false,
  clientHasErrored: false,
};

const mapStateToProps = (state, ownProps) => ({
  positionDetails: state.positionDetails,
  hasErrored: state.positionDetailsHasErrored,
  isLoading: state.positionDetailsIsLoading,
  id: ownProps,
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  bidListHasErrored: state.bidListHasErrored,
  bidListIsLoading: state.bidListIsLoading,
  bidList: state.bidListFetchDataSuccess,
  bidListToggleHasErrored: state.bidListToggleHasErrored,
  bidListToggleSuccess: state.bidListToggleSuccess,
  descriptionEditHasErrored: state.descriptionEditHasErrored,
  descriptionEditIsLoading: state.descriptionEditIsLoading,
  descriptionEditSuccess: state.descriptionEditSuccess,
  highlightPosition: state.highlightPosition,
  client: get(state, 'clientView.client'),
  clientIsLoading: get(state, 'clientView.isLoading'),
  clientHasErrored: get(state, 'clientView.hasErrored'),
});

export const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(positionDetailsFetchData(id)),
  fetchPVData: id => dispatch(positionDetailsFetchData(id, true)),
  fetchUPData: id => dispatch(positionDetailsFetchData(id, false, true)),
  onNavigateTo: dest => dispatch(push(dest)),
  fetchBidList: () => dispatch(bidListFetchData()),
  editDescriptionContent: (id, content) => dispatch(editDescriptionContent(id, content)),
  editPocContent: (id, content) => dispatch(editPocContent(id, content)),
  editWebsiteContent: (id, content) => dispatch(editWebsiteContent(id, content)),
  resetDescriptionEditMessages: () => dispatch(resetMessages()),
  onHighlight: (id, checked) =>
    dispatch((checked ? putHighlightedPosition : deleteHighlightPosition)(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Position));
