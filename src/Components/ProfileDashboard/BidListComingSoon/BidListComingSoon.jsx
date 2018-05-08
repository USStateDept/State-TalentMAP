import React from 'react';
import SectionTitle from '../SectionTitle';

const BidListComingSoon = () => (
  <div className="usa-grid-full">
    <div className="usa-grid-full section-padded-inner-container">
      <div className="usa-width-one-whole">
        <SectionTitle title="Bid List" icon="clipboard" />
      </div>
    </div>
    <div className="bid-list-container">
      <div className="bid-list-content">
        <div className="primary-text">Coming Soon</div>
      </div>
    </div>
  </div>
);

export default BidListComingSoon;
