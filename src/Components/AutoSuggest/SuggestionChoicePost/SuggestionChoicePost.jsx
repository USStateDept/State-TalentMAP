import React from 'react';
import PropTypes from 'prop-types';
import { getPostName } from '../../../utilities';

const SuggestionChoicePost = ({ suggestion }) => (
  <div className="render-suggestion render-suggestion--post">
    {getPostName(suggestion)}{suggestion.hasDuplicateDescription && suggestion.code ? ` (${suggestion.code})` : ''}
  </div>
);

SuggestionChoicePost.propTypes = {
  suggestion: PropTypes.shape({
    location: PropTypes.shape({}),
    hasDuplicateDescription: PropTypes.bool,
    code: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};

export default SuggestionChoicePost;
