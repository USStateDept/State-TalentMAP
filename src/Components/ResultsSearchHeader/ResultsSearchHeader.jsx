import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import SearchBar from '../SearchBar/SearchBar';

class ResultsSearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: { value: this.props.defaultKeyword || '' },
    };
  }
  changeText(type, e) {
    this.setState({ [type]: { value: e.target.value } });
  }
  submitSearch(e) {
    // resolves “Form submission canceled because the form is not connected” warning
    e.preventDefault();
    const { q } = this.state;
    // send any updates to q and location back to the Results container, and reset our page number
    this.props.onUpdate({ q: q.value });
  }
  render() {
    return (
      <div className="results-search-bar">
        <div className="usa-grid-full results-search-bar-container">
          <form className="usa-grid-full" onSubmit={e => this.submitSearch(e)} >
            <fieldset className="usa-width-five-sixths">
              <legend className="usa-grid-full usa-sr-only">Search keyword and location</legend>
              <div className="usa-width-one-whole search-results-inputs search-keyword">
                <SearchBar
                  id="search-keyword-field"
                  label={<div><FontAwesome name="search" className="label-icon" />Keywords</div>}
                  type="medium"
                  submitText="Search"
                  labelSrOnly={false}
                  noForm
                  noButton
                  placeholder="Location, Skill Code, Grade, Language, Position Number"
                  onChangeText={(e) => { this.changeText('q', e); }}
                  defaultValue={this.props.defaultKeyword}
                />
              </div>
            </fieldset>
            <div className="usa-width-one-sixth search-submit-button">
              <button className="usa-button" type="submit">
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
};

ResultsSearchHeader.defaultProps = {
  defaultKeyword: '',
  defaultLocation: '',
};

export default ResultsSearchHeader;
