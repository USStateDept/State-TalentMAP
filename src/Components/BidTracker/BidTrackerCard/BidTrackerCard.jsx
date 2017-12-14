import React from 'react';
import PropTypes from 'prop-types';
import BidSteps from '../BidStep';
import BidTrackerCardBottom from '../BidTrackerCardBottom';

const BidTrackerCard = ({ bid }) => (
  <div className="bid-stepper bid-tracker" style={{ minWidth: '775px', marginBottom: '30px', border: '1px solid gray', background: 'white' }}>
    <div className="padded-container-inner">
      <div className="usa-grid-full" style={{ marginBottom: '50px' }}>
        <div className="usa-width-one-half">
            Bid 1 | <a>View Position</a>
        </div>
        <div className="usa-width-one-half">
          <div style={{ float: 'right' }}>
            Actions
          </div>
        </div>
      </div>
      <div className="usa-grid-full" style={{ paddingRight: '10%' }}>
        <BidSteps bid={bid} />
      </div>
    </div>
    <div className="usa-grid-full bid-tracker-card-bottom-container">
      <div className="padded-container-inner">
        <BidTrackerCardBottom />
      </div>
    </div>
  </div>
);

BidTrackerCard.propTypes = {
  bid: PropTypes.shape({}).isRequired,
};

export default BidTrackerCard;
