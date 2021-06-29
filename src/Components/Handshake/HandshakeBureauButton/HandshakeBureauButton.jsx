import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { offerHandshake, revokeHandshake } from 'actions/handshake';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
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
    hs_date_offered,
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

  const handshakeModal = (infoOnly = false) => {
    swal({
      title: infoOnly ? 'Handshake Info' : `${buttonText()} Handshake`,
      button: false,
      content: (
        <EditHandshake
          submitAction={submitAction}
          expiration={hs_date_expiration}
          offer={hs_date_offered}
          uneditable={hs_status_code === 'handshake_offered'}
          infoOnly={infoOnly}
          submitText={buttonText()}
        />
      ),
    });
  };

  return (
    <div className="btn-hs-wrapper">
      <button
        className="btn-action"
        title={`${buttonText()} handshake`}
        onClick={() => handshakeModal(false)}
        disabled={disabled}
      >
        {buttonText()}
      </button>
      <button
        className="btn-infoOnly"
        onClick={() => handshakeModal(true)}
      >
        <FA name="info-circle" />
      </button>
    </div>
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
