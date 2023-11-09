import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BidStatus from '../BidStatus';
import BidCount from '../../BidCount';
import { BID_STATISTICS_OBJECT } from '../../../Constants/PropTypes';

const BidContent = ({ id, status, positionNumber, postName, positionTitle, bidStatistics }) => (
  <div className="usa-grid-full bid-content-container">
    <BidStatus status={status} positionTitle={positionTitle} />
    <span className="bid-stats">
      <BidCount bidStatistics={bidStatistics} altStyle label="Bid Count" />
    </span>
    <div>
      <span className="bid-list-card-title-position">Position Number </span>
      <Link to={`/details/${id}`}>
        {positionNumber}
      </Link>
    </div>
    <div>
      <span className="bid-list-card-title-post">Post </span>
      { postName }
    </div>
  </div>
);

BidContent.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  positionNumber: PropTypes.string.isRequired,
  postName: PropTypes.string.isRequired,
  positionTitle: PropTypes.string.isRequired,
  bidStatistics: BID_STATISTICS_OBJECT,
};

BidContent.defaultProps = {
  bidStatistics: null,
};


export default BidContent;
