import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

const SuggestionChoice = ({ suggestion, value }) => {
  const name = `${suggestion.first_name} ${suggestion.last_name}`;
  const isSelection = suggestion.id === value.id;
  return (
    <div className="render-suggestion" style={{ position: 'relative' }} >
      {isSelection && <FA name="check" style={{ position: 'absolute', left: '-20px', top: '2px' }} />}
      {`${name}${suggestion.isCurrentUser ? ' (me)' : ''}`}
    </div>
  );
};

SuggestionChoice.propTypes = {
  suggestion: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    isCurrentUser: PropTypes.bool,
  }).isRequired,
  value: PropTypes.shape({
    id: PropTypes.number,
  }),
};

SuggestionChoice.defaultProps = {
  value: {},
};

export default SuggestionChoice;
