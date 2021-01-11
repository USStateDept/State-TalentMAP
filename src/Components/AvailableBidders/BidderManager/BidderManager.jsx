import PropTypes from 'prop-types';
import Bidders from '../Bidders';
import AvailableBidderStats from '../AvailableBidderStats';


const BidderManager = ({ isCDO }) => (
  <div className="position-manager-details">
    <div className="usa-grid-full">
      <AvailableBidderStats />
    </div>
    <div className="usa-width-one-whole">
      <div className="usa-grid-full">
        <Bidders isCDO={isCDO} />
      </div>
    </div>
  </div>
);

BidderManager.propTypes = {
  isCDO: PropTypes.bool,
};

BidderManager.defaultProps = {
  isCDO: false,
};

export default (BidderManager);

