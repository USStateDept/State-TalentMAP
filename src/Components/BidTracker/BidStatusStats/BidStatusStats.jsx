import PropTypes from 'prop-types';
import { DRAFT_PROP, BID_TRACKER_SUBMITTED_ACTIVE_STATUSES } from 'Constants/BidData';
import { BID_RESULTS } from 'Constants/PropTypes';
import { getBidListStats } from 'utilities';

const BidStatusStats = ({ bidList, condensed }) => {
  const draftBids = getBidListStats(bidList, DRAFT_PROP, true);
  const submittedActiveBids = getBidListStats(
    bidList, BID_TRACKER_SUBMITTED_ACTIVE_STATUSES, true);
  return (
    <div className={`usa-grid-full bid-status-stats${condensed ? '--condensed' : ''}`}>
        Bids drafted: <div className="bid-stat">({draftBids})</div>
        Bids submitted and active: <div className="bid-stat">({submittedActiveBids})</div>
    </div>
  );
};

BidStatusStats.propTypes = {
  bidList: BID_RESULTS.isRequired,
  condensed: PropTypes.bool,
};

BidStatusStats.defaultProps = {
  bidList: [],
  condensed: false,
};

export default BidStatusStats;
