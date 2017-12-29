import React from 'react';
import PropTypes from 'prop-types';
import { BID_OBJECT } from '../../../Constants/PropTypes';
import BidSteps from '../BidStep';
import BidTrackerCardBottom from '../BidTrackerCardBottom';
import BidTrackerCardTop from '../BidTrackerCardTop';
import OverlayAlert from '../OverlayAlert';
import { shouldShowAlert } from '../BidHelpers';

const BidTrackerCard = ({ bid, acceptBid, declineBid }) => {
  const showAlert = shouldShowAlert(bid.status);
  return (
    <div className="bid-tracker">
      <div>
        <BidTrackerCardTop bid={bid} />
        <div className="usa-grid-full padded-container-inner bid-tracker-bid-steps-container">
          <BidSteps bid={bid} />
          {
            showAlert &&
              <OverlayAlert
                id={bid.id}
                type={bid.status}
                userName={bid.user}
                bureau="(AF) Bureau of African Affairs"
                acceptBid={acceptBid}
                declineBid={declineBid}
              />
          }
        </div>
      </div>
      <div className="usa-grid-full bid-tracker-card-bottom-container">
        <div className="padded-container-inner">
          <BidTrackerCardBottom reviewer={bid.reviewer} bureau={bid.position.bureau} />
        </div>
      </div>
    </div>
  );
};

BidTrackerCard.propTypes = {
  bid: BID_OBJECT.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
};

export default BidTrackerCard;
