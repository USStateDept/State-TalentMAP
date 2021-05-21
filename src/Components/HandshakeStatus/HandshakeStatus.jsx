// import { useState, useEffect, useRef } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
// import { Tooltip } from 'react-tippy';

const HandshakeStatus = props => {
  const {
    bureauStatus,
    bidderStatus,
    // isRegistered,
  } = props;

  const getBureauStyling = () => {
    if (bureauStatus === 'handshake_offered') {
      return {
        bureau: 'offered',
        bureauIcon: 'hand-paper-o',
      };
    } else if (bureauStatus === 'handshake_offer_revoked') {
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
    if (bidderStatus === 'handshake_offer_accepted') {
      return {
        bidder: 'accepted',
        bidderIcon: 'hand-paper-o',
      };
    } else if (bidderStatus === 'handshake_offer_declined') {
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
  bureauStatus: PropTypes.string,
  bidderStatus: PropTypes.string,
  // isRegistered: PropTypes.bool,
};

HandshakeStatus.defaultProps = {
  bureauStatus: 'inactive',
  bidderStatus: 'inactive',
  // isRegistered: false,
};

export default HandshakeStatus;
