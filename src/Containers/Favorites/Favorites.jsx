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
import { scrollToTop } from '../../utilities';

const PAGE_SIZE = 12;

class FavoritePositionsContainer extends Component {
  constructor(props) {
    super(props);
    this.onToggleFavorite = this.onToggleFavorite.bind(this);
    this.getSortedFavorites = this.getSortedFavorites.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.state = {
      page: 1,
    };
  }

  componentWillMount() {
    this.getFavorites();
    this.props.bidListFetchData();
  }

  onToggleFavorite(id, remove) {
    this.props.toggleFavorite(id, remove);
  }

  onPageChange({ page }) {
    this.setState({ page }, () => {
      scrollToTop({ delay: 0, duration: 400 });
      this.getFavorites();
    });
  }
  getFavorites() {
    // const { page } = this.state; TODO: backend needed
    // this.props.fetchData(page);
    this.props.fetchData();
  }


  getSortedFavorites(type) {
    if (type.target && type.target.value) {
      this.props.fetchData(type.target.value);
    }
  }

  render() {
    const { favoritePositions, favoritePositionsIsLoading,
      favoritePositionsHasErrored, bidList } = this.props;

    const { page } = this.state;

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
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={this.onPageChange}
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
  bidListFetchData: EMPTY_FUNCTION,
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
  // eslint-disable-next-line max-len
  // fetchData: sortType => dispatch(favoritePositionsFetchData(sortType, PAGE_SIZE, page)), TODO: backend needed
  toggleFavorite: (id, remove) =>
    // Since this page references the full Favorites route, pass true to explicitly refresh them
    dispatch(userProfileToggleFavoritePosition(id, remove, true)),
  bidListFetchData: () => dispatch(bidListFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FavoritePositionsContainer));
