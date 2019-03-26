import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import CondensedCardData from '../CondensedCardData';
import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import Favorite from '../../Containers/Favorite';
import BidListButton from '../../Containers/BidListButton';
import PermissionsWrapper from '../../Containers/PermissionsWrapper';
import ResultsCondensedCardStats from '../ResultsCondensedCardStats';

const ResultsCondensedCardBottom = (
  { position,
    favorites,
    refreshFavorites,
    showBidListButton,
    showBidCount,
    useShortFavButton,
  }) => (
    <div className="condensed-card-bottom-container">
      <div className="usa-grid-full condensed-card-bottom">
        {showBidCount && <ResultsCondensedCardStats bidStatisticsArray={position.bid_statistics} />}
        <CondensedCardData position={position} />
        <div className="usa-grid-full condensed-card-buttons-section">
          <Favorite
            useLongText
            hideText={useShortFavButton}
            hasBorder
            refKey={position.id}
            compareArray={favorites}
            useButtonClass={!useShortFavButton}
            useButtonClassSecondary={useShortFavButton}
            refresh={refreshFavorites}
          />
          {
            showBidListButton &&
            <PermissionsWrapper permissions="bidder">
              <BidListButton
                id={position.id}
                disabled={!get(position, 'availability.availability', true)}
              />
            </PermissionsWrapper>
          }
        </div>
      </div>
    </div>
  );

ResultsCondensedCardBottom.propTypes = {
  position: POSITION_DETAILS.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY.isRequired,
  refreshFavorites: PropTypes.bool,
  showBidListButton: PropTypes.bool,
  showBidCount: PropTypes.bool,
  useShortFavButton: PropTypes.bool,
};

ResultsCondensedCardBottom.defaultProps = {
  type: 'default',
  refreshFavorites: false,
  showBidListButton: false,
  showBidCount: true,
  useShortFavButton: false,
};

export default ResultsCondensedCardBottom;
