import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { get } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import OBCUrl from '../OBCUrl';
import BidListButton from '../../Containers/BidListButton';
import Favorite from '../../Containers/Favorite';
import { POSITION_DETAILS, BID_LIST, USER_PROFILE } from '../../Constants/PropTypes';
import { getAssetPath, propOrDefault, getPostName } from '../../utilities';
import { CANNOT_BID_DEFAULT, CANNOT_BID_SUFFIX, NO_POST } from '../../Constants/SystemMessages';
import PermissionsWrapper from '../../Containers/PermissionsWrapper';

const seal = getAssetPath('/assets/img/us-flag.jpg');

const PositionTitle = ({ details, bidList, userProfile, bidListToggleIsLoading }) => {
  const obcId = propOrDefault(details, 'post.obc_id');
  const availablilityText = get(details, 'availability.reason') ?
    `${details.availability.reason}${CANNOT_BID_SUFFIX}` : CANNOT_BID_DEFAULT;
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
                  <h1>{details.title}</h1>
                </div>
                <div className="post-title">
                  Post: {getPostName(details.post, NO_POST)}
                  { obcId && <span> (<OBCUrl id={obcId} />)</span> }
                </div>
              </div>
              <div className="usa-width-one-half title-actions-section">
                <Favorite
                  refKey={details.id}
                  compareArray={userProfile.favorite_positions}
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
      <div className="offset-bid-button-container">
        {
          !get(details, 'availability.availability', true) &&
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
        }
        <PermissionsWrapper permissions="bidder">
          <BidListButton
            compareArray={bidList.results}
            id={details.id}
            isLoading={bidListToggleIsLoading}
            disabled={!get(details, 'availability.availability', true)}
          />
        </PermissionsWrapper>
      </div>
    </div>
  );
};

PositionTitle.propTypes = {
  details: POSITION_DETAILS,
  bidList: BID_LIST.isRequired,
  bidListToggleIsLoading: PropTypes.bool,
  userProfile: USER_PROFILE,
};

PositionTitle.defaultProps = {
  details: null,
  bidListToggleIsLoading: false,
  userProfile: {},
};


export default PositionTitle;
