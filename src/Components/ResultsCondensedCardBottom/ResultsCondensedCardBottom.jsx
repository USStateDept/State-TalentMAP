import { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isNull } from 'lodash';
import { Flag } from 'flag';
import { FAVORITE_POSITIONS_ARRAY, POSITION_DETAILS } from 'Constants/PropTypes';
import CondensedCardData from '../CondensedCardData';
import Favorite from '../../Containers/Favorite';
import BidListButton from '../../Containers/BidListButton';
import PermissionsWrapper from '../../Containers/PermissionsWrapper';
import ResultsCondensedCardStats from '../ResultsCondensedCardStats';
import CompareCheck from '../CompareCheck';
import { getBidStatisticsObject } from '../../utilities';

class ResultsCondensedCardBottom extends Component {
  renderStats = () => {
    const { showBidCount, position, isTandem } = this.props;
    const pos = position.position || position;
    const stats = getBidStatisticsObject(position.bid_statistics || pos.bid_statistics);
    return showBidCount ?
      <Flag
        name="flags.bid_count"
        render={() => (<ResultsCondensedCardStats
          bidStatisticsArray={[stats]}
          isTandemTwo={isTandem}
        />)}
      />
      :
      null;
  };

  renderBidListButton = () => {
    const { showBidListButton, position, isTandem } = this.props;
    const availability = get(position, 'availability.availability');
    const availableToBid = isNull(availability) || !!availability;
    return showBidListButton && !isTandem ?
      <PermissionsWrapper permissions="bidder">
        <BidListButton
          id={position.id}
          disabled={!availableToBid}
        />
      </PermissionsWrapper>
      :
      null;
  };

  render() {
    const { position,
      favorites,
      favoritesTandem,
      favoritesPV,
      favoritesPVTandem,
      refreshFavorites,
      useShortFavButton,
      showCompareButton,
      isProjectedVacancy,
      sortType,
      limit,
      page,
      isTandem,
    } = this.props;
    const { isClient } = this.context;
    const pos = position.position || position;
    let $compareArray = [];
    if (position.isPV && isTandem) {
      $compareArray = favoritesPVTandem;
    } else if (position.isPV) {
      $compareArray = favoritesPV;
    } else if (isTandem) {
      $compareArray = favoritesTandem;
    } else {
      $compareArray = favorites;
    }

    return (
      <div className={`condensed-card-bottom-container ${isTandem ? 'condensed-card-bottom-container--tandem-two' : ''}`}>
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
                isTandem={isTandem}
                compareArray={$compareArray}
                useButtonClass={!useShortFavButton}
                useButtonClassSecondary={useShortFavButton}
                refresh={refreshFavorites}
                sortType={sortType}
                limit={limit}
                page={page}
              />
            }
            {this.renderBidListButton()}
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
  position: PropTypes.oneOfType([
    POSITION_DETAILS,
    PropTypes.shape({ position: POSITION_DETAILS }),
  ]).isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY.isRequired,
  favoritesPV: FAVORITE_POSITIONS_ARRAY.isRequired,
  favoritesTandem: FAVORITE_POSITIONS_ARRAY.isRequired,
  favoritesPVTandem: FAVORITE_POSITIONS_ARRAY.isRequired,
  refreshFavorites: PropTypes.bool,
  showBidListButton: PropTypes.bool,
  showBidCount: PropTypes.bool,
  useShortFavButton: PropTypes.bool,
  showCompareButton: PropTypes.bool,
  isProjectedVacancy: PropTypes.bool,
  sortType: PropTypes.string,
  limit: PropTypes.number,
  page: PropTypes.number,
  isTandem: PropTypes.bool,
};

ResultsCondensedCardBottom.defaultProps = {
  type: 'default',
  refreshFavorites: false,
  showBidListButton: false,
  showBidCount: true,
  useShortFavButton: false,
  showCompareButton: false,
  isProjectedVacancy: false,
  sortType: null,
  limit: 15,
  page: 1,
  isTandem: false,
};

export default ResultsCondensedCardBottom;
