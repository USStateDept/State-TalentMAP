import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BID_OBJECT } from '../../Constants/PropTypes';

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
    const { bid } = this.props;
    return (
      <div className="usa-grid-full saved-search-card" key={bid.id}>
        <div className="usa-grid-full">
          <div className="usa-width-one-whole saved-search-card-name">
            Position:&nbsp;
            <Link to={`/details/${bid.position.position_number}`}>
              {bid.position.position_number} - {bid.position.title}
            </Link>
          </div>
        </div>
        {
          // check if the bid has already been submitted
          bid.status === 'submitted' ?
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
    );
  }
}

BidListResultsCard.propTypes = {
  bid: BID_OBJECT.isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
  submitBid: PropTypes.func.isRequired,
};

export default BidListResultsCard;
