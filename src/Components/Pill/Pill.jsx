import React from 'react';
import PropTypes from 'prop-types';

const ResultsContainer = ({ name, code }) => {
  const style = {
    borderRadius: '12px',
    fontSize: '.8em',
    padding: '.5em',
  };
  return (
    <button style={style} onClick={() => this.props.onClick(code)}>{name}</button>
  );
};

ResultsContainer.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.oneOf(PropTypes.string, PropTypes.number).isRequired,
};

export default ResultsContainer;
