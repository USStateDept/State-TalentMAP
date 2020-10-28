import PropTypes from 'prop-types';
import { BID_STATISTICS_ARRAY } from '../../Constants/PropTypes';
import BidCount from '../BidCount';
import { getBidStatisticsObject } from '../../utilities';

const ResultsCondensedCardStats = ({ bidStatisticsArray, isTandemTwo }) => {
  const bidStatistics = getBidStatisticsObject(bidStatisticsArray);
  return (
    <div className={`condensed-card-footer condensed-card-statistics ${isTandemTwo ? 'condensed-card-footer-tandem' : ''}`}>
      <div className="usa-grid-full condensed-card-statistics-inner">
        <BidCount bidStatistics={bidStatistics} isTandemTwo={isTandemTwo} />
      </div>
    </div>
  );
};

ResultsCondensedCardStats.propTypes = {
  bidStatisticsArray: BID_STATISTICS_ARRAY,
  isTandemTwo: PropTypes.bool,
};

ResultsCondensedCardStats.defaultProps = {
  bidStatisticsArray: [],
  isTandemTwo: false,
};

export default ResultsCondensedCardStats;
