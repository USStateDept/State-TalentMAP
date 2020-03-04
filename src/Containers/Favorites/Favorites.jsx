import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { favoritePositionsFetchData } from '../../actions/favoritePositions';
import { bidListFetchData } from '../../actions/bidList';
import { userProfileToggleFavoritePosition } from '../../actions/userProfile';
import { POSITION_SEARCH_RESULTS, BID_LIST, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { POSITION_RESULTS_OBJECT } from '../../Constants/DefaultProps';
import FavoritePositions from '../../Components/FavoritePositions';
import CompareDrawer from '../../Components/CompareDrawer';

class FavoritePositionsContainer extends Component {
  UNSAFE_componentWillMount() {
    this.getFavorites();
    this.props.bidListFetchData();
  }

  onToggleFavorite = (id, remove) => {
    this.props.toggleFavorite(id, remove);
  };

  getFavorites() {
    this.props.fetchData();
  }

  getSortedFavorites = type => {
    if (type.target && type.target.value) {
      this.props.fetchData(type.target.value);
    }
  };

  render() {
    const { favoritePositions, favoritePositionsIsLoading,
      favoritePositionsHasErrored, bidList } = this.props;
    return (
      <div>
        <FavoritePositions
          favorites={favoritePositions.favorites}
          favoritesPV={favoritePositions.favoritesPV}
          favoritePositionsIsLoading={favoritePositionsIsLoading}
          favoritePositionsHasErrored={favoritePositionsHasErrored}
          toggleFavorite={this.onToggleFavorite}
          bidList={bidList.results}
          onSortChange={this.getSortedFavorites}
        />
        <CompareDrawer />
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
  bidList: BID_LIST.isRequired,
  bidListFetchData: PropTypes.func.isRequired,
};

FavoritePositionsContainer.defaultProps = {
  favoritePositions: POSITION_RESULTS_OBJECT,
  favoritePositionsIsLoading: false,
  favoritePositionsHasErrored: false,
  bidList: { results: [] },
  bidListFecthData: EMPTY_FUNCTION,
};

FavoritePositionsContainer.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  favoritePositions: state.favoritePositions,
  favoritePositionsHasErrored: state.favoritePositionsHasErrored,
  favoritePositionsIsLoading: state.favoritePositionsIsLoading,
  bidList: state.bidListFetchDataSuccess,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: sortType => dispatch(favoritePositionsFetchData(sortType)),
  toggleFavorite: (id, remove) =>
    // Since this page references the full Favorites route, pass true to explicitly refresh them
    dispatch(userProfileToggleFavoritePosition(id, remove, true)),
  bidListFetchData: () => dispatch(bidListFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FavoritePositionsContainer));
