import PropTypes from 'prop-types';
import InteractiveElement from '../InteractiveElement';

const RegisterSuccess = ({ undo }) => (
  <span>
    Handshake successfully registered.&nbsp;
    <InteractiveElement
      type="a"
      onClick={undo}
    >
        Undo
    </InteractiveElement>.
  </span>
);

RegisterSuccess.propTypes = {
  undo: PropTypes.func.isRequired,
};

export default RegisterSuccess;
