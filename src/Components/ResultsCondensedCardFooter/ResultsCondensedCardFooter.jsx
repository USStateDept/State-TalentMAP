import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import { NO_UPDATE_DATE } from '../../Constants/SystemMessages';
import { COMMON_PROPERTIES } from '../../Constants/EndpointParams';
import { formatDate } from '../../utilities';

const ResultsCondensedCardFooter = ({ position }) => {
  const date = position[COMMON_PROPERTIES.posted] ?
    formatDate(position[COMMON_PROPERTIES.posted]) : NO_UPDATE_DATE;
  return (
    <div className="condensed-card-footer">
      <div className="usa-grid-full condensed-card-footer-container">
        <div className="condensed-card-footer-left">
          <strong>Position number: </strong>
          {position.position_number}
        </div>
        <div className="condensed-card-footer-right">
          <strong>Posted: </strong>
          {date}
        </div>
      </div>
    </div>
  );
};

ResultsCondensedCardFooter.propTypes = {
  position: POSITION_DETAILS.isRequired,
};

export default ResultsCondensedCardFooter;
