import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import { positionDetailsFetchData } from '../../actions/positionDetails';
import { getLastRouteLink } from '../../actions/routerLocations';
import { userProfileToggleFavoritePosition } from '../../actions/userProfile';
import PositionDetails from '../../Components/PositionDetails/PositionDetails';
import { POSITION_DETAILS, EMPTY_FUNCTION, ROUTER_LOCATIONS, USER_PROFILE } from '../../Constants/PropTypes';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';

class Position extends Component {

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      this.getDetails(this.props.match.params.id);
    }
  }

  getDetails(id) {
    this.props.fetchData(id);
  }

  render() {
    const { positionDetails, isLoading, hasErrored, routerLocations, userProfile, toggleFavorite,
        userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored } = this.props;
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
  positionDetails: PropTypes.arrayOf(POSITION_DETAILS),
  isAuthorized: PropTypes.func.isRequired,
  routerLocations: ROUTER_LOCATIONS,
  userProfile: USER_PROFILE,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

Position.defaultProps = {
  positionDetails: [],
  fetchData: EMPTY_FUNCTION,
  hasErrored: false,
  isLoading: true,
  routerLocations: [],
  userProfile: {},
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
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(positionDetailsFetchData(url)),
  onNavigateTo: dest => dispatch(push(dest)),
  toggleFavorite: (id, remove) => dispatch(userProfileToggleFavoritePosition(id, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Position));
