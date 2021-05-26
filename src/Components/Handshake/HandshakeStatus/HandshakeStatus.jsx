import { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
// import { Tooltip } from 'react-tippy';

const HandshakeStatus = props => {
  const [handshake, setHandshake] = useState(props.handshake);

  useEffect(() => {
    setHandshake(props.handshake);
  }, [props]);

  const {
    hs_status_code,
    bidder_hs_code,
    // hs_cdo_indicator,
    // hs_date_accepted,
    // hs_date_declined,
    // hs_date_offered,
    // hs_date_revoked,
  } = handshake;

  const getBureauStyling = () => {
    if (hs_status_code === 'handshake_offered') {
      return {
        bureau: 'offered',
        bureauIcon: 'hand-paper-o',
      };
    } else if (hs_status_code === 'handshake_revoked') {
      return {
        bureau: 'revoked',
        bureauIcon: 'hand-rock-o',
      };
    }
    return {
      bureau: 'inactive',
      bureauIcon: 'hand-paper-o',
    };
  };

  const getBidderStyling = () => {
    if (bidder_hs_code === 'handshake_accepted') {
      return {
        bidder: 'accepted',
        bidderIcon: 'hand-paper-o',
      };
    } else if (bidder_hs_code === 'handshake_declined') {
      return {
        bidder: 'declined',
        bidderIcon: 'hand-rock-o',
      };
    }
    return {
      bidder: 'inactive',
      bidderIcon: 'hand-paper-o',
    };
  };

  const bureauStyle = getBureauStyling();
  const bidderStyle = getBidderStyling();

  return (
    <>
      <div className="hs-status-container">
        <div className={`hs-status-bureau ${bureauStyle.bureau}`}>
          <span className="fa-sm">
            <FA name={`${bureauStyle.bureauIcon} fa-rotate-90`} />
          </span>
        </div>
        <div className={`hs-status-bidder ${bidderStyle.bidder}`}>
          <span className="fa-flip-vertical">
            <FA name={`${bidderStyle.bidderIcon} fa-rotate-270 fa-sm`} />
          </span>
        </div>
      </div>
    </>
  );
};

HandshakeStatus.propTypes = {
  handshake: PropTypes.shape({}),
  // isRegistered: PropTypes.bool,
};

HandshakeStatus.defaultProps = {
  handshake: {},
  // isRegistered: false,
};

export default HandshakeStatus;
