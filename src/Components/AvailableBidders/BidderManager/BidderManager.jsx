import Bidders from '../Bidders';
import AvailableBidderStats from '../AvailableBidderStats';


const BidderManager = () => (
  <div className="position-manager-details bidder-manager-page">
    <div className="usa-grid-full">
      <AvailableBidderStats />
    </div>
    <div className="usa-width-one-whole">
      <div className="usa-grid-full">
        <Bidders />
      </div>
    </div>
  </div>
);

BidderManager.propTypes = {

};

BidderManager.defaultProps = {

};


export default (BidderManager);
