import React from 'react';
import { BID_OBJECT } from '../../../Constants/PropTypes';
import BidSteps from '../BidStep';
import BidTrackerCardBottom from '../BidTrackerCardBottom';
import BidTrackerCardTitle from '../BidTrackerCardTitle';
import ActionsLink from '../ActionsLink';

const BidTrackerCard = ({ bid }) => (
  <div className="bid-tracker-container">
    <div className="bid-tracker">
      <div className="padded-container-inner">
        <div className="usa-grid-full bid-tracker-title-container">
          <div className="usa-width-one-half">
            <BidTrackerCardTitle title={`[${bid.position.position_number}] ${bid.position.title}`} id={bid.position.position_number} />
          </div>
          <div className="usa-width-one-half">
            <div className="bid-tracker-card-action-container">
              <ActionsLink />
            </div>
          </div>
        </div>
        <div className="usa-grid-full bid-tracker-bid-steps-container">
          <BidSteps bid={bid} />
        </div>
      </div>
      <div className="usa-grid-full bid-tracker-card-bottom-container">
        <div className="padded-container-inner">
          <BidTrackerCardBottom />
        </div>
      </div>
    </div>
    {/* <div className="bid-tracker-overlay-alert">
      TODO - Add overlay alerts here
    </div> */}
  </div>
);

BidTrackerCard.propTypes = {
  bid: BID_OBJECT.isRequired,
};

export default BidTrackerCard;
