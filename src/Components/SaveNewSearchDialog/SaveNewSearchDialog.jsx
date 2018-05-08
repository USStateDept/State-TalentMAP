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
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      type: 'enter',
    };
  }

  onSubmit(e) {
    const submit = this.isExisting ?
      this.submitUpdatedSavedSearch :
      this.submitNewSavedSearch;

    submit(e);
  }

  get isExisting() {
    const id = this.props.currentSavedSearch.id || 0;
    return (id > 0);
  }

  submitNewSavedSearch(e) {
    this.props.onFormSubmit(e);
    this.props.onCancel(e);
  }

  submitUpdatedSavedSearch(e) {
    this.props.onFormSubmit(e, this.props.currentSavedSearch.id);
    this.props.onCancel(e);
  }

  render() {
    const {
      onCancel,
      onTextChange,
      newSavedSearchHasErrored,
      newSavedSearchSuccess,
      currentSavedSearch,
    } = this.props;

    // Check the "type" prop.
    // Setting this as an if statement allows us to easily add conditions if needed
    let inputType;
    if (newSavedSearchHasErrored) {
      inputType = 'error';
    }

    return (
      <Form className="usa-grid-full saved-search-form" onFormSubmit={this.onSubmit}>
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
          <button
            type="button"
            className="usa-button-secondary saved-search-form-secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="saved-search-form-primary-button"
            onClick={this.submitNewSavedSearch}
          >
            { this.isExisting ? 'Save As' : 'Save' }
          </button>
          {
            this.isExisting ?
              <button
                className="saved-search-form-secondary-button"
                onClick={this.submitUpdatedSavedSearch}
              >
                Save
              </button> : null
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
