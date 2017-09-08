import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import SearchBar from '../SearchBar/SearchBar';

class ResultsSearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: { value: this.props.defaultKeyword || '' },
      location: { value: this.props.defaultLocation || '' },
    };
  }
  changeText(type, e) {
    this.setState({ [type]: { value: e.target.value } });
  }
  submitSearch(e) {
    // resolves “Form submission canceled because the form is not connected” warning
    e.preventDefault();
    const { q, location } = this.state;
    // send any updates to q and location back to the Results container, and reset our page number
    this.props.queryParamUpdate({ q: q.value, location: location.value });
  }
  render() {
    return (
      <div className="results-search-bar">
        <div className="usa-grid-full results-search-bar-container">
          <form onSubmit={e => this.submitSearch(e)} >
            <fieldset className="usa-width-five-sixths">
              <legend className="usa-sr-only">Search keyword and location</legend>
              <div className="usa-width-one-half search-results-inputs search-keyword" style={{ float: 'left', padding: '15px' }}>
                <SearchBar
                  id="search-keyword-field"
                  label={<div><FontAwesome name="search" style={{ marginRight: '10px' }} />Keywords</div>}
                  type="medium"
                  submitText="Search"
                  labelSrOnly={false}
                  noForm
                  noButton
                  placeholder="Skill code, Grade Code, Language, Post Name"
                  onChangeText={(e) => { this.changeText('q', e); }}
                  defaultValue={this.props.defaultKeyword}
                />
              </div>
              <div className="usa-width-one-half search-results-inputs search-location" style={{ float: 'left', padding: '15px' }}>
                <SearchBar
                  id="search-location-field"
                  label={<div><FontAwesome name="map-marker" style={{ marginRight: '10px' }} />Location</div>}
                  type="medium"
                  submitText="Search"
                  labelSrOnly={false}
                  noForm
                  noButton
                  placeholder="City, State, or Country"
                  onChangeText={(e) => { this.changeText('location', e); }}
                  defaultValue={this.props.defaultLocation}
                />
              </div>
            </fieldset>
            <div className="usa-width-one-sixth search-submit-button">
              <button className="usa-button" type="submit">Search</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ResultsSearchHeader.propTypes = {
  queryParamUpdate: PropTypes.func.isRequired,
  defaultKeyword: PropTypes.string,
  defaultLocation: PropTypes.string,
};

ResultsSearchHeader.defaultProps = {
  defaultKeyword: '',
  defaultLocation: '',
};

export default ResultsSearchHeader;
