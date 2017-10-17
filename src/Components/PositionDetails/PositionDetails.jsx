import React from 'react';
import PropTypes from 'prop-types';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import { BID_LIST, GO_BACK_TO_LINK, POSITION_DETAILS, USER_PROFILE } from '../../Constants/PropTypes';
import * as SystemMessages from '../../Constants/SystemMessages';
import Share from '../Share/Share';
import Loading from '../Loading/Loading';
import PositionTitle from '../PositionTitle/PositionTitle';
import PositionDetailsItem from '../PositionDetailsItem/PositionDetailsItem';
import PositionAdditionalDetails from '../PositionAdditionalDetails/PositionAdditionalDetails';

const PositionDetails = ({ details, isLoading, hasErrored, goBackLink,
    userProfile, toggleFavorite, userProfileFavoritePositionIsLoading,
    toggleBidPosition, bidList, bidListToggleIsLoading }) => {
  const isReady = details && !isLoading && !hasErrored;
  return (
    <div>
      { isReady &&
      <div>
        <PositionTitle
          details={details}
          goBackLink={goBackLink}
          toggleBidPosition={toggleBidPosition}
          bidList={bidList}
          bidListToggleIsLoading={bidListToggleIsLoading}
        />
        <PositionDetailsItem details={details} />
        <PositionAdditionalDetails
          content={
            details.description && details.description.content ?
            details.description.content :
            SystemMessages.NO_POSITION_DESCRIPTION
          }
        />
        <div className="usa-grid">
          {
            !!userProfile.favorite_positions &&
            <FavoritesButton
              onToggle={toggleFavorite}
              refKey={details.id}
              isLoading={userProfileFavoritePositionIsLoading}
              compareArray={userProfile.favorite_positions}
            />
          }
          <Share identifier={details.id} />
        </div>
      </div>}
      {isLoading && <Loading isLoading={isLoading} hasErrored={hasErrored} />}
    </div>
  );
};

PositionDetails.propTypes = {
  details: POSITION_DETAILS,
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  goBackLink: GO_BACK_TO_LINK.isRequired,
  userProfile: USER_PROFILE,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
  bidList: BID_LIST.isRequired,
  bidListToggleIsLoading: PropTypes.bool,
};

PositionDetails.defaultProps = {
  details: null,
  isLoading: true,
  hasErrored: false,
  userProfile: {},
  bidListToggleIsLoading: false,
};

export default PositionDetails;
