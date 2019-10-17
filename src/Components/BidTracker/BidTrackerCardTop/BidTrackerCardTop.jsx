import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { get } from 'lodash';
import { Tooltip } from 'react-tippy';
import { BID_OBJECT } from '../../../Constants/PropTypes';
import BidTrackerCardTitle from '../BidTrackerCardTitle';
import ConfirmLink from '../../ConfirmLink';
import GlossaryTermTrigger from '../../GlossaryTermTrigger';

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
    const { bid, hideDelete, showBidCount, questionText } = this.props;
    const { position } = bid.position;
    const bidStatistics = get(position, 'bid_statistics[0]', {});
    const post = get(position, 'post', {});
    const showQuestion = !!(questionText && questionText.text);
    const positionNumber = get(position, 'position_number', 'Not Available');

    const getQuestionElement = () => (
      <span>
        <span>{questionText.text} </span>
        <GlossaryTermTrigger className="tooltip-link" text={questionText.link} term={questionText.term} />
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
          />
        </div>
        <div className="bid-tracker-card-title-outer-container-right">
          <div className="bid-tracker-card-title-container-right">
            {
              showQuestion &&
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
            }
            <div className="bid-tracker-actions-container">
              { bid.can_delete && !hideDelete &&
                <ConfirmLink
                  className="remove-bid-link"
                  defaultText={<span><FontAwesome name="close" />Remove bid</span>}
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
  questionText: PropTypes.shape({
    text: PropTypes.string,
    link: PropTypes.string,
    term: PropTypes.string,
  }),
  deleteBid: PropTypes.func.isRequired,
  showBidCount: PropTypes.bool,
  hideDelete: PropTypes.bool,
};

BidTrackerCardTop.defaultProps = {
  questionText: {},
  showQuestion: true,
  showBidCount: true,
  hideDelete: false,
};

export default BidTrackerCardTop;
