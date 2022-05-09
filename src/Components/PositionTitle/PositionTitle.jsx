import { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { get, isNull } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import BidListButton from 'Containers/BidListButton';
import Favorite from 'Containers/Favorite';
import { BID_LIST, POSITION_DETAILS, USER_PROFILE } from 'Constants/PropTypes';
import { CANNOT_BID_DEFAULT, CANNOT_BID_FILLED_POSITION, CANNOT_BID_SUFFIX, NO_POST } from 'Constants/SystemMessages';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import { getAssetPath, getPostName, propOrDefault } from 'utilities';
import OBCUrl from '../OBCUrl';

const seal = getAssetPath('/assets/img/us-flag.jpg');

class PositionTitle extends Component {
  getIsAvailableToBid = () => {
    const { details } = this.props;
    const status = get(details, 'status', '');
    const availability = get(details, 'availability.availability');
    const availableToBid = (isNull(availability) || !!availability) && (status !== 'FP');
    return availableToBid;
  };

  renderBidListButton = () => {
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
  };

  render() {
    const { details, isProjectedVacancy, userProfile } = this.props;
    const { isClient, isTandemTwo } = this.context;
    const isFilled = details.status === 'FP';
    const OBCUrl$ = propOrDefault(details, 'post.post_overview_url');
    const availablilityText = get(details, 'availability.reason') ?
      `${details.availability.reason}${CANNOT_BID_SUFFIX}` : CANNOT_BID_DEFAULT;
    const availableToBid = this.getIsAvailableToBid();
    let $compareArray = [];
    if (isProjectedVacancy && isTandemTwo) {
      $compareArray = userProfile.favorite_tandem_positions_pv;
    } else if (isProjectedVacancy) {
      $compareArray = userProfile.favorite_positions_pv;
    } else if (isTandemTwo) {
      $compareArray = userProfile.favorite_tandem_positions;
    } else {
      $compareArray = userProfile.favorite_positions;
    }

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
                    {isFilled && <span>Filled Position</span>}
                    <h1>{details.title}</h1>
                  </div>
                  <div className="post-title">
                    Location: {getPostName(details.post, NO_POST)}
                    { !!OBCUrl$ && <span> (<OBCUrl url={OBCUrl$} />)</span> }
                  </div>
                </div>
                <div className="usa-width-one-half title-actions-section">
                  {
                    !isClient && !isFilled &&
                    <Favorite
                      refKey={details.cpId}
                      compareArray={$compareArray}
                      useLongText
                      useSpinnerWhite
                      useButtonClass
                      isPV={isProjectedVacancy}
                      isTandem={isTandemTwo}
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
        <div className="offset-bid-button-container">
          {
            !availableToBid && !isProjectedVacancy &&
            <div className="unavailable-tooltip">
              <Tooltip
                title={isFilled ? CANNOT_BID_FILLED_POSITION : availablilityText}
                arrow
                position="bottom"
                tabIndex="0"
                theme="light"
              >
                <FontAwesome name="question-circle" />
                {'Why can\'t I add this position to my bid list?'}
              </Tooltip>
            </div>
          }
          {
            !isProjectedVacancy && !isTandemTwo && this.renderBidListButton
          }
        </div>
      </div>
    );
  }
}

PositionTitle.contextTypes = {
  isClient: PropTypes.bool,
  isTandemTwo: PropTypes.bool,
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
