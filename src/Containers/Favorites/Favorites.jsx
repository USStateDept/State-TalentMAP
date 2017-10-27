import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { favoritePositionsFetchData } from '../../actions/favoritePositions';
import { userProfileToggleFavoritePosition } from '../../actions/userProfile';
import { POSITION_SEARCH_RESULTS } from '../../Constants/PropTypes';
import { POSITION_RESULTS_OBJECT } from '../../Constants/DefaultProps';
import FavoritePositions from '../../Components/FavoritePositions';

class FavoritePositionsContainer extends Component {
  constructor(props) {
    super(props);
    this.onToggleFavorite = this.onToggleFavorite.bind(this);
  }

  componentWillMount() {
    this.getFavorites();
  }

  onToggleFavorite(id, remove) {
    this.props.toggleFavorite(id, remove);
  }

  getFavorites() {
    this.props.fetchData();
  }

  render() {
    const { favoritePositions, userProfileFavoritePositionIsLoading,
      userProfileFavoritePositionHasErrored, favoritePositionsIsLoading,
      favoritePositionsHasErrored } = this.props;
    return (
      <div>
        <FavoritePositions
          favorites={favoritePositions}
          favoritePositionsIsLoading={favoritePositionsIsLoading}
          favoritePositionsHasErrored={favoritePositionsHasErrored}
          toggleFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
          toggleFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
          toggleFavorite={this.onToggleFavorite}
        />
      </div>
    );
  }
}

FavoritePositionsContainer.propTypes = {
  fetchData: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favoritePositions: POSITION_SEARCH_RESULTS,
  favoritePositionsIsLoading: PropTypes.bool.isRequired,
  favoritePositionsHasErrored: PropTypes.bool.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

FavoritePositionsContainer.defaultProps = {
  favoritePositions: POSITION_RESULTS_OBJECT,
  favoritePositionsIsLoading: false,
  favoritePositionsHasErrored: false,
  userProfileFavoritePositionIsLoading: false,
  userProfileFavoritePositionHasErrored: false,
};

FavoritePositionsContainer.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  favoritePositions: state.favoritePositions,
  favoritePositionsHasErrored: state.favoritePositionsHasErrored,
  favoritePositionsIsLoading: state.favoritePositionsIsLoading,
  userProfileFavoritePositionIsLoading: state.userProfileFavoritePositionIsLoading,
  userProfileFavoritePositionHasErrored: state.userProfileFavoritePositionHasErrored,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(favoritePositionsFetchData()),
  toggleFavorite: (id, remove) =>
    // Since this page references the full Favorites route, pass true to explicitly refresh them
    dispatch(userProfileToggleFavoritePosition(id, remove, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FavoritePositionsContainer));
