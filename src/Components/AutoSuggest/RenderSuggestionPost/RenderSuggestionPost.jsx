import React from 'react';
import PropTypes from 'prop-types';

const RenderSuggestionPost = ({ suggestion }) => (
  <div className="render-suggestion render-suggestion--post">
    {suggestion.location}
  </div>
);

RenderSuggestionPost.propTypes = {
  suggestion: PropTypes.shape({
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default RenderSuggestionPost;
