import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { SAVED_SEARCH_MESSAGE, SAVED_SEARCH_OBJECT } from '../../Constants/PropTypes';
import InteractiveElement from '../InteractiveElement';
import { focusById } from '../../utilities';

const SaveNewSearchPrompt = ({ toggleInput, newSavedSearchSuccess,
  currentSavedSearch }) => {
  const currentSearchExists = currentSavedSearch.id;
  return (
    <div className="usa-grid-full">
      <div className="usa-grid-full">
        <FontAwesome name="bookmark" />
        {
          currentSearchExists ? `Saved search: ${currentSavedSearch.name}. ` : null
        }
        <InteractiveElement
          className="save-search-link"
          type="span"
          onClick={(e) => { toggleInput(e); focusById('saved-search', 1); }}
          role="link"
        >
          {currentSearchExists ? 'Edit this search.' : 'Save this search.'}
        </InteractiveElement>
        &nbsp;{currentSearchExists ? null : 'You will be able to come back to these results later.'}
      </div>
      {
        newSavedSearchSuccess &&
        <div className="usa-grid-full">
          {newSavedSearchSuccess}
        </div>
      }
    </div>
  );
};

SaveNewSearchPrompt.propTypes = {
  toggleInput: PropTypes.func.isRequired,
  newSavedSearchSuccess: SAVED_SEARCH_MESSAGE,
  currentSavedSearch: SAVED_SEARCH_OBJECT,
};

SaveNewSearchPrompt.defaultProps = {
  newSavedSearchSuccess: false,
  currentSavedSearch: {},
};

export default SaveNewSearchPrompt;
