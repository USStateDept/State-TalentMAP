import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { ifEnter } from '../../utilities';

const EditContentButton = ({ onToggle }) => (
  <FontAwesome
    onClick={onToggle}
    onKeyUp={(e) => { if (ifEnter(e)) { onToggle(); } }}
    name="pencil"
    id="description-edit"
    tabIndex="0"
  />
);

EditContentButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default EditContentButton;
