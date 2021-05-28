import { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { get } from 'lodash';
import { Tooltip } from 'react-tippy';
import { Link } from 'react-router-dom';
import { checkFlag } from 'flags';
import { BID_OBJECT } from 'Constants/PropTypes';
import BidTrackerCardTitle from '../BidTrackerCardTitle';
// import ConfirmLink from '../../ConfirmLink';
// import GlossaryTermTrigger from '../../GlossaryTermTrigger';
// Note that all glossary logic is commented out for tooltip

const useBiddingTips = () => checkFlag('flags.bidding_tips');


class BidTrackerCardTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
    };
  }

  onDeleteBid = () => {
    const { deleteBid, bid } = this.props;
    deleteBid(get(bid, 'position_info.id'));
  };

  render() {
    const { bid, hideDelete, showBidCount, useCDOView /* , questionText */ } = this.props;
    const { readOnly } = this.context;
    const { position_info } = bid;
    const position = get(bid, 'position_info.position');
    // const showQuestion = !!(questionText && questionText.text);
    const bidStatistics = get(position_info, 'bid_statistics[0]') || {};
    const post = get(position, 'post') || {};
    const positionNumber = get(position, 'position_number');
    const biddingTips = useBiddingTips();

    const getQuestionElement = () => (
      // <span>{questionText.text} </span>
      // eslint-disable-next-line max-len
      // <GlossaryTermTrigger className="tooltip-link" text={questionText.link} term={questionText.term} />
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
            id={position_info.id}
            status={bid.status}
            bidStatistics={bidStatistics}
            post={post}
            showBidCount={showBidCount}
            bidCycle={position_info.bidcycle.name}
          />
        </div>
        <div className="bid-tracker-card-title-outer-container-right">
          <div className="bid-tracker-card-title-container-right">
            {bid.cdo_bid &&
              <div className="bid-tracker-question-text-container bid-tracker-cdo-submitted-container">
                <span>
                  <FontAwesome name="flag" /> Bid Submitted by CDO
                </span>
              </div>
            }
            {biddingTips &&
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
            </div>}
            <div className="bid-tracker-actions-container">
              {bid.can_delete && !hideDelete && (!readOnly || useCDOView) &&
                <button className="unstyled-button" onClick={this.onDeleteBid}>
                  <FontAwesome name="trash" />Remove from Bid List</button>
              }
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
  // questionText: PropTypes.shape({
  //   text: PropTypes.string,
  //   link: PropTypes.string,
  //   term: PropTypes.string,
  // }),
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
