import PropTypes from 'prop-types';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import AvailableBidderTable from '../AvailableBidderTable';
import AvailableBidderStats from '../AvailableBidderStats';


const AvailableBidderContainer = ({ isCDO, isAO, isPost }) => {
  const isInternalCDA = (isCDO || isAO);
  return (
    <div className="position-manager-details bidder-manager-page">
      <div className={'usa-grid-full profile-content-inner-container'}>
        <div className="usa-grid-full">
          <ProfileSectionTitle title="Available Bidders" icon="users" />
        </div>
        {
          isInternalCDA &&
        <div className="usa-grid-full">
          <AvailableBidderStats />
        </div>
        }
        <div className="usa-width-one-whole">
          <div className="usa-grid-full">
            <AvailableBidderTable isInternalCDA={isInternalCDA} isAO={isAO} isPost={isPost} />
          </div>
        </div>
      </div>
    </div>
  );
};

AvailableBidderContainer.propTypes = {
  isCDO: PropTypes.bool,
  isAO: PropTypes.bool,
  isPost: PropTypes.bool,
};

AvailableBidderContainer.defaultProps = {
  isCDO: false,
  isAO: false,
  isPost: false,
};

export default AvailableBidderContainer;

