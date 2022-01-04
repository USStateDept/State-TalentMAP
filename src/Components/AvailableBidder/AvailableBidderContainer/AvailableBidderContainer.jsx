import PropTypes from 'prop-types';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import AvailableBidderTable from '../AvailableBidderTable';
import AvailableBidderStats from '../AvailableBidderStats';


const AvailableBidderContainer = ({ isCDO }) => (
  <div className="position-manager-details bidder-manager-page">
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
          <AvailableBidderTable isCDO={isCDO} />
        </div>
      </div>
    </div>
  </div>
);

AvailableBidderContainer.propTypes = {
  isCDO: PropTypes.bool,
};

AvailableBidderContainer.defaultProps = {
  isCDO: false,
};

export default AvailableBidderContainer;

