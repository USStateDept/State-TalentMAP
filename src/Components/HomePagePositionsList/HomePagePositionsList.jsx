import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { POSITION_DETAILS_ARRAY, FAVORITE_POSITIONS_ARRAY, BID_RESULTS, HOME_PAGE_CARD_TYPE } from '../../Constants/PropTypes';

const propTypes = {
  maxLength: PropTypes.number,
  positions: POSITION_DETAILS_ARRAY,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
  type: HOME_PAGE_CARD_TYPE,
  title: PropTypes.string.isRequired, // should be unique per page, since its used a react key
};

const defaultProps = {
  maxLength: 3,
  positions: [],
  favorites: [],
  isLoading: false,
  type: 'default',
};

const HomePagePositionsList = ({ maxLength, positions, toggleFavorite, favorites, isLoading,
    userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored, toggleBid,
    bidList, type, title }) => {
  // create an initial array with x groups of 3
  // because our grid is in thirds
  const numberOfRows = maxLength / 3;
  const rows = Array(numberOfRows).fill(null);

  // Form positions into component and add them to array
  for (let i = 0; i < numberOfRows; i += 1) {
    // load positions into an array of 3
    const positionList = Array(3).fill(null);

    // copy prop list of positions, copy
    // and push postions into a list
    const positionsCopy = positions;
    positionsCopy.slice((i * 3), ((i + 1) * 3)).forEach((p, j) => {
      positionList[j] = (
        <div className="usa-width-one-third condensed-card">
          <ResultsCondensedCard
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
            userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
            position={p}
            toggleBid={toggleBid}
            bidList={bidList}
            type={type}
          />
        </div>
      );
    });

    // load into rows array
    rows.push(
      <div key={`${title}-row-${i}`} className="usa-grid-full">
        {positionList[0]}
        {positionList[1]}
        {positionList[2]}
      </div>,
    );
  }

  return (
    <div className={`usa-grid-full condensed-card-highlighted ${isLoading ? 'results-loading' : ''}`}>
      {rows}
    </div>
  );
};

HomePagePositionsList.propTypes = propTypes;

HomePagePositionsList.defaultProps = defaultProps;

export default HomePagePositionsList;
