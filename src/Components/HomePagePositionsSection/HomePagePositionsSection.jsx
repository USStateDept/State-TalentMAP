import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';
import HomePagePositionsList from '../HomePagePositionsList';
import Alert from '../Alert';
import Spinner from '../Spinner';
import { POSITION_DETAILS_ARRAY, FAVORITE_POSITIONS_ARRAY, BID_RESULTS, HOME_PAGE_CARD_TYPE } from '../../Constants/PropTypes';

const propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  viewMoreLink: PropTypes.string,
  positions: POSITION_DETAILS_ARRAY,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
  type: HOME_PAGE_CARD_TYPE,
  useSpinner: PropTypes.bool,
  hasErrored: PropTypes.bool,
};

const defaultProps = {
  icon: '', // empty string to not display icon
  viewMoreLink: '',
  positions: undefined,
  favorites: [],
  isLoading: false,
  type: 'default',
  useSpinner: false,
  hasErrored: false,
};

const HomePagePositionsSection = ({ title, icon, viewMoreLink, positions, toggleFavorite,
  favorites, isLoading, hasErrored, bidList, userProfileFavoritePositionIsLoading,
  userProfileFavoritePositionHasErrored, toggleBid, type, useSpinner }) => {
  const listIsReady = !!(positions && Object.keys(positions).length);
  const shouldShowAlert = !hasErrored && positions && !positions.length;
  const shouldShowErrorAlert = hasErrored && !isLoading;
  const shouldDisplaySpinner = useSpinner && isLoading;
  return (
    <div className="usa-grid-full positions-section">
      <PositionsSectionTitle
        title={
          <h2 className="positions-section-title">
            { !!icon.length && <FontAwesome name={icon} /> }
            {title}
          </h2>
        }
        viewMoreLink={viewMoreLink}
      />
      {
        shouldDisplaySpinner && <Spinner size="small" type="homepage-positions-results" />
      }
      {
        listIsReady &&
          <HomePagePositionsList
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
            userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
            positions={positions}
            isLoading={isLoading}
            toggleBid={toggleBid}
            bidList={bidList}
            type={type}
            title={title}
          />
      }
      {
        shouldShowAlert && <Alert title="No results match this criteria" />
      }
      {
        shouldShowErrorAlert && <Alert title="An error occurred loading positions" type="error" />
      }
    </div>
  );
};

HomePagePositionsSection.propTypes = propTypes;

HomePagePositionsSection.defaultProps = defaultProps;

export default HomePagePositionsSection;
