import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BID_OBJECT, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { SUBMITTED } from '../../Constants/BidStatuses';
import { NO_POST } from '../../Constants/SystemMessages';
import InformationDataPoint from '../ProfileDashboard/InformationDataPoint';
import BidContent from './BidContent';

class BidListResultsCard extends Component {
  constructor(props) {
    super(props);
    this.removeBidPosition = this.removeBidPosition.bind(this);
    this.submitBid = this.submitBid.bind(this);
  }
  removeBidPosition() {
    const { bid, toggleBidPosition } = this.props;
    toggleBidPosition(bid.position.id, true);
  }
  submitBid() {
    const { bid, submitBid } = this.props;
    submitBid(bid.id);
  }
  render() {
    const { bid, condensedView } = this.props;
    return (
      <div className="usa-grid-full saved-search-card" key={bid.id}>
        <div className="usa-grid-full">
          <div className="usa-width-one-whole saved-search-card-name">
            <InformationDataPoint
              titleOnBottom
              content={
                <BidContent
                  status={bid.status}
                  positionNumber={bid.position.position_number}
                  postName={bid.post || NO_POST}
                />
              }
              title={`Updated on ${bid.update_date}`}
            />
          </div>
        </div>
        {
          // this section we'll only show if condensedView is false
          !condensedView &&
            <div>
              {
                // check if the bid has already been submitted
                bid.status === SUBMITTED.property ?
                  // if so, let the user know when they submitted this bid
                  <div className="usa-width-one-whole">
                    You submitted this bid on {bid.submission_date}
                  </div> :
                  // else, display action buttons
                  <div className="usa-width-one-whole">
                    <button
                      onClick={this.submitBid}
                      title="Submit this bid"
                    >
                      Submit Bid
                    </button>
                    <button
                      className="usa-button-secondary"
                      onClick={this.removeBidPosition}
                      title="Delete this position from your bid list"
                    >
                      Delete
                    </button>
                  </div>
              }
            </div>
        }
      </div>
    );
  }
}

BidListResultsCard.propTypes = {
  bid: BID_OBJECT.isRequired,
  toggleBidPosition: PropTypes.func,
  submitBid: PropTypes.func,
  condensedView: PropTypes.bool,
};

BidListResultsCard.defaultProps = {
  condensedView: false,
  toggleBidPosition: EMPTY_FUNCTION,
  submitBid: EMPTY_FUNCTION,
};

export default BidListResultsCard;
