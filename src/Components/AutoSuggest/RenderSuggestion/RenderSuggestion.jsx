import React from 'react';
import PropTypes from 'prop-types';

const RenderSuggestion = ({ suggestion }) => (
  <div className="render-suggestion">
    {`${suggestion.short_name} (${suggestion.code})`}
  </div>
);

RenderSuggestion.propTypes = {
  suggestion: PropTypes.shape({
    short_name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
};

export default RenderSuggestion;
