import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { POSITION_DETAILS_ARRAY, FAVORITE_POSITIONS_ARRAY, BID_RESULTS, HOME_PAGE_CARD_TYPE } from '../../Constants/PropTypes';

const propTypes = {
  positions: POSITION_DETAILS_ARRAY,
  favorites: FAVORITE_POSITIONS_ARRAY,
  isLoading: PropTypes.bool,
  bidList: BID_RESULTS.isRequired,
  type: HOME_PAGE_CARD_TYPE,
  refreshFavorites: PropTypes.bool,
  title: PropTypes.string.isRequired, // should be unique per page, since its used a react key
  itemsPerRow: PropTypes.number,
};

const defaultProps = {
  positions: [],
  favorites: [],
  isLoading: false,
  type: 'default',
  refreshFavorites: false,
  itemsPerRow: 3,
};

const widthClass = {
  3: 'usa-width-one-third',
  4: 'usa-width-one-fourth',
};

const HomePagePositionsList = ({ positions, favorites, isLoading,
    bidList, type, refreshFavorites, title, itemsPerRow }) => (
      <div className={`condensed-card-highlighted ${isLoading ? 'results-loading' : ''}`}>
        <div className="usa-grid-full condensed-card-grid">
          {positions.map(p => (
            <div key={`${title}-row-${p.id}`} className={`${widthClass[itemsPerRow]} condensed-card`}>
              <ResultsCondensedCard
                favorites={favorites}
                position={p}
                bidList={bidList}
                type={type}
                refreshFavorites={refreshFavorites}
              />
            </div>
          ))}
        </div>
      </div>
);

HomePagePositionsList.propTypes = propTypes;

HomePagePositionsList.defaultProps = defaultProps;

export default HomePagePositionsList;
