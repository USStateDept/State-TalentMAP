import React from 'react';
import PropTypes from 'prop-types';
import ResultsSearchHeader from '../../ResultsSearchHeader';
import CDOAutoSuggest from '../CDOAutoSuggest';

const BidderPortfolioSearch = ({ onUpdate }) => (
  <div className="bidder-portfolio-search-container">
    <div className="usa-grid-full">
      <CDOAutoSuggest />
    </div>
    <div className="results-search-bar-container">
      <ResultsSearchHeader
        labelSrOnly
        placeholder="Search Bidder Last Name, Skill"
        onUpdate={onUpdate}
      />
    </div>
  </div>
);

BidderPortfolioSearch.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default BidderPortfolioSearch;
