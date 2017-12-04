import React from 'react';
import InformationDataPoint from '../../InformationDataPoint';

const CurrentUserBidInformation = () => (
  <div className="usa-grid-full current-user-section-container current-user-bid-information">
    <div className="usa-grid-full section-padded-inner-container">
      <div className="bid-count-container bid-count-container-left">
        <InformationDataPoint
          title="Draft Bids"
          content="4/10"
          className="skill-code-data-point-container bid-count-left"
        />
      </div>
      <div className="bid-count-container bid-count-container-right">
        <InformationDataPoint
          title="Submitted Bids"
          content="2/10"
          className="skill-code-data-point-container bid-count-right"
        />
      </div>
    </div>
  </div>
);

export default CurrentUserBidInformation;
