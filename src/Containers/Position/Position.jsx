import { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import { POSITION_VIEW_TYPES } from 'Constants/PositionView';
import PositionDetails from 'Components/PositionDetails/PositionDetails';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
// Actions
import { getViewStats, postPositionView } from 'actions/positionStats';
import { positionDetailsFetchData } from 'actions/positionDetails';
import { deleteHighlightPosition, putHighlightedPosition } from 'actions/highlightPosition';
import { bidListFetchData } from 'actions/bidList';
import {
  editDescriptionContent,
  editPocContent,
  editWebsiteContent,
  resetMessages,
} from 'actions/descriptionEdit';

import { LOGIN_REDIRECT } from '../../login/routes';
import { DEFAULT_HIGHLIGHT_POSITION } from '../../Constants/DefaultProps';
import {
  BIDDER_OBJECT,
  BID_LIST,
  BID_LIST_TOGGLE_HAS_ERRORED,
  BID_LIST_TOGGLE_SUCCESS,
  DESCRIPTION_EDIT_HAS_ERRORED,
  EMPTY_FUNCTION,
  HIGHLIGHT_POSITION,
  POSITION_DETAILS,
  ROUTER_LOCATION_OBJECT,
  USER_PROFILE,
} from '../../Constants/PropTypes';

class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      type: null,
    };
  }
  getChildContext() {
    const { tandem } = queryString.parse(this.props.location.search);
    const isTandemTwo = tandem === 'true';
    return {
      isTandemTwo,
    };
  }
  UNSAFE_componentWillMount() {
    const { isProjectedVacancy } = this.props;
    const id = get(this.props, 'match.params.id');
    let type;
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(LOGIN_REDIRECT);
    } else if (isProjectedVacancy) {
      this.getPVDetails(id);
      type = POSITION_VIEW_TYPES.PV.value;
    } else {
      this.getDetails(id);
      this.props.fetchBidList();
      type = POSITION_VIEW_TYPES.AP.value;
    }

    this.setState({ id, type });

    postPositionView(id, type);
  }

  getDetails(id) {
    this.props.fetchData(id);
  }

  getPVDetails(id) {
    this.props.fetchPVData(id);
  }

  editDescriptionContent = content => {
    this.props.editDescriptionContent(this.props.positionDetails.description.id, content);
  };

  editPocContent = content => {
    this.props.editPocContent(this.props.positionDetails.description.id, content);
  };

  editWebsiteContent = content => {
    this.props.editWebsiteContent(this.props.positionDetails.description.id, content);
  };

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
      client,
      clientIsLoading,
      clientHasErrored,
      getViews,
    } = this.props;
    const { id, type } = this.state;

    const isClient = client && !!client.id && !clientIsLoading && !clientHasErrored;

    const onMount = () => getViews(id, type);

    return (
      <>
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
          isClient={isClient}
        />
        {/* Use a component to run our Permission check and then call a function to fetch stats */}
        <PermissionsWrapper permissions="superuser" onMount={onMount}><></></PermissionsWrapper>
      </>
    );
  }
}

Position.contextTypes = {
  router: PropTypes.object,
};

Position.childContextTypes = {
  isTandemTwo: PropTypes.bool,
};

Position.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: ROUTER_LOCATION_OBJECT,
  fetchData: PropTypes.func,
  fetchPVData: PropTypes.func,
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
  client: BIDDER_OBJECT,
  clientIsLoading: PropTypes.bool,
  clientHasErrored: PropTypes.bool,
  getViews: PropTypes.func,
};

Position.defaultProps = {
  positionDetails: {},
  fetchData: EMPTY_FUNCTION,
  fetchPVData: EMPTY_FUNCTION,
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
  client: {},
  clientIsLoading: false,
  clientHasErrored: false,
  getViews: EMPTY_FUNCTION,
  location: {
    pathname: '',
    search: '',
    hash: '',
    key: '',
  },
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
  onNavigateTo: dest => dispatch(push(dest)),
  fetchBidList: () => dispatch(bidListFetchData()),
  editDescriptionContent: (id, content) => dispatch(editDescriptionContent(id, content)),
  editPocContent: (id, content) => dispatch(editPocContent(id, content)),
  editWebsiteContent: (id, content) => dispatch(editWebsiteContent(id, content)),
  resetDescriptionEditMessages: () => dispatch(resetMessages()),
  onHighlight: (id, checked) =>
    dispatch((checked ? putHighlightedPosition : deleteHighlightPosition)(id)),
  getViews: (id, type) => dispatch(getViewStats(id, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Position));
