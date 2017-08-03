import React from 'react';
import PropTypes from 'prop-types';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import Share from '../Share/Share';
import Loading from '../Loading/Loading';
import PositionTitle from '../PositionTitle/PositionTitle';
import PositionDetailsItem from '../PositionDetailsItem/PositionDetailsItem';
import PositionAdditionalDetails from '../PositionAdditionalDetails/PositionAdditionalDetails';

const PositionDetails = ({ details, api, isLoading, hasErrored }) => (
  <div>
    {(details && !isLoading && !hasErrored) &&
      <div>
        <PositionTitle details={details} />
        <PositionDetailsItem details={details} />
        <PositionAdditionalDetails />
        <div className="usa-grid">
          <FavoritesButton refKey={details.position_number} type="fav" />
          <Share api={api} identifier={details.id} />
        </div>
      </div>}
    {isLoading && <Loading isLoading={isLoading} hasErrored={hasErrored} />}
  </div>
);

PositionDetails.propTypes = {
  details: POSITION_DETAILS,
  api: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
};

PositionDetails.defaultProps = {
  details: null,
  isLoading: true,
  hasErrored: false,
};

export default PositionDetails;
