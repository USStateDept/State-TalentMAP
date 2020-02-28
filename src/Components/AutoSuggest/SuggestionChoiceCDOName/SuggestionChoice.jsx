import React from 'react';
import PropTypes from 'prop-types';

const SuggestionChoice = ({ suggestion }) => {
  const name = `${suggestion.first_name} ${suggestion.last_name}`;
  return (
    <div className="render-suggestion" style={{ position: 'relative' }} >
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
};

export default SuggestionChoice;
