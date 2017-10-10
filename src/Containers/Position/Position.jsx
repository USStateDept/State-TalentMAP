import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import { positionDetailsFetchData } from '../../actions/positionDetails';
import { getLastRouteLink } from '../../actions/routerLocations';
import { userProfileToggleFavoritePosition } from '../../actions/userProfile';
import * as bidListActions from '../../actions/bidList';
import PositionDetails from '../../Components/PositionDetails/PositionDetails';
import * as PROP_TYPES from '../../Constants/PropTypes';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';

class Position extends Component {

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      this.getDetails(this.props.match.params.id);
      this.props.fetchBidList();
    }
  }

  getDetails(id) {
    this.props.fetchData(id);
  }

  render() {
    const { positionDetails, isLoading, hasErrored, routerLocations, userProfile, toggleFavorite,
        userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored,
        bidList, toggleBidPosition, bidListHasErrored, bidListIsLoading, bidListToggleHasErrored,
        bidListToggleIsLoading, bidListToggleSuccess } = this.props;
    return (
      <div>
        <PositionDetails
          details={positionDetails[0]}
          isLoading={isLoading}
          hasErrored={hasErrored}
          goBackLink={getLastRouteLink(routerLocations)}
          userProfile={userProfile}
          toggleFavorite={toggleFavorite}
          userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
          userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
          toggleBidPosition={toggleBidPosition}
          bidList={bidList}
          bidListHasErrored={bidListHasErrored}
          bidListIsLoading={bidListIsLoading}
          bidListToggleHasErrored={bidListToggleHasErrored}
          bidListToggleIsLoading={bidListToggleIsLoading}
          bidListToggleSuccess={bidListToggleSuccess}
        />
      </div>
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
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  positionDetails: PropTypes.arrayOf(PROP_TYPES.POSITION_DETAILS),
  isAuthorized: PropTypes.func.isRequired,
  routerLocations: PROP_TYPES.ROUTER_LOCATIONS,
  userProfile: PROP_TYPES.USER_PROFILE,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool,
  userProfileFavoritePositionHasErrored: PropTypes.bool,
  fetchBidList: PropTypes.func,
  toggleBidPosition: PropTypes.func,
  bidListHasErrored: PropTypes.bool,
  bidListIsLoading: PropTypes.bool,
  bidList: PROP_TYPES.BID_LIST,
  bidListToggleHasErrored: PROP_TYPES.BID_LIST_TOGGLE_HAS_ERRORED,
  bidListToggleIsLoading: PropTypes.bool,
  bidListToggleSuccess: PROP_TYPES.BID_LIST_TOGGLE_SUCCESS,
};

Position.defaultProps = {
  positionDetails: [],
  fetchData: PROP_TYPES.EMPTY_FUNCTION,
  hasErrored: false,
  isLoading: true,
  routerLocations: [],
  userProfile: {},
  userProfileFavoritePositionIsLoading: true,
  userProfileFavoritePositionHasErrored: false,
  fetchBidList: PROP_TYPES.EMPTY_FUNCTION,
  toggleBidPosition: PROP_TYPES.EMPTY_FUNCTION,
  bidList: { results: [] },
  bidListHasErrored: false,
  bidListIsLoading: false,
  bidListToggleHasErrored: false,
  bidListToggleIsLoading: false,
  bidListToggleSuccess: false,
};

const mapStateToProps = (state, ownProps) => ({
  positionDetails: state.positionDetails,
  hasErrored: state.positionDetailsHasErrored,
  isLoading: state.positionDetailsIsLoading,
  routerLocations: state.routerLocations,
  id: ownProps,
  userProfile: state.userProfile,
  userProfileFavoritePositionIsLoading: state.userProfileFavoritePositionIsLoading,
  userProfileFavoritePositionHasErrored: state.userProfileFavoritePositionHasErrored,
  bidListHasErrored: state.bidListHasErrored,
  bidListIsLoading: state.bidListIsLoading,
  bidList: state.bidListFetchDataSuccess,
  bidListToggleHasErrored: state.bidListToggleHasErrored,
  bidListToggleIsLoading: state.bidListToggleIsLoading,
  bidListToggleSuccess: state.bidListToggleSuccess,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(positionDetailsFetchData(url)),
  onNavigateTo: dest => dispatch(push(dest)),
  toggleFavorite: (id, remove) => dispatch(userProfileToggleFavoritePosition(id, remove)),
  fetchBidList: () => dispatch(bidListActions.bidListFetchData()),
  toggleBidPosition: (id, remove) => dispatch(bidListActions.toggleBidPosition(id, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Position));
