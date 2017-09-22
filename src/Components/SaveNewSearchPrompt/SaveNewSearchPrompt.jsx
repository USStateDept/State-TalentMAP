import React from 'react';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_MESSAGE } from '../../Constants/PropTypes';
import { inputKeyUp } from '../../utilities';

const SaveNewSearchPrompt = ({ toggleInput, newSavedSearchSuccess }) => (
  <div className="usa-grid-full">
    <div className="usa-grid-full">
      <a
        className="save-search-link"
        tabIndex="0"
        role="link"
        onClick={toggleInput}
        onKeyUp={(e) => { if (inputKeyUp(e)) { toggleInput(); } }}
      >
        Save this search.
      </a>
      &nbsp;You will be able to come back to these results later.
    </div>
    {
      newSavedSearchSuccess &&
      <div className="usa-grid-full">
        {newSavedSearchSuccess}
      </div>
    }
  </div>
);

SaveNewSearchPrompt.propTypes = {
  toggleInput: PropTypes.func.isRequired,
  newSavedSearchSuccess: SAVED_SEARCH_MESSAGE,
};

SaveNewSearchPrompt.defaultProps = {
  newSavedSearchSuccess: false,
};

export default SaveNewSearchPrompt;
