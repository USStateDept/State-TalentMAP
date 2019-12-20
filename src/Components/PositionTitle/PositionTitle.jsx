import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { get, isNull } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import { Flag } from 'flag';
import BidListButton from 'Containers/BidListButton';
import Favorite from 'Containers/Favorite';
import { POSITION_DETAILS, BID_LIST, USER_PROFILE } from 'Constants/PropTypes';
import { CANNOT_BID_DEFAULT, CANNOT_BID_SUFFIX, NO_POST } from 'Constants/SystemMessages';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import { getAssetPath, propOrDefault, getPostName, getBidStatisticsObject } from 'utilities';
import { checkFlag } from 'flags';
import OBCUrl from '../OBCUrl';
import BidCount from '../BidCount';


const seal = getAssetPath('/assets/img/us-flag.jpg');
const useBidding = () => checkFlag('flags.bidding');

class PositionTitle extends Component {
  constructor(props) {
    super(props);
    this.renderBidListButton = this.renderBidListButton.bind(this);
    this.renderBidCount = this.renderBidCount.bind(this);
    this.getIsAvailableToBid = this.getIsAvailableToBid.bind(this);
  }

  getIsAvailableToBid() {
    const { details } = this.props;
    const availability = get(details, 'availability.availability');
    const availableToBid = isNull(availability) || !!availability;
    return availableToBid;
  }

  renderBidListButton() {
    const { details, bidList } = this.props;
    const { isClient } = this.context;
    const available = this.getIsAvailableToBid();
    return (
      <PermissionsWrapper permissions={isClient ? [] : 'bidder'}>
        <BidListButton
          compareArray={bidList.results}
          id={details.cpId}
          disabled={!available}
        />
      </PermissionsWrapper>
    );
  }

  renderBidCount() {
    const { details } = this.props;
    const stats = getBidStatisticsObject(details.bidStatistics);
    return (
      <BidCount bidStatistics={stats} hideLabel altStyle isCondensed />
    );
  }

  render() {
    const { details, isProjectedVacancy, userProfile } = this.props;
    const { isClient } = this.context;
    const OBCUrl$ = propOrDefault(details, 'post.post_overview_url');
    const availablilityText = get(details, 'availability.reason') ?
      `${details.availability.reason}${CANNOT_BID_SUFFIX}` : CANNOT_BID_DEFAULT;
    const availableToBid = this.getIsAvailableToBid();
    return (
      <div className="position-details-header-container">
        <Helmet>
          <title>{details.title}</title>
          <meta property="og:title" content={`${details.title} ${details.position_number}`} />
          <meta property="og:description" content={get(details, 'description.content')} />
          <meta property="og:url" content={window.location.href} />
        </Helmet>
        <div className="position-details-header">
          <div className="usa-grid-full positions-details-header-grid padded-main-content">
            <div className="usa-width-two-thirds">
              <div className="usa-grid-full">
                <div className="usa-width-one-half header-title-container">
                  <div className="position-details-header-title">
                    {isProjectedVacancy && <span>Projected Vacancy</span>}
                    <h1>{details.title}</h1>
                  </div>
                  <div className="post-title">
                    Location: {getPostName(details.post, NO_POST)}
                    { !!OBCUrl$ && <span> (<OBCUrl url={OBCUrl$} />)</span> }
                  </div>
                </div>
                <div className="usa-width-one-half title-actions-section">
                  {
                  !isClient &&
                    <Favorite
                      refKey={details.cpId}
                      compareArray={userProfile[isProjectedVacancy ? 'favorite_positions_pv' : 'favorite_positions']}
                      useLongText
                      useSpinnerWhite
                      useButtonClass
                      isPV={isProjectedVacancy}
                    />
                }
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
        <div className={useBidding() ? 'offset-bid-button-container' : 'offset-bid-button-container-no-button'}>
          {
            !isProjectedVacancy &&
              this.renderBidCount()
          }
          {
            !availableToBid &&
            <Flag
              name="flags.bidding"
              render={() => (
                <div className="unavailable-tooltip">
                  <Tooltip
                    title={availablilityText}
                    arrow
                    position="bottom"
                    tabIndex="0"
                    theme="light"
                  >
                    <FontAwesome name="question-circle" />
                    {'Why can\'t I add this position to my bid list?'}
                  </Tooltip>
                </div>
              )}
            />
          }
          {
            !isProjectedVacancy &&
            <Flag
              name="flags.bidding"
              render={this.renderBidListButton}
            />
          }
        </div>
      </div>
    );
  }
}

PositionTitle.contextTypes = {
  isClient: PropTypes.bool,
};

PositionTitle.propTypes = {
  details: POSITION_DETAILS,
  bidList: BID_LIST.isRequired,
  userProfile: USER_PROFILE,
  isProjectedVacancy: PropTypes.bool,
};

PositionTitle.defaultProps = {
  details: null,
  userProfile: {},
  isProjectedVacancy: false,
};


export default PositionTitle;
