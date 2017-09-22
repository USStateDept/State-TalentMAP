import React from 'react';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_MESSAGE } from '../../Constants/PropTypes';
import Form from '../Form';
import FieldSet from '../FieldSet/FieldSet';
import TextInput from '../TextInput';

const SaveNewSearchDialogue = ({ onCancel, onTextChange, onFormSubmit,
  newSavedSearchHasErrored, newSavedSearchSuccess }) => {
  // Check the "type" prop.
  // Setting this as an if statement allows us to easily add conditions if needed
  let inputType;
  if (newSavedSearchHasErrored) {
    inputType = 'error';
  }
  return (
    <Form className="usa-grid-full saved-search-form" onFormSubmit={onFormSubmit}>
      <FieldSet
        className="saved-search-fieldset usa-width-one-half"
        legend="Add a new saved search"
        legendSrOnly
      >
        <TextInput
          id="saved-search"
          label="Name:"
          changeText={onTextChange}
          type={inputType}
          labelMessage={newSavedSearchHasErrored || newSavedSearchSuccess}
        />
      </FieldSet>
      <div className="saved-search-form-buttons">
        <button className="saved-search-form-submit" type="submit">Submit</button>
        <button className="saved-search-form-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </Form>
  );
};

SaveNewSearchDialogue.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  newSavedSearchHasErrored: SAVED_SEARCH_MESSAGE,
  newSavedSearchSuccess: SAVED_SEARCH_MESSAGE,
};

SaveNewSearchDialogue.defaultProps = {
  newSavedSearchHasErrored: '',
  newSavedSearchSuccess: '',
};

export default SaveNewSearchDialogue;
