import React from 'react';
import { BID_STATISTICS_ARRAY } from '../../Constants/PropTypes';
import BidCount from '../BidCount';
import { getBidStatisticsObject } from '../../utilities';

const ResultsCondensedCardStats = ({ bidStatisticsArray }) => {
  const bidStatistics = getBidStatisticsObject(bidStatisticsArray);
  return (
    <div className="condensed-card-footer condensed-card-statistics">
      <div className="usa-grid-full condensed-card-footer-container">
        <BidCount bidStatistics={bidStatistics} />
      </div>
    </div>
  );
};

ResultsCondensedCardStats.propTypes = {
  bidStatisticsArray: BID_STATISTICS_ARRAY,
};

ResultsCondensedCardStats.defaultProps = {
  bidStatisticsArray: [],
};

export default ResultsCondensedCardStats;
