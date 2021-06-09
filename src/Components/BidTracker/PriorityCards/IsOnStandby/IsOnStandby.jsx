import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { BID_OBJECT } from 'Constants/PropTypes';
import { getStatusProperty } from 'Constants/BidStatuses';
import { CLOSED_PROP, DECLINED_PROP } from 'Constants/BidData';
import BidTrackerCardTop from '../../BidTrackerCardTop';

const IsOnStandby = ({ bid, deleteBid }) => {
  const bidStatus = getStatusProperty(bid.status, 'text');
  const statusIsClosed = bidStatus === CLOSED_PROP;
  const statusIsDeclined = bidStatus === DECLINED_PROP;
  const useDisabledClass = statusIsClosed || statusIsDeclined;
  return (
    <div
      className={`usa-grid-full bid-tracker
        bid-tracker-standby-container ${useDisabledClass && 'standby-container-disabled'}`}
    >
      <div className="padded-container-inner bid-tracker-standby-title">
        <div className="bid-tracker-standby-inner-container">
          <div className="bid-tracker-standby-title-top">
            { useDisabledClass && <FontAwesome name="check-circle-o" /> }
            {bidStatus}
          </div>
          { !useDisabledClass && <div className="bid-tracker-standby-title-bottom">(on-hold)</div> }
        </div>
      </div>
      <div className="bid-tracker-standby-content-container">
        <BidTrackerCardTop
          showBidCount={false}
          showQuestion={false}
          bid={bid}
          deleteBid={deleteBid}
          hideDelete
        />
      </div>
    </div>
  );
};

IsOnStandby.propTypes = {
  bid: BID_OBJECT.isRequired,
  deleteBid: PropTypes.func.isRequired,
};

export default IsOnStandby;
