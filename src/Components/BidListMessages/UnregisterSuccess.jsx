import React from 'react';
import PropTypes from 'prop-types';
import InteractiveElement from '../InteractiveElement';

const UnregisterSuccess = ({ undo }) => (
  <span>
    Handshake successfully unregistered.&nbsp;
    <InteractiveElement
      type="a"
      onClick={undo}
    >
        Undo
    </InteractiveElement>.
  </span>
);

UnregisterSuccess.propTypes = {
  undo: PropTypes.func.isRequired,
};

export default UnregisterSuccess;
