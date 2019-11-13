import React from 'react';
import PropTypes from 'prop-types';
import InteractiveElement from '../InteractiveElement';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

// eslint-disable-next-line
const RemoveSuccess = ({ pos, onToggle }) => (
  <span>
    {pos.title} ({pos.position_number}) has been successfully removed from Favorites.&nbsp;
    <InteractiveElement
      type="a"
      onClick={onToggle}
    >
        Undo
    </InteractiveElement>.
  </span>
);

/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
RemoveSuccess.propTypes = {
  pos: POSITION_DETAILS.isRequired,
  isPV: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

export default RemoveSuccess;
