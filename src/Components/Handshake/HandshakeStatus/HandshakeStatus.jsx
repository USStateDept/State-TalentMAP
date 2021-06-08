import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

const HandshakeStatus = props => {
  const [handshake, setHandshake] = useState(props.handshake);

  useEffect(() => {
    setHandshake(props.handshake);
  }, [props]);

  const {
    hs_status_code,
    bidder_hs_code,
  } = handshake;

  const styling = {
    handshake_offered: {
      bureau: 'offered',
      bureauIcon: 'hand-paper-o',
    },
    handshake_revoked: {
      bureau: 'revoked',
      bureauIcon: 'hand-rock-o',
    },
    handshake_accepted: {
      bidder: 'accepted',
      bidderIcon: 'hand-paper-o',
    },
    handshake_declined: {
      bidder: 'declined',
      bidderIcon: 'hand-rock-o',
    },
    default: {
      bidder: 'inactive',
      bureau: 'inactive',
      bureauIcon: 'hand-paper-o',
      bidderIcon: 'hand-paper-o',
    },
  };

  const bureauStyle = styling[hs_status_code] || styling.default;
  const bidderStyle = styling[bidder_hs_code] || styling.default;

  return (
    <>
      <div className="hs-status-container">
        <div className={`hs-status-bureau ${bureauStyle.bureau}`}>
          <FA name={`${bureauStyle.bureauIcon} fa-rotate-90`} />
        </div>
        <div className={`hs-status-bidder ${bidderStyle.bidder}`}>
          <span className="fa-flip-vertical">
            <FA name={`${bidderStyle.bidderIcon} fa-rotate-270`} />
          </span>
        </div>
      </div>
    </>
  );
};

HandshakeStatus.propTypes = {
  handshake: PropTypes.shape({}),
};

HandshakeStatus.defaultProps = {
  handshake: {},
};

export default HandshakeStatus;
