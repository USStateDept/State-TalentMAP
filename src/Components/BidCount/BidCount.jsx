import React from 'react';
import PropTypes from 'prop-types';
import BidCountNumber from './BidCountNumber';
import { BID_STATISTICS_OBJECT } from '../../Constants/PropTypes';

const BidCount = ({ bidStatistics, hideLabel }) => {
  let labelClass = 'bid-count-label';
  if (hideLabel) { labelClass = `${labelClass} usa-sr-only`; }
  return (
    <div>
      <div className={labelClass} id="bid-counts">Bid Count:</div>
      {/* set an aria-labelledby so that screen readers understand the purpose of the list */}
      <ul className="bid-count-list" aria-labelledby="bid-counts">
        <BidCountNumber type="totalBids" number={bidStatistics.total_bids || 0} />
        <BidCountNumber type="inGradeBids" number={bidStatistics.in_grade || 0} />
        <BidCountNumber type="atSkillBids" number={bidStatistics.at_skill || 0} />
        <BidCountNumber type="inGradeAtSkillBids" number={bidStatistics.in_grade_at_skill || 0} />
      </ul>
    </div>
  );
};

BidCount.propTypes = {
  bidStatistics: BID_STATISTICS_OBJECT,
  hideLabel: PropTypes.bool,
};

BidCount.defaultProps = {
  bidStatistics: {},
  hideLabel: false,
};

export default BidCount;
