import React from 'react';
import { BID_OBJECT } from '../../../Constants/PropTypes';
import BidTrackerCardTitle from '../BidTrackerCardTitle';
import ActionsDropdown from '../ActionsDropdown';
import { getActionPermissions } from '../BidHelpers';

const BidTrackerCardTop = ({ bid }) => {
  const actionPermissions = getActionPermissions(bid.status) || {};
  return (
    <div className="usa-grid-full padded-container-inner bid-tracker-title-container">
      <div className="bid-tracker-title-content-container">
        <BidTrackerCardTitle title={`[${bid.position.position_number}] ${bid.position.title}`} id={bid.position.position_number} />
      </div>
      <div>
        <div className="bid-tracker-card-action-container">
          <ActionsDropdown
            showDelete={actionPermissions.showDelete}
            disableDelete={actionPermissions.disableDelete}
            showWithdraw={actionPermissions.showWithdraw}
            disableWithdraw={actionPermissions.disableWithdraw}
            positionId={bid.position.id}
          />
        </div>
      </div>
    </div>
  );
};

BidTrackerCardTop.propTypes = {
  bid: BID_OBJECT.isRequired,
};

export default BidTrackerCardTop;
