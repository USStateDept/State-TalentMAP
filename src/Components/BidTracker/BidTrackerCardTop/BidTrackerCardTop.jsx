import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { BID_OBJECT } from '../../../Constants/PropTypes';
import BidTrackerCardTitle from '../BidTrackerCardTitle';
import ActionsDropdown from '../ActionsDropdown';
import { getActionPermissions } from '../BidHelpers';

const BidTrackerCardTop = ({ bid, showQuestion }) => {
  const actionPermissions = getActionPermissions(bid.status) || {};
  return (
    <div className="usa-grid-full padded-container-inner bid-tracker-title-container">
      <div className="bid-tracker-title-content-container">
        <BidTrackerCardTitle title={bid.position.title} id={bid.position.position_number} />
      </div>
      <div>
        <div className="bid-tracker-card-title-container-right">
          {
            showQuestion &&
              <div className="bid-tracker-question-text-container">
                <FontAwesome name="question-circle" /> Why is it taking so long?
              </div>
          }
          <div className="bid-tracker-actions-container">
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
    </div>
  );
};

BidTrackerCardTop.propTypes = {
  bid: BID_OBJECT.isRequired,
  showQuestion: PropTypes.bool, // Determine whether or not to show the question text
};

BidTrackerCardTop.defaultProps = {
  showQuestion: true,
};

export default BidTrackerCardTop;
