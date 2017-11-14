import React from 'react';
import PropTypes from 'prop-types';
import { DRAFT } from '../../../Constants/BidStatuses';

const BidActions = ({ status, onSubmitBid, onRemoveBid }) => (
  <div>
    {
      // check if the bid has NOT been submitted
      status === DRAFT.property ?
        // if so, display action buttons
        <div className="usa-width-one-whole">
          <button
            onClick={onSubmitBid}
            title="Submit this bid"
          >
            Submit Bid
          </button>
          <button
            className="usa-button-secondary"
            onClick={onRemoveBid}
            title="Delete this position from your bid list"
          >
            Delete
          </button>
        </div> :
        null
    }
  </div>
);

BidActions.propTypes = {
  status: PropTypes.string.isRequired,
  onSubmitBid: PropTypes.func.isRequired,
  onRemoveBid: PropTypes.func.isRequired,
};

export default BidActions;
