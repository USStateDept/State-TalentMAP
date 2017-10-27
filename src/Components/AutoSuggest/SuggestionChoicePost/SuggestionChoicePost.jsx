import React from 'react';
import PropTypes from 'prop-types';

const SuggestionChoicePost = ({ suggestion }) => (
  <div className="render-suggestion render-suggestion--post">
    {suggestion.location}
  </div>
);

SuggestionChoicePost.propTypes = {
  suggestion: PropTypes.shape({
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default SuggestionChoicePost;
