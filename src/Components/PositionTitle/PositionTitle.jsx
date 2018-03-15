import React from 'react';
import PropTypes from 'prop-types';
import BidListButton from '../BidListButton';
import BidCount from '../BidCount';
import OBCUrl from '../OBCUrl';
import Favorite from '../Favorite/Favorite';
import { POSITION_DETAILS, BID_LIST, USER_PROFILE } from '../../Constants/PropTypes';
import { getAssetPath, propOrDefault, getBidStatisticsObject } from '../../utilities';

const seal = getAssetPath('/assets/img/us-flag.jpg');

const PositionTitle = ({ details, toggleBidPosition, bidList, toggleFavorite, userProfile,
  userProfileFavoritePositionIsLoading, bidListToggleIsLoading }) => {
  const bidStatistics = getBidStatisticsObject(details.bid_statistics);

  const shouldShowBidStats = !!details.bid_statistics && !!bidStatistics;

  const obcId = propOrDefault(details, 'post.obc_id');

  return (
    <div className="position-details-header-container">
      <div className="position-details-header">
        <div className="usa-grid positions-details-header-grid">
          <div className="usa-width-one-half">
            <div className="usa-grid-full">
              <div className="usa-width-two-thirds header-title-container">
                <div className="position-details-header-title">
                  <strong>{details.title}</strong>
                </div>
                <div>
                  Post: {details.post.location} { obcId && <span>(<OBCUrl id={obcId} />)</span> }
                </div>
              </div>
              <div className="usa-width-one-third title-actions-section">
                <Favorite
                  onToggle={toggleFavorite}
                  refKey={details.id}
                  compareArray={userProfile.favorite_positions}
                  isLoading={userProfileFavoritePositionIsLoading}
                  useLongText
                />
              </div>
            </div>
          </div>
        </div>
        <img
          className="position-details-header-image"
          alt="United States flag background"
          src={seal}
        />
      </div>
      <div className="offset-bid-button-container">
        <div className="offset-bid-button-container-count">
          {
            shouldShowBidStats &&
              <BidCount
                bidStatistics={bidStatistics}
              />
          }
        </div>
        <div className="offset-bid-button-container-button">
          <BidListButton
            toggleBidPosition={toggleBidPosition}
            compareArray={bidList.results}
            id={details.id}
            isLoading={bidListToggleIsLoading}
          />
        </div>
      </div>
    </div>
  );
};

PositionTitle.propTypes = {
  details: POSITION_DETAILS,
  toggleBidPosition: PropTypes.func.isRequired,
  bidList: BID_LIST.isRequired,
  bidListToggleIsLoading: PropTypes.bool,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool,
  userProfile: USER_PROFILE,
};

PositionTitle.defaultProps = {
  details: null,
  bidListToggleIsLoading: false,
  userProfileFavoritePositionIsLoading: false,
  userProfile: {},
};

export default PositionTitle;
