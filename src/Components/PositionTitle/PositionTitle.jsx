import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import OBCUrl from '../OBCUrl';
import BidListButton from '../BidListButton';
import Favorite from '../Favorite/Favorite';
import BidCount from '../BidCount';
import { POSITION_DETAILS, BID_LIST, USER_PROFILE } from '../../Constants/PropTypes';
import { getAssetPath, propOrDefault, getPostName, getBidStatisticsObject } from '../../utilities';
import { NO_POST } from '../../Constants/SystemMessages';

const seal = getAssetPath('/assets/img/us-flag.jpg');

const PositionTitle = ({ details, toggleBidPosition, bidList, toggleFavorite, userProfile,
  userProfileFavoritePositionIsLoading, bidListToggleIsLoading }) => {
  const obcId = propOrDefault(details, 'post.obc_id');
  const stats = getBidStatisticsObject(details.bid_statistics);
  return (
    <div className="position-details-header-container">
      <Helmet>
        <title>{details.title}</title>
        <meta property="og:title" content={`${details.title} ${details.position_number}`} />
        <meta property="og:description" content={details.description.content} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <div className="position-details-header">
        <div className="usa-grid-full positions-details-header-grid padded-main-content">
          <div className="usa-width-two-thirds">
            <div className="usa-grid-full">
              <div className="usa-width-one-half header-title-container">
                <div className="position-details-header-title">
                  <h1>{details.title}</h1>
                </div>
                <div className="post-title">
                  Post: {getPostName(details.post, NO_POST)}
                  { obcId && <span> (<OBCUrl id={obcId} />)</span> }
                </div>
              </div>
              <div className="usa-width-one-half title-actions-section">
                <Favorite
                  onToggle={toggleFavorite}
                  refKey={details.id}
                  compareArray={userProfile.favorite_positions}
                  isLoading={userProfileFavoritePositionIsLoading}
                  useLongText
                  useSpinnerWhite
                  useButtonClass
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
      <div className="offset-bid-button-container offset-bid-count-container">
        <div className="usa-grid-full position-title-bid-count">
          <BidCount bidStatistics={stats} label="Bid Count" altStyle />
        </div>
      </div>
      <div className="offset-bid-button-container">
        <BidListButton
          toggleBidPosition={toggleBidPosition}
          compareArray={bidList.results}
          id={details.id}
          isLoading={bidListToggleIsLoading}
        />
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
