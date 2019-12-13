import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNull, get } from 'lodash';
import { Flag } from 'flag';
import CondensedCardData from '../CondensedCardData';
import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import Favorite from '../../Containers/Favorite';
import BidListButton from '../../Containers/BidListButton';
import PermissionsWrapper from '../../Containers/PermissionsWrapper';
import ResultsCondensedCardStats from '../ResultsCondensedCardStats';
import CompareCheck from '../CompareCheck';
import { getBidStatisticsObject } from '../../utilities';

class ResultsCondensedCardBottom extends Component {
  constructor(props) {
    super(props);
    this.renderStats = this.renderStats.bind(this);
    this.renderBidListButton = this.renderBidListButton.bind(this);
  }
  renderStats() {
    const { showBidCount, position } = this.props;
    const pos = position.position || position;
    const stats = getBidStatisticsObject(position.bid_statistics || pos.bid_statistics);
    return showBidCount ?
      <Flag
        name="flags.bid_count"
        render={() => <ResultsCondensedCardStats bidStatisticsArray={[stats]} />}
      />
    :
    null;
  }
  renderBidListButton() {
    const { showBidListButton, position } = this.props;
    const availability = get(position, 'availability.availability');
    const availableToBid = isNull(availability) || !!availability;
    return showBidListButton ?
      <PermissionsWrapper permissions="bidder">
        <BidListButton
          id={position.id}
          disabled={!availableToBid}
        />
      </PermissionsWrapper>
    :
    null;
  }
  render() {
    const { position,
        favorites,
        favoritesPV,
        refreshFavorites,
        useShortFavButton,
        showCompareButton,
        isProjectedVacancy,
      } = this.props;
    const { isClient } = this.context;
    const pos = position.position || position;
    return (
      <div className="condensed-card-bottom-container">
        <div className="usa-grid-full condensed-card-bottom">
          <Flag
            name="flags.bid_count"
            render={this.renderStats}
          />
          <CondensedCardData position={position} />
          <div className="usa-grid-full condensed-card-buttons-section">
            {
              !isClient &&
              <Favorite
                useLongText
                hideText={useShortFavButton}
                hasBorder
                refKey={position.id}
                isPV={pos.isPV || position.isPV}
                compareArray={pos.isPV || position.isPV ? favoritesPV : favorites}
                useButtonClass={!useShortFavButton}
                useButtonClassSecondary={useShortFavButton}
                refresh={refreshFavorites}
              />
            }
            <Flag
              name="flags.bidding"
              render={this.renderBidListButton}
            />
            {
              showCompareButton && !isProjectedVacancy &&
              <CompareCheck as="div" refKey={position.cpId} />
            }
          </div>
        </div>
      </div>
    );
  }
}

ResultsCondensedCardBottom.contextTypes = {
  isClient: PropTypes.bool,
};

ResultsCondensedCardBottom.propTypes = {
  position: PropTypes.shape({
    position: POSITION_DETAILS.isRequired,
  }).isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY.isRequired,
  favoritesPV: FAVORITE_POSITIONS_ARRAY.isRequired,
  refreshFavorites: PropTypes.bool,
  showBidListButton: PropTypes.bool,
  showBidCount: PropTypes.bool,
  useShortFavButton: PropTypes.bool,
  showCompareButton: PropTypes.bool,
  isProjectedVacancy: PropTypes.bool,
};

ResultsCondensedCardBottom.defaultProps = {
  type: 'default',
  refreshFavorites: false,
  showBidListButton: false,
  showBidCount: true,
  useShortFavButton: false,
  showCompareButton: false,
  isProjectedVacancy: false,
};

export default ResultsCondensedCardBottom;
