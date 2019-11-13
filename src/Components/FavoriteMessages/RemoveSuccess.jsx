import React from 'react';
import PropTypes from 'prop-types';
import InteractiveElement from '../InteractiveElement';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

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

RemoveSuccess.propTypes = {
  pos: POSITION_DETAILS.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default RemoveSuccess;
