import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import OBCUrl from '../OBCUrl';
import Favorite from '../Favorite/Favorite';
import ViewPostDataButton from '../ViewPostDataButton';
import { POSITION_DETAILS, USER_PROFILE } from '../../Constants/PropTypes';
import { getAssetPath, propOrDefault } from '../../utilities';

const seal = getAssetPath('/assets/img/us-flag.jpg');

const PositionTitle = ({ details, toggleFavorite, userProfile,
  userProfileFavoritePositionIsLoading }) => {
  const obcId = propOrDefault(details, 'post.obc_id');
  return (
    <div className="position-details-header-container">
      <Helmet>
        <title>{details.title}</title>
        <meta property="og:title" content={`${details.title} ${details.position_number}`} />
        <meta property="og:description" content={details.description.content} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <div className="position-details-header">
        <div className="usa-grid positions-details-header-grid">
          <div className="usa-width-one-half">
            <div className="usa-grid-full">
              <div className="usa-width-two-thirds header-title-container">
                <div className="position-details-header-title">
                  <h1>{details.title}</h1>
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
                  useSpinnerWhite
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
        <div className="offset-bid-button-container-button">
          { !!obcId && <ViewPostDataButton id={obcId} /> }
        </div>
      </div>
    </div>
  );
};

PositionTitle.propTypes = {
  details: POSITION_DETAILS,
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
