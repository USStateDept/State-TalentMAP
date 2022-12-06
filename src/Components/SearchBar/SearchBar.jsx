import { Component } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { EMPTY_FUNCTION, PREVENT_DEFAULT } from 'Constants/PropTypes';
import InteractiveElement from '../InteractiveElement';
import { focusById } from '../../utilities';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: { value: this.props.defaultValue || '' },
    };
  }

  changeText = e => {
    const { searchText } = this.state;
    searchText.value = e.target.value;
    this.setState({ searchText }, this.props.onChangeText(e));
  };

  clearSearch = () => {
    const { id } = this.props;
    this.changeText({ target: { value: '' } });
    this.props.onClear();
    focusById(id, 1);
  };

  render() {
    const hidden = {
      display: 'none',
    };
    const { id, type, submitText, placeholder, inputDisabled,
      alertText, onSubmitSearch, label, labelSrOnly, noForm, noButton, showClear, submitForm,
      isUserRoles }
      = this.props;
    const { searchText } = this.state;
    let showSubmitText = true; // do not hide submit text initially
    if (type === 'small') { showSubmitText = false; } // small search class should not have text

    let labelClass = '';
    if (labelSrOnly) { labelClass = 'usa-sr-only'; }

    let formattedSubmitText = '';
    if (showSubmitText) {
      formattedSubmitText = submitText;
    }

    const hasValue = !!searchText.value;

    const input = (
      <input
        id={id}
        value={inputDisabled ? '' : searchText.value}
        onChange={this.changeText}
        type="search"
        name="search"
        placeholder={placeholder}
        disabled={inputDisabled}
      />
    );
    const child = (
      <div className="usa-grid-full label-input-wrapper">
        <label className={labelClass} htmlFor={id}>
          {label}
        </label>
        {
          showClear ?
            <span className="text-input-wrapper">
              {input}
              {
                hasValue ? (
                  <InteractiveElement onClick={this.clearSearch} type="span" role="button" title="Clear keyword">
                    <FA name="times-circle" />
                  </InteractiveElement>
                ) : <FA name="search" />
              }
            </span>
            :
            input
        }
        <div id={`disabled-search-${id}`} style={hidden}>
          {
            !noButton &&
            <button
              className="usa-button-disabled"
              disabled="true"
              type="submit"
              id={`disabled-search-button-${id}`}
              title="search button disabled"
            >
              <span className="usa-search-submit-text usa-button-disabled">
                {formattedSubmitText}
              </span>
            </button>
          }
          <span className="alert-text">{alertText}</span>
        </div>
      </div>
    );
    return (
      <>
        {
          !isUserRoles ?
            <fieldset>
              <div className="usa-width-one-whole search-results-inputs search-keyword">
                <legend className="usa-grid-full homepage-search-legend">{label}</legend>
                <InteractiveElement title="Search Bar" onClick={submitForm}>
                  <div className={`usa-search usa-search-${type} searchbar`}>
                    <div role="search" className="usa-grid-full">
                      {
                        !noForm &&
                        <form onSubmit={onSubmitSearch}>
                          {child}
                        </form>
                      }
                      {
                        noForm &&
                        child
                      }
                    </div>
                  </div>
                </InteractiveElement>
                {
                  !noButton &&
                  <div className="usa-width-one-sixth search-submit-button">
                    <button className="usa-button" type="submit" onClick={submitForm}>
                      <FA name="search" className="label-icon" />
                    Search
                    </button>
                  </div>
                }
              </div>
            </fieldset>
            :
            <div className={`usa-search usa-search-${type} searchbar`}>
              <div role="search" className="usa-grid-full">
                {!noForm &&
                  <form onSubmit={onSubmitSearch}>
                    {child}
                  </form>
                }
                {
                  noForm &&
                  child
                }
              </div>
            </div>
        }
      </>
    );
  }
}

SearchBar.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  type: PropTypes.oneOf(['small', 'medium', 'big']),
  submitText: PropTypes.string.isRequired,
  alertText: PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitSearch: PropTypes.func,
  labelSrOnly: PropTypes.bool,
  noForm: PropTypes.bool,
  noButton: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  inputDisabled: PropTypes.bool,
  showClear: PropTypes.bool,
  onClear: PropTypes.func,
  submitForm: PropTypes.func,
  isUserRoles: PropTypes.bool,
};

SearchBar.defaultProps = {
  type: 'big', // should be one of the USWDS search types - https://standards.usa.gov/components/search-bar/
  alertText: 'Disabled',
  label: 'Search', // sr only if flagged
  labelSrOnly: true,
  noForm: false,
  noButton: false,
  placeholder: null,
  defaultValue: null,
  onSubmitSearch: PREVENT_DEFAULT,
  onChangeText: EMPTY_FUNCTION,
  inputDisabled: false,
  showClear: false,
  onClear: EMPTY_FUNCTION,
  submitForm: EMPTY_FUNCTION,
  isUserRoles: false,
};

export default SearchBar;
