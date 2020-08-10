import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import SearchBar from 'Components/SearchBar/SearchBar';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';


const PositionManagerSearch = props => {
  const [q, setQ] = useState('');

  function changeText(e) {
    setQ(e.target.value);
  }
  function onClear() {
    setQ('');
    props.submitSearch('');
  }

  function submitForm(e) {
    // resolves “Form submission canceled because the form is not connected” warning
    if (e && e.preventDefault) { e.preventDefault(); }
    props.submitSearch(q);
  }

  return (
    <form className="usa-grid-full">
      <fieldset className="usa-width-five-sixths">
        <div className="usa-width-one-whole search-results-inputs search-keyword">
          <legend className="usa-grid-full homepage-search-legend">Search for a position</legend>
          <SearchBar
            id="bureau-search-keyword-field"
            defaultValue=""
            label="Keywords"
            labelSrOnly
            noButton
            noForm
            onChangeText={changeText}
            onClear={onClear}
            placeholder="Type keywords here"
            showClear
            submitText="Search"
            type="medium"
          />
        </div>
      </fieldset>
      <div className="usa-width-one-sixth search-submit-button">
        <button className="usa-button" type="submit" onClick={submitForm}>
          <FontAwesome name="search" className="label-icon" />
                Search
        </button>
      </div>
    </form>
  );
};

PositionManagerSearch.propTypes = {
  submitSearch: PropTypes.func,
};

PositionManagerSearch.defaultProps = {
  submitSearch: EMPTY_FUNCTION,
};

export default PositionManagerSearch;
