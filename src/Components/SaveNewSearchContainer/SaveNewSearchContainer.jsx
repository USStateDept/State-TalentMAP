import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_MESSAGE, SAVED_SEARCH_OBJECT } from '../../Constants/PropTypes';
import SaveNewSearchDialog from '../SaveNewSearchDialog';
import SaveNewSearchPrompt from '../SaveNewSearchPrompt';

class SaveNewSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.toggleInput = this.toggleInput.bind(this);
    this.changeNewSearchName = this.changeNewSearchName.bind(this);
    this.submitSavedSearch = this.submitSavedSearch.bind(this);
    this.state = {
      showInput: { value: false },
      newSearchName: { value: this.props.currentSavedSearch.name || '' },
    };
  }

  toggleInput(e) {
    // preventDefault() to avoid query params getting added in MS Edge
    e.preventDefault();
    const { showInput, newSearchName } = this.state;
    // reset the input field, since the component will re-render and be out of sync with state
    showInput.value = !showInput.value;
    this.setState({ showInput, newSearchName });
  }

  changeNewSearchName(e) {
    const { newSearchName } = this.state;
    newSearchName.value = e;
    this.setState({ newSearchName });
  }

  submitSavedSearch(e, id) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.props.saveSearch(this.state.newSearchName.value, id);
  }

  render() {
    const { showInput } = this.state;
    const { newSavedSearchHasErrored, currentSavedSearch, newSavedSearchIsSaving } = this.props;
    return (
      <div className={`usa-grid-full save-new-search-container ${newSavedSearchIsSaving ? 'results-loading' : ''}`}>
        <SaveNewSearchPrompt
          toggleInput={this.toggleInput}
          currentSavedSearch={currentSavedSearch}
        />
        {
          showInput.value &&
          <SaveNewSearchDialog
            onFormSubmit={this.submitSavedSearch}
            onTextChange={this.changeNewSearchName}
            onCancel={this.toggleInput}
            newSavedSearchHasErrored={newSavedSearchHasErrored}
            currentSavedSearch={currentSavedSearch}
          />
        }
      </div>
    );
  }
}

SaveNewSearchContainer.propTypes = {
  saveSearch: PropTypes.func.isRequired,
  newSavedSearchHasErrored: SAVED_SEARCH_MESSAGE.isRequired,
  newSavedSearchIsSaving: PropTypes.bool.isRequired,
  currentSavedSearch: SAVED_SEARCH_OBJECT,
};

SaveNewSearchContainer.defaultProps = {
  currentSavedSearch: {},
};

export default SaveNewSearchContainer;
