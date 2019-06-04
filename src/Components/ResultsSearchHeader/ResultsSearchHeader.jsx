import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import SearchBar from '../SearchBar/SearchBar';

class ResultsSearchHeader extends Component {
  constructor(props) {
    super(props);
    this.onChangeQueryText = this.onChangeQueryText.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.state = {
      position__q: { value: this.props.defaultKeyword || '' },
    };
  }
  onChangeQueryText(e) {
    this.changeText('q', e);
  }
  submitSearch(e) {
    // resolves “Form submission canceled because the form is not connected” warning
    e.preventDefault();
    const { position__q } = this.state;
    // send any updates to q and location back to the Results container, and reset our page number
    this.props.onUpdate({ position__q: position__q.value });
  }
  changeText(type, e) {
    const { position__q } = this.state;
    this.setState({ [type]: { value: e.target.value } });
    this.props.onFilterChange({ position__q: position__q.value });
  }
  render() {
    const { defaultKeyword, isHomePage, labelSrOnly, placeholder, searchBarDisabled,
    searchBarDisabledPlaceholder } = this.props;
    return (
      <div className={`results-search-bar padded-main-content results-single-search ${!isHomePage ? 'homepage-offset' : ''}`}>
        <div className="usa-grid-full results-search-bar-container">
          <form className="usa-grid-full" onSubmit={this.submitSearch} >
            <fieldset className="usa-width-five-sixths">
              {
                !isHomePage &&
                  <legend className="usa-grid-full usa-sr-only">Search keyword and location</legend>
              }
              <div className="usa-width-one-whole search-results-inputs search-keyword">
                {
                  isHomePage && <legend className="usa-grid-full homepage-search-legend">Find your next position</legend>
                }
                <SearchBar
                  id="search-keyword-field"
                  label="Keywords"
                  type="medium"
                  submitText="Search"
                  labelSrOnly={labelSrOnly}
                  noForm
                  noButton
                  placeholder={searchBarDisabled ? searchBarDisabledPlaceholder : placeholder}
                  onChangeText={this.onChangeQueryText}
                  defaultValue={defaultKeyword}
                  inputDisabled={searchBarDisabled}
                />
                {
                  isHomePage && <div className="search-sub-text">Example: Abuja, Nigeria, Political Affairs (5505), Russian...</div>
                }
              </div>
            </fieldset>
            <div className="usa-width-one-sixth search-submit-button">
              <button className="usa-button" type="submit" disabled={searchBarDisabled}>
                <FontAwesome name="search" className="label-icon" />
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ResultsSearchHeader.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  defaultKeyword: PropTypes.string,
  labelSrOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  isHomePage: PropTypes.bool,
  searchBarDisabled: PropTypes.bool,
  searchBarDisabledPlaceholder: PropTypes.string,
};

ResultsSearchHeader.defaultProps = {
  onUpdate: EMPTY_FUNCTION,
  onFilterChange: EMPTY_FUNCTION,
  defaultKeyword: '',
  labelSrOnly: false,
  placeholder: 'Enter keywords...',
  isHomePage: false,
  searchBarDisabled: false,
  searchBarDisabledPlaceholder: 'Free text search is unavailable when searching Projected Vacancies',
};

export default ResultsSearchHeader;
