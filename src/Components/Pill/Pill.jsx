import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const ResultsContainer = ({ description, code }) => {
  const style = {
    borderRadius: '12px',
    fontSize: '.8em',
    padding: '.5em',
  };
  return (
    <button style={style} onClick={() => this.props.onClick(code)}>
      {description} <FontAwesome name="times" />
    </button>
  );
};

ResultsContainer.propTypes = {
  description: PropTypes.string.isRequired,
  code: PropTypes.oneOf(PropTypes.string, PropTypes.number).isRequired,
};

export default ResultsContainer;
