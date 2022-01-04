import PropTypes from 'prop-types';
import { BID_TRACKER_SUBMITTED_ACTIVE_STATUSES, DRAFT_PROP } from 'Constants/BidData';
import { BID_RESULTS } from 'Constants/PropTypes';
import { getBidListStats } from 'utilities';

const BidStatusStats = ({ bidList, condensed, showTotal }) => {
  const draftBids = getBidListStats(bidList, DRAFT_PROP, true);
  const submittedActiveBids = getBidListStats(
    bidList, BID_TRACKER_SUBMITTED_ACTIVE_STATUSES, true);
  const totalBids = bidList.length;
  return (
    <div className={`usa-grid-full bid-status-stats${condensed ? '--condensed' : ''}`}>
        Bids drafted: <div className="bid-stat">({draftBids})</div>
        Submitted Bids: <div className="bid-stat">({submittedActiveBids})</div>
      { showTotal && <>Total Bids: <div className="bid-stat">({totalBids})</div></> }
    </div>
  );
};

BidStatusStats.propTypes = {
  bidList: BID_RESULTS.isRequired,
  condensed: PropTypes.bool,
  showTotal: PropTypes.bool,
};

BidStatusStats.defaultProps = {
  bidList: [],
  condensed: false,
  showTotal: false,
};

export default BidStatusStats;
