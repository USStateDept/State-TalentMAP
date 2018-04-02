import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import { NO_DATE } from '../../Constants/SystemMessages';
import { formatDate } from '../../utilities';

const ResultsCondensedCardFooter = ({ position }) => {
  const date = position.effective_date ?
    formatDate(position.effective_date) : NO_DATE;
  return (
    <div className="condensed-card-footer">
      <div className="usa-grid-full condensed-card-footer-container">
        <div className="condensed-card-footer-left">
          <strong>Position Number: </strong>
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
