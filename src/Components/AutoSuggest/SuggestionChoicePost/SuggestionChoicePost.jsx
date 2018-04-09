import React from 'react';
import PropTypes from 'prop-types';
import { getPostName } from '../../../utilities';

const SuggestionChoicePost = ({ suggestion }) => (
  <div className="render-suggestion render-suggestion--post">
    {getPostName(suggestion)}
  </div>
);

SuggestionChoicePost.propTypes = {
  suggestion: PropTypes.shape({
    location: PropTypes.shape({}),
  }).isRequired,
};

export default SuggestionChoicePost;
