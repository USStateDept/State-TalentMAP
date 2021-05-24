// import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { offerHandshake, revokeHandshake } from 'actions/handshake';
// import { Tooltip } from 'react-tippy';

const HandshakeBureauButton = props => {
  const {
    bureauStatus,
    // isRegistered,
    positionID,
    personID,
  } = props;

  const dispatch = useDispatch();

  const isDisabled = false; // Fix with prop or check for if there is another active bid


  const buttonText = () => {
    if (bureauStatus === 'handshake_offer_revoked') {
      return 'Re-offer';
    } else if (bureauStatus === 'handshake_offered') {
      return 'Revoke';
    }
    return 'Offer';
  };

  return (
    <>
      <button
        className=""
        title={`${buttonText()} handshake`}
        onClick={bureauStatus !== 'handshake_offer_revoked' ?
          () => dispatch(offerHandshake(positionID, personID)) :
          () => dispatch(revokeHandshake(positionID, personID))
        }
        disabled={isDisabled}
      >
        {buttonText()}
      </button>
    </>
  );
};

HandshakeBureauButton.propTypes = {
  bureauStatus: PropTypes.string,
  // isRegistered: PropTypes.bool,
  positionID: PropTypes.string,
  personID: PropTypes.string,
};

HandshakeBureauButton.defaultProps = {
  bureauStatus: 'inactive',
  // isRegistered: false,
  positionID: '',
  personID: '',
};

export default HandshakeBureauButton;
