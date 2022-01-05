import { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { BID_OBJECT, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { NO_POST } from '../../Constants/SystemMessages';
import InformationDataPoint from '../ProfileDashboard/InformationDataPoint';
import BidContent from './BidContent';
import BidActions from './BidActions';
import { formatDate, getTimeDistanceInWords } from '../../utilities';

class BidListResultsCard extends Component {
  removeBidPosition = () => {
    const { bid, toggleBidPosition } = this.props;
    toggleBidPosition(bid.position_info.id, true);
  };

  submitBid = () => {
    const { bid, submitBid } = this.props;
    submitBid(bid.id);
  };

  render() {
    const { bid, condensedView } = this.props;
    const position = get(bid, 'position_info.position') || {};
    const createdDate = formatDate(bid.create_date);
    const timeDistanceInWords = getTimeDistanceInWords(bid.update_date);
    const contentTitle = timeDistanceInWords && createdDate ?
      `${timeDistanceInWords} | Added to Bid List: ${createdDate}` : null;
    const bidStatistics = get(bid, 'position_info.bid_statistics[0]') || {};
    return (
      <div className="usa-grid-full saved-search-card" key={bid.id}>
        <div className="usa-grid-full">
          <div className="usa-width-one-whole saved-search-card-name">
            <InformationDataPoint
              titleOnBottom
              content={
                <div>
                  <BidContent
                    id={position.id}
                    positionTitle={position.title}
                    status={bid.status}
                    positionNumber={position.position_number}
                    postName={position.post || NO_POST}
                    bidStatistics={bidStatistics}
                  />
                </div>
              }
              title={contentTitle}
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
