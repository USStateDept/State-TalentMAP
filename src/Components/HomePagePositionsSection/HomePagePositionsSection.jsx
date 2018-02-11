import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';
import HomePagePositionsList from '../HomePagePositionsList';
import { POSITION_DETAILS_ARRAY, FAVORITE_POSITIONS_ARRAY, BID_RESULTS } from '../../Constants/PropTypes';

const propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  viewMoreLink: PropTypes.string,
  positions: POSITION_DETAILS_ARRAY.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

const defaultProps = {
  icon: 'star',
  viewMoreLink: '/results',
  favorites: [],
  isLoading: false,
};

const HomePagePositionsSection = ({ title, icon, viewMoreLink, positions, toggleFavorite,
  favorites, isLoading, bidList, userProfileFavoritePositionIsLoading,
  userProfileFavoritePositionHasErrored, toggleBid }) => (
    <div className="usa-grid-full positions-section">
      <PositionsSectionTitle
        title={
          <span className="positions-section-title">
            <FontAwesome name={icon} />
            {title}
          </span>
        }
        viewMoreLink={viewMoreLink}
      />
      <HomePagePositionsList
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        positions={positions}
        isLoading={isLoading}
        toggleBid={toggleBid}
        bidList={bidList}
      />
    </div>
);

HomePagePositionsSection.propTypes = propTypes;

HomePagePositionsSection.defaultProps = defaultProps;

export default HomePagePositionsSection;
