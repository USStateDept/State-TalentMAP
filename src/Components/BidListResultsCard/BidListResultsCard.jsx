import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BID_OBJECT, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { NO_POST } from '../../Constants/SystemMessages';
import InformationDataPoint from '../ProfileDashboard/InformationDataPoint';
import BidContent from './BidContent';
import BidActions from './BidActions';
import { formatDate } from '../../utilities';

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
    const updatedDate = formatDate(bid.update_date);
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
              title={updatedDate ? `Updated on ${updatedDate}` : null}
            />
          </div>
        </div>
        {
          // this section we'll only show if condensedView is false
          !condensedView &&
            <BidActions
              status={bid.status}
              onSubmitBid={this.submitBid}
              onRemoveBid={this.removeBidPosition}
            />
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
