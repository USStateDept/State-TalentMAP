import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_MESSAGE, SAVED_SEARCH_OBJECT } from '../../Constants/PropTypes';
import Form from '../Form';
import FieldSet from '../FieldSet/FieldSet';
import TextInput from '../TextInput';

class SaveNewSearchDialog extends Component {
  constructor(props) {
    super(props);
    this.submitNewSavedSearch = this.submitNewSavedSearch.bind(this);
    this.submitUpdatedSavedSearch = this.submitUpdatedSavedSearch.bind(this);
  }

  submitNewSavedSearch(e) {
    this.props.onFormSubmit(e);
  }

  submitUpdatedSavedSearch(e) {
    this.props.onFormSubmit(e, this.props.currentSavedSearch.id);
  }

  render() {
    const { onCancel, onTextChange,
      newSavedSearchHasErrored, newSavedSearchSuccess, currentSavedSearch } = this.props;
    const currentSearchExists = currentSavedSearch.id;
    // Check the "type" prop.
    // Setting this as an if statement allows us to easily add conditions if needed
    let inputType;
    if (newSavedSearchHasErrored) {
      inputType = 'error';
    }
    return (
      <Form className="usa-grid-full saved-search-form" onFormSubmit={this.submitNewSavedSearch}>
        <FieldSet
          className="saved-search-fieldset usa-width-one-half"
          legend="Add a new saved search"
          legendSrOnly
        >
          <TextInput
            id="saved-search"
            label="Name"
            changeText={onTextChange}
            type={inputType}
            value={currentSavedSearch.name}
            labelMessage={newSavedSearchHasErrored || newSavedSearchSuccess}
          />
        </FieldSet>
        <div className="saved-search-form-buttons">
          <button className="usa-button-secondary saved-search-form-secondary-button" onClick={onCancel}>Cancel</button>
          <button className="saved-search-form-primary-button" type="submit">{ currentSearchExists ? 'Save As' : 'Save' }</button>
          {
            currentSavedSearch.id ?
              <button
                className="saved-search-form-secondary-button"
                onClick={this.submitUpdatedSavedSearch}
              >
                Save
              </button>
              : null
          }
        </div>
      </Form>
    );
  }
}

SaveNewSearchDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  newSavedSearchHasErrored: SAVED_SEARCH_MESSAGE,
  newSavedSearchSuccess: SAVED_SEARCH_MESSAGE,
  currentSavedSearch: SAVED_SEARCH_OBJECT,
};

SaveNewSearchDialog.defaultProps = {
  newSavedSearchHasErrored: '',
  newSavedSearchSuccess: '',
  currentSavedSearch: {},
};

export default SaveNewSearchDialog;
