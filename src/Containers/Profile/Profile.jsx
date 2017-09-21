import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { favoritePositionsFetchData } from '../../actions/favoritePositions';
import { USER_PROFILE } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import ProfilePage from '../../Components/ProfilePage';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';

class Post extends Component {

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      this.getFavorites();
    }
  }

  getFavorites() {
    this.props.fetchData();
  }

  render() {
    const { userProfile, favoritePositions,
      favoritePositionsIsLoading, favoritePositionsHasErrored } = this.props;
    return (
      <div>
        <ProfilePage
          user={userProfile}
          favoritePositions={favoritePositions}
          favoritePositionsIsLoading={favoritePositionsIsLoading}
          favoritePositionsHasErrored={favoritePositionsHasErrored}
        />
      </div>
    );
  }
}

Post.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  isAuthorized: PropTypes.func.isRequired,
  userProfile: USER_PROFILE,
  favoritePositions: PropTypes.arrayOf().isRequired,
  favoritePositionsIsLoading: PropTypes.bool.isRequired,
  favoritePositionsHasErrored: PropTypes.bool.isRequired,
};

Post.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
  favoritePositions: [],
  favoritePositionsIsLoading: true,
  favoritePositionsHasErrored: false,
};

Post.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  userProfile: state.userProfile,
  favoritePositions: state.favoritePositions,
  favoritesPositionsHasErrored: state.favoritePositionsHasErrored,
  favoritesPositionsIsLoading: state.favoritePositionsIsLoading,
  id: ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(favoritePositionsFetchData()),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
