import PropTypes from 'prop-types';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import Bidders from '../Bidders';
import AvailableBidderStats from '../AvailableBidderStats';


const BidderManager = ({ isCDO }) => (
  <div className="position-manager-details">
    <div className={'usa-grid-full profile-content-inner-container'}>
      <div className="usa-grid-full">
        <ProfileSectionTitle title="Available Bidders" icon="users" />
      </div>
      {
        isCDO &&
      <div className="usa-grid-full">
        <AvailableBidderStats />
      </div>
      }
      <div className="usa-width-one-whole">
        <div className="usa-grid-full">
          <Bidders isCDO={isCDO} />
        </div>
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

