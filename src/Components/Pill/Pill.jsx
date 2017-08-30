import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const Pill = ({ description, codeRef, selectionRef, onPillClick }) => {
  const style = {
    borderRadius: '12px',
    fontSize: '.8em',
    padding: '.5em',
  };
  return (
    <button style={style} onClick={() => onPillClick(selectionRef, codeRef)}>
      {description} <FontAwesome name="times" />
    </button>
  );
};

Pill.propTypes = {
  description: PropTypes.string.isRequired,
  codeRef: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectionRef: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onPillClick: PropTypes.func.isRequired,
};

export default Pill;
