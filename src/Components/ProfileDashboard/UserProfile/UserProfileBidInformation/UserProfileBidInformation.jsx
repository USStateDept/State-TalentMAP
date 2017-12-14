import React from 'react';
import PropTypes from 'prop-types';
import InformationDataPoint from '../../InformationDataPoint';

const UserProfileBidInformation = ({ draft, submitted, denominator }) => (
  <div className="usa-grid-full current-user-section-container current-user-bid-information">
    <div className="usa-grid-full section-padded-inner-container">
      <div className="bid-count-container bid-count-container-left">
        <InformationDataPoint
          title="Draft Bids"
          content={`${draft}/${denominator}`}
          className="skill-code-data-point-container bid-count-left"
        />
      </div>
      <div className="bid-count-container bid-count-container-right">
        <InformationDataPoint
          title="Submitted Bids"
          content={`${submitted}/${denominator}`}
          className="skill-code-data-point-container bid-count-right"
        />
      </div>
    </div>
  </div>
);

UserProfileBidInformation.propTypes = {
  draft: PropTypes.number.isRequired,
  submitted: PropTypes.number.isRequired,
  denominator: PropTypes.number,
};

UserProfileBidInformation.defaultProps = {
  denominator: 10,
};


export default UserProfileBidInformation;
