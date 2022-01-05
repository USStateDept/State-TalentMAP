import { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import SearchBar from '../SearchBar/SearchBar';

class ResultsSearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: { value: this.props.defaultKeyword || '' },
    };
  }

  onChangeQueryText = e => {
    this.changeText('q', e);
  };

  onClear = () => {
    this.changeText('q', { target: { value: '' } }, () => this.submitSearch());
  };

  getValue = () => this.state.q.value;

  submitSearch = e => {
    // resolves “Form submission canceled because the form is not connected” warning
    if (e && e.preventDefault) { e.preventDefault(); }
    const { q } = this.state;
    // send any updates to q and location back to the Results container, and reset our page number
    this.props.onUpdate({ q: q.value });
  };

  changeText(type, e, cb = EMPTY_FUNCTION) {
    const { q } = this.state;
    this.setState({ [type]: { value: e.target.value } }, () => {
      this.props.onFilterChange({ q: q.value });
      cb();
    });
  }

  render() {
    const { defaultKeyword, isHomePage, placeholder, searchBarDisabled,
      searchBarDisabledPlaceholder, legend, legendSrOnly } = this.props;
    return (
      <div className={`results-search-bar padded-main-content results-single-search ${!isHomePage ? 'homepage-offset' : ''}`}>
        <div className="usa-grid-full results-search-bar-container">
          <form className="usa-grid-full" onSubmit={this.submitSearch} >
            <fieldset className="usa-width-five-sixths">
              <div className="usa-width-one-whole search-results-inputs search-keyword">
                <legend className={`usa-grid-full homepage-search-legend ${legendSrOnly ? 'usa-sr-only' : ''}`}>{legend}</legend>
                <SearchBar
                  id="search-keyword-field"
                  label="Keywords"
                  type="medium"
                  submitText="Search"
                  labelSrOnly
                  noForm
                  noButton
                  placeholder={searchBarDisabled ? searchBarDisabledPlaceholder : placeholder}
                  onChangeText={this.onChangeQueryText}
                  defaultValue={defaultKeyword}
                  inputDisabled={searchBarDisabled}
                  showClear
                  onClear={this.onClear}
                  ref={(ref) => { this.searchBarRef = ref; }}
                />
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
  placeholder: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  isHomePage: PropTypes.bool,
  searchBarDisabled: PropTypes.bool,
  searchBarDisabledPlaceholder: PropTypes.string,
  legend: PropTypes.string,
  legendSrOnly: PropTypes.bool,
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
  legend: 'Find your next position',
  legendSrOnly: false,
};

export default ResultsSearchHeader;
