import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { offerHandshake, revokeHandshake } from 'actions/handshake';
import swal from '@sweetalert/with-react';
import EditHandshake from '../EditHandshake';
// import { Tooltip } from 'react-tippy';

const HandshakeBureauButton = props => {
  const { positionID, personID } = props;
  const [handshake, setHandshake] = useState(props.handshake);
  const [disabled, setDisabled] = useState(props.disabled);


  useEffect(() => {
    setHandshake(props.handshake);
    setDisabled(props.disabled);
  }, [props]);

  const dispatch = useDispatch();

  const {
    hs_status_code,
    hs_date_expiration,
  } = handshake;


  const buttonText = () => {
    if (hs_status_code === 'handshake_revoked') {
      return 'Re-offer';
    } else if (hs_status_code === 'handshake_offered') {
      return 'Revoke';
    }
    return 'Offer';
  };

  const submitAction = (data) => {
    if (!hs_status_code || (hs_status_code === 'handshake_revoked')) {
      dispatch(offerHandshake(personID, positionID, data));
    } else {
      dispatch(revokeHandshake(personID, positionID));
    }
    swal.close();
  };

  const handshakeModal = () => {
    swal({
      title: 'Offer Handshake',
      button: false,
      content: (
        <EditHandshake
          submitAction={submitAction}
          expiration={hs_date_expiration}
          disabled={hs_status_code === 'handshake_offered'}
        />
      ),
    });
  };

  return (
    <>
      <button
        className=""
        title={`${buttonText()} handshake`}
        onClick={handshakeModal}
        disabled={disabled}
      >
        {buttonText()}
      </button>
    </>
  );
};

HandshakeBureauButton.propTypes = {
  handshake: PropTypes.shape({}),
  positionID: PropTypes.string,
  personID: PropTypes.string,
  disabled: PropTypes.bool,
};

HandshakeBureauButton.defaultProps = {
  handshake: {},
  positionID: '',
  personID: '',
  disabled: true,
};

export default HandshakeBureauButton;
