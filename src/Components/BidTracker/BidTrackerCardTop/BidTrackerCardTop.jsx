import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { get } from 'lodash';
import { Tooltip } from 'react-tippy';
import { Link } from 'react-router-dom';
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
    const { bid, hideDelete, showBidCount, useCDOView } = this.props;
    const { readOnly } = this.context;
    const { position } = bid;
    const bidStatistics = get(bid, 'bid_statistics[0]', {});
    const post = get(position, 'post', {});
    const positionNumber = get(position, 'position_number');

    const getQuestionElement = () => (
      <span>
        Your bid is likely in one of several steps in the process. <Link className="tooltip-link" to="/biddingProcess">Learn more here.</Link>
      </span>
    );
    return (
      <div className="usa-grid-full padded-container-inner bid-tracker-title-container">
        <div className="bid-tracker-title-content-container">
          <BidTrackerCardTitle
            title={position.title}
            positionNumber={positionNumber}
            id={bid.position.id}
            status={bid.status}
            bidStatistics={bidStatistics}
            post={post}
            showBidCount={showBidCount}
            bidCycle={bid.bidcycle}
          />
        </div>
        <div className="bid-tracker-card-title-outer-container-right">
          <div className="bid-tracker-card-title-container-right">
            <div className="bid-tracker-question-text-container">
              <Tooltip
                html={getQuestionElement()}
                arrow
                tabIndex="0"
                interactive
                interactiveBorder={5}
                useContext
              >
                <span>
                  <FontAwesome name="question-circle" /> Why is it taking so long?
                </span>
              </Tooltip>
            </div>
            <div className="bid-tracker-actions-container">
              { bid.can_delete && !hideDelete && (!readOnly || useCDOView) &&
                <ConfirmLink
                  className="remove-bid-link"
                  defaultText={<span><FontAwesome name="close" />Remove bid</span>}
                  role="link"
                  onClick={this.onDeleteBid}
                /> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BidTrackerCardTop.contextTypes = {
  readOnly: PropTypes.bool,
};

BidTrackerCardTop.propTypes = {
  bid: BID_OBJECT.isRequired,
  deleteBid: PropTypes.func.isRequired,
  showBidCount: PropTypes.bool,
  hideDelete: PropTypes.bool,
  useCDOView: PropTypes.bool,
};

BidTrackerCardTop.defaultProps = {
  questionText: {},
  showQuestion: true,
  showBidCount: true,
  hideDelete: false,
  useCDOView: false,
};

export default BidTrackerCardTop;
