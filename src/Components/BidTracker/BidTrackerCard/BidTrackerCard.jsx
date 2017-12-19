import React from 'react';
import { BID_OBJECT } from '../../../Constants/PropTypes';
import BidSteps from '../BidStep';
import BidTrackerCardBottom from '../BidTrackerCardBottom';
import BidTrackerCardTitle from '../BidTrackerCardTitle';
import ActionsLink from '../ActionsLink';
import OverlayAlert from '../OverlayAlert';
import { shouldShowAlert } from '../BidHelpers';

const BidTrackerCard = ({ bid }) => {
  const showAlert = shouldShowAlert(bid.status);
  return (
    <div className="bid-tracker-container">
      <div className="bid-tracker">
        <div>
          <div className="usa-grid-full padded-container-inner bid-tracker-title-container">
            <div className="usa-width-one-half">
              <BidTrackerCardTitle title={`[${bid.position.position_number}] ${bid.position.title}`} id={bid.position.position_number} />
            </div>
            <div className="usa-width-one-half">
              <div className="bid-tracker-card-action-container">
                <ActionsLink />
              </div>
            </div>
          </div>
          <div className="usa-grid-full padded-container-inner bid-tracker-bid-steps-container">
            <BidSteps bid={bid} />
            {
              showAlert &&
                <OverlayAlert
                  type={bid.status}
                  userName={bid.user}
                  bureau="(AF) Bureau of African Affairs"
                />
            }
          </div>
        </div>
        <div className="usa-grid-full bid-tracker-card-bottom-container">
          <div className="padded-container-inner">
            <BidTrackerCardBottom />
          </div>
        </div>
      </div>
    </div>
  );
};

BidTrackerCard.propTypes = {
  bid: BID_OBJECT.isRequired,
};

export default BidTrackerCard;
