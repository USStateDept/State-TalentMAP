import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { POSITION_DETAILS_ARRAY, FAVORITE_POSITIONS_ARRAY, BID_RESULTS, HOME_PAGE_CARD_TYPE } from '../../Constants/PropTypes';

const propTypes = {
  positions: POSITION_DETAILS_ARRAY,
  favorites: FAVORITE_POSITIONS_ARRAY,
  favoritesPV: FAVORITE_POSITIONS_ARRAY,
  isLoading: PropTypes.bool,
  bidList: BID_RESULTS.isRequired,
  type: HOME_PAGE_CARD_TYPE,
  refreshFavorites: PropTypes.bool,
  title: PropTypes.string.isRequired, // should be unique per page, since its used a react key
  showBidListButton: PropTypes.bool,
  useShortFavButton: PropTypes.bool,
  showCompareButton: PropTypes.bool,
};

const defaultProps = {
  positions: [],
  favorites: [],
  favoritesPV: [],
  isLoading: false,
  type: 'default',
  refreshFavorites: false,
  showBidListButton: false,
  useShortFavButton: false,
  showCompareButton: false,
};

const HomePagePositionsList = ({ positions, favorites, favoritesPV, isLoading, bidList, type,
  refreshFavorites, title, showBidListButton, useShortFavButton, showCompareButton }) => (
  <div className={`condensed-card-highlighted ${isLoading ? 'results-loading' : ''}`}>
    <div className="usa-grid-full condensed-card-grid">
      {positions.map((p) => {
        const position = p.position || p;
        return (
          <div key={`${title}-row-${p.id}-${position.isPV}`} className="usa-width-one-third condensed-card">
            <ResultsCondensedCard
              favorites={favorites}
              favoritesPV={favoritesPV}
              position={{ ...p, cpId: p.id }}
              bidList={bidList}
              type={type}
              refreshFavorites={refreshFavorites}
              showBidListButton={showBidListButton}
              useShortFavButton={useShortFavButton}
              showCompareButton={showCompareButton}
              isProjectedVacancy={position.isPV || p.isPV}
            />
          </div>
        );
      })}
    </div>
  </div>
);

HomePagePositionsList.propTypes = propTypes;

HomePagePositionsList.defaultProps = defaultProps;

export default HomePagePositionsList;
