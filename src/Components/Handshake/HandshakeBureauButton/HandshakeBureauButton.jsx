import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { offerHandshake, revokeHandshake } from 'actions/handshake';
// import { Tooltip } from 'react-tippy';

const HandshakeBureauButton = props => {
  const [handshake, setHandshake] = useState(props.handshake);
  // const [isRegistered, setIsRegistered] = useState(props.isRegistered);
  const [positionID, setPositionID] = useState(props.positionID);
  const [personID, setPersonID] = useState(props.personID);
  const [disabled, setDisabled] = useState(props.disabled);

  useEffect(() => {
    setHandshake(props.handshake);
    setPositionID(props.positionID);
    setPersonID(props.personID);
    setDisabled(props.disabled);
  }, [props]);

  const dispatch = useDispatch();

  const {
    hs_status_code,
    // bidder_hs_code,
    // hs_cdo_indicator,
    // hs_date_accepted,
    // hs_date_declined,
    // hs_date_offered,
    // hs_date_revoked,
  } = handshake;


  const buttonText = () => {
    if (hs_status_code === 'handshake_revoked') {
      return 'Re-offer';
    } else if (hs_status_code === 'handshake_offered') {
      return 'Revoke';
    }
    return 'Offer';
  };

  return (
    <>
      <button
        className=""
        title={`${buttonText()} handshake`}
        onClick={!hs_status_code || hs_status_code === 'handshake_revoked' ?
          () => dispatch(offerHandshake(personID, positionID)) :
          () => dispatch(revokeHandshake(personID, positionID))
        }
        disabled={disabled}
      >
        {buttonText()}
      </button>
    </>
  );
};

HandshakeBureauButton.propTypes = {
  handshake: PropTypes.shape({}),
  // isRegistered: PropTypes.bool,
  positionID: PropTypes.string,
  personID: PropTypes.string,
  disabled: PropTypes.bool,
};

HandshakeBureauButton.defaultProps = {
  handshake: {},
  // isRegistered: false,
  positionID: '',
  personID: '',
  disabled: true,
};

export default HandshakeBureauButton;
