import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { offerHandshake, revokeHandshake } from 'actions/handshake';
// import { Tooltip } from 'react-tippy';

const HandshakeBureauButton = props => {
  const [bureauStatus, setBureauStatus] = useState(props.bureauStatus);
  // const [isRegistered, setIsRegistered] = useState(props.isRegistered);
  const [positionID, setPositionID] = useState(props.positionID);
  const [personID, setPersonID] = useState(props.personID);

  useEffect(() => {
    setBureauStatus(props.bureauStatus);
    setPositionID(props.positionID);
    setPersonID(props.personID);
  }, [props]);

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
        onClick={!bureauStatus || bureauStatus === 'handshake_offer_revoked' ?
          () => dispatch(offerHandshake(personID, positionID)) :
          () => dispatch(revokeHandshake(personID, positionID))
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
