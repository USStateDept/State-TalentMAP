import React from 'react';
import PropTypes from 'prop-types';

const SuggestionChoice = ({ suggestion }) => (
  <div className="render-suggestion">
    {`${suggestion.short_name} (${suggestion.code})`}
  </div>
);

SuggestionChoice.propTypes = {
  suggestion: PropTypes.shape({
    short_name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
};

export default SuggestionChoice;
