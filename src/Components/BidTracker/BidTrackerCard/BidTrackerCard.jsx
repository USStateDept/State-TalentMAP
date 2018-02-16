import React from 'react';
import PropTypes from 'prop-types';
import { BID_OBJECT, USER_PROFILE } from '../../../Constants/PropTypes';
import BidSteps from '../BidStep';
import BidTrackerCardBottom from '../BidTrackerCardBottom';
import BidTrackerCardTop from '../BidTrackerCardTop';
import OverlayAlert from '../OverlayAlert';
import { shouldShowAlert } from '../BidHelpers';
import {
  APPROVED_PROP,
  HAND_SHAKE_ACCEPTED_PROP,
  PRE_PANEL_PROP,
  IN_PANEL_PROP,
  DRAFT_PROP,
} from '../../../Constants/BidData';

const BidTrackerCard = ({ bid, acceptBid, declineBid, submitBid, deleteBid, userProfile }) => {
  // determine whether we render an alert on top of the card
  const showAlert = shouldShowAlert(bid);
  // determine whether we should show the contacts section based on the status
  const showContacts = [APPROVED_PROP, HAND_SHAKE_ACCEPTED_PROP, PRE_PANEL_PROP, IN_PANEL_PROP]
                        .includes(bid.status);
  // add class to container for draft since we need to apply an overflow:hidden for drafts only
  const draftClass = bid.status === DRAFT_PROP ? 'bid-tracker-bid-steps-container--draft' : '';
  return (
    <div className="bid-tracker">
      <div>
        <BidTrackerCardTop bid={bid} />
        <div className={`usa-grid-full padded-container-inner bid-tracker-bid-steps-container ${draftClass}`}>
          <BidSteps bid={bid} />
          {
            showAlert &&
              <OverlayAlert
                bid={bid}
                acceptBid={acceptBid}
                declineBid={declineBid}
                submitBid={submitBid}
                deleteBid={deleteBid}
              />
          }
        </div>
      </div>
      {
        showContacts &&
          <div className="usa-grid-full bid-tracker-card-bottom-container">
            <div className="padded-container-inner">
              <BidTrackerCardBottom
                reviewer={bid.reviewer}
                bureau={bid.position.bureau}
                userProfile={userProfile}
              />
            </div>
          </div>
      }
    </div>
  );
};

BidTrackerCard.propTypes = {
  bid: BID_OBJECT.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
  submitBid: PropTypes.func.isRequired,
  deleteBid: PropTypes.func.isRequired,
  userProfile: USER_PROFILE.isRequired,
};

export default BidTrackerCard;
