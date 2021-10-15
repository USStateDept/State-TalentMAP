import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import { format, isDate, isPast } from 'date-fns-v2';


const HandshakeStatus = props => {
  const [handshake, setHandshake] = useState(props.handshake);

  useEffect(() => {
    setHandshake(props.handshake);
  }, [props]);


  const formatDate = (d) => isDate(new Date(d)) ? format(new Date(d), 'Pp') : '';

  const {
    hs_status_code,
    bidder_hs_code,
    hs_date_accepted,
    hs_date_declined,
    hs_date_offered,
    hs_date_revoked,
    hs_date_expiration,
    // hs_cdo_indicator,
  } = handshake;

  const isExpired = hs_date_expiration && isPast(new Date(hs_date_expiration));

  const styling = {
    handshake_offered: {
      bureau: 'offered',
      bureauIcon: 'hand-paper-o',
      tooltip: 'Offered',
      date: hs_date_offered,
    },
    handshake_revoked: {
      bureau: 'revoked',
      bureauIcon: 'hand-rock-o',
      tooltip: 'Revoked',
      date: hs_date_revoked,
    },
    handshake_accepted: {
      bidder: 'accepted',
      bidderIcon: 'hand-paper-o',
      tooltip: 'Accepted',
      date: hs_date_accepted,
    },
    handshake_declined: {
      bidder: 'declined',
      bidderIcon: 'hand-rock-o',
      tooltip: 'Declined',
      date: hs_date_declined,
    },
    // Calculated statuses below - not identical tmap hs_status_code
    handshake_expired: {
      bidder: 'expired',
      bidderIcon: 'clock-o',
      tooltip: 'Handshake Expired',
      date: hs_date_expiration,
    },
    default: {
      bureau: 'inactive',
      bidder: 'inactive',
      bidderIcon: 'hand-paper-o',
      bureauIcon: 'hand-paper-o',
      tooltip: 'Awaiting Action',
      date: '',
    },
  };

  const bureauStyle = styling[hs_status_code] || styling.default;
  const bidderStyle = styling[bidder_hs_code] || styling[isExpired ? 'handshake_expired' : 'default'];

  return (
    <>
      <Tooltip
        html={
          <div className="status-tooltip-wrapper">
            <div>
              <span className="title">Bureau: <span className="status-name">{bureauStyle.tooltip}</span></span>

              <span className="text"> {bureauStyle.date ? formatDate(bureauStyle.date) : ''}</span>
            </div>
            <div>
              <span className="title">Bidder: <span className="status-name">{bidderStyle.tooltip}</span></span>

              <span className="text"> {bidderStyle.date ? formatDate(bidderStyle.date) : ''}</span>
            </div>
          </div>
        }
        theme="hs-status"
        arrow
        tabIndex="0"
        interactive
        useContext
      >
        <div className="hs-status-container">
          <div className={`hs-status-bureau ${bureauStyle.bureau}`}>
            <FA name={`${bureauStyle.bureauIcon} fa-rotate-90`} />
          </div>
          <div className={`hs-status-bidder ${bidderStyle.bidder}`}>
            {
              bidderStyle.bidderIcon === 'clock-o' ?
                <span>
                  <FA name={bidderStyle.bidderIcon} />
                </span>
                :
                <span className="fa-flip-vertical">
                  <FA name={`${bidderStyle.bidderIcon} fa-rotate-270`} />
                </span>
            }
          </div>
        </div>
      </Tooltip>
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
