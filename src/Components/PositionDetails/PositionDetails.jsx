import React from 'react';
import PropTypes from 'prop-types';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import * as PROP_TYPES from '../../Constants/PropTypes';
import Share from '../Share/Share';
import Loading from '../Loading/Loading';
import PositionTitle from '../PositionTitle/PositionTitle';
import PositionDetailsItem from '../PositionDetailsItem/PositionDetailsItem';
import PositionAdditionalDetails from '../PositionAdditionalDetails/PositionAdditionalDetails';

const PositionDetails = ({ details, isLoading, hasErrored, goBackLink,
    userProfile, toggleFavorite, userProfileFavoritePositionIsLoading,
    toggleBidPosition, bidList, bidListToggleIsLoading, editDescriptionContent,
    editPocContent, editWebsiteContent,
    descriptionEditHasErrored, descriptionEditIsLoading, descriptionEditSuccess,
    resetDescriptionEditMessages }) => {
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
          editDescriptionContent={editDescriptionContent}
          editPocContent={editPocContent}
          editWebsiteContent={editWebsiteContent}
          resetDescriptionEditMessages={resetDescriptionEditMessages}
        />
        <PositionDetailsItem details={details} />
        <PositionAdditionalDetails
          content={
            details.description && details.description.content ?
            details.description.content :
            ''
          }
          editDescriptionContent={editDescriptionContent}
          descriptionEditHasErrored={descriptionEditHasErrored}
          descriptionEditIsLoading={descriptionEditIsLoading}
          descriptionEditSuccess={descriptionEditSuccess}
          resetDescriptionEditMessages={resetDescriptionEditMessages}
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
  details: PROP_TYPES.POSITION_DETAILS,
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  goBackLink: PROP_TYPES.GO_BACK_TO_LINK.isRequired,
  userProfile: PROP_TYPES.USER_PROFILE,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
  bidList: PROP_TYPES.BID_LIST.isRequired,
  bidListToggleIsLoading: PropTypes.bool,
  editDescriptionContent: PropTypes.func,
  descriptionEditHasErrored: PropTypes.bool,
  descriptionEditIsLoading: PropTypes.bool,
  descriptionEditSuccess: PropTypes.bool,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
  editPocContent: PropTypes.func.isRequired,
  editWebsiteContent: PropTypes.func.isRequired,
};

PositionDetails.defaultProps = {
  details: null,
  isLoading: true,
  hasErrored: false,
  userProfile: {},
  bidListToggleIsLoading: false,
  editDescriptionContent: PROP_TYPES.EMPTY_FUNCTION,
  descriptionEditHasErrored: false,
  descriptionEditIsLoading: false,
  descriptionEditSuccess: false,
};

export default PositionDetails;
