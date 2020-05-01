import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_MESSAGE, SAVED_SEARCH_OBJECT } from '../../Constants/PropTypes';
import Form from '../Form';
import FieldSet from '../FieldSet/FieldSet';
import TextInput from '../TextInput';

class SaveNewSearchDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSearchName: { value: this.props.currentSavedSearch.name || '' },
    };
  }

  onSubmit = e => {
    if (this.isExisting) {
      this.submitSavedSearch(e, this.props.currentSavedSearch.id);
    } else {
      this.submitSavedSearch(e);
    }
  };

  get isExisting() {
    const id = this.props.currentSavedSearch.id || 0;
    return (id > 0);
  }

  changeNewSearchName = e => {
    const { newSearchName } = this.state;
    newSearchName.value = e;
    this.setState({ newSearchName });
  };

  updateSavedSearch = e => {
    this.submitSavedSearch(e, this.props.currentSavedSearch.id);
  };

  submitSavedSearch = (e, id) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.props.saveSearch(this.state.newSearchName.value, id);
    if (this.state.newSearchName.value) {
      this.props.onCancel(e);
    }
  };

  render() {
    const { onCancel, newSavedSearchHasErrored, newSavedSearchSuccess } = this.props;

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
            changeText={this.changeNewSearchName}
            type={inputType}
            value={this.state.newSearchName.value}
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
            onClick={this.submitSavedSearch}
          >
            { this.isExisting ? 'Save As' : 'Save' }
          </button>
          {
            this.isExisting ?
              <button
                className="saved-search-form-secondary-button"
                onClick={this.updateSavedSearch}
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
  saveSearch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
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
