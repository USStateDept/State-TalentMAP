import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { get } from 'lodash';
import { BID_OBJECT } from '../../../Constants/PropTypes';
import BidTrackerCardTitle from '../BidTrackerCardTitle';
import ConfirmLink from '../../ConfirmLink';

class BidTrackerCardTop extends Component {
  constructor(props) {
    super(props);
    this.onDeleteBid = this.onDeleteBid.bind(this);
    this.state = {
      confirm: false,
    };
  }

  onDeleteBid() {
    const { deleteBid, bid } = this.props;
    deleteBid(bid.position.id);
  }

  render() {
    const { bid, showQuestion } = this.props;
    const bidStatistics = get(bid, 'position.bid_statistics[0]', {});
    const post = get(bid, 'position.post', {});
    return (
      <div className="usa-grid-full padded-container-inner bid-tracker-title-container">
        <div className="bid-tracker-title-content-container">
          <BidTrackerCardTitle
            title={bid.position.title}
            id={bid.position.id}
            status={bid.status}
            bidStatistics={bidStatistics}
            post={post}
          />
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
              { bid.can_delete &&
                <ConfirmLink
                  className="remove-bid-link"
                  defaultText="Remove Bid"
                  role="link"
                  onClick={this.onDeleteBid}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BidTrackerCardTop.propTypes = {
  bid: BID_OBJECT.isRequired,
  showQuestion: PropTypes.bool, // Determine whether or not to show the question text
  deleteBid: PropTypes.func.isRequired,
};

BidTrackerCardTop.defaultProps = {
  showQuestion: true,
};

export default BidTrackerCardTop;
