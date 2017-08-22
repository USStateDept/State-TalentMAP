import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: { value: '' },
    };
  }
  changeText(e) {
    const { searchText } = this.state;
    searchText.value = e.target.value;
    this.setState({ searchText }, this.props.onChangeText(e));
  }
  render() {
    const { id, type, submitDisabled, submitText, alertText, onSubmitSearch, label } = this.props;
    const { searchText } = this.state;
    let showSubmitText = true; // do not hide submit text initially
    if (type === 'small') { showSubmitText = false; } // small search class should not have text
    return (
      <div className={`usa-search usa-search-${type}`}>
        <div role="search">
          <form onSubmit={e => onSubmitSearch(e)}>
            <label className="usa-sr-only" htmlFor={id}>
              {label}
            </label>
            <input
              id={id}
              value={searchText.value}
              onChange={e => this.changeText(e)}
              type="search"
              name="search"
            />
            <div id="enabled-search">
              <button
                className={submitDisabled ? 'usa-button-disabled' : null}
                disabled={submitDisabled}
                type="submit"
              >
                <span className="usa-search-submit-text">{showSubmitText ? submitText : null}</span>
              </button>
            </div>
            <div id="disabled-search" className="hidden">
              <button className="usa-button-disabled" disabled="true" type="submit">
                <span className="usa-search-submit-text usa-button-disabled">
                  {showSubmitText ? submitText : null}
                </span>
              </button>
              <span className="alert-text">{alertText}</span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(['small', 'medium', 'big']),
  submitDisabled: PropTypes.bool,
  submitText: PropTypes.string.isRequired,
  alertText: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  type: 'big', // should be one of the USWDS search types - https://standards.usa.gov/components/search-bar/
  submitDisabled: false,
  alertText: 'Disabled',
  label: 'Search', // sr only
};

export default SearchBar;
