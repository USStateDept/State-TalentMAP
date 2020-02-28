import React from 'react';
import PropTypes from 'prop-types';
import ResultsSearchHeader from '../../ResultsSearchHeader';

const BidderPortfolioSearch = ({ onUpdate }) => (
  <div className="bidder-portfolio-search-container">
    <div className="results-search-bar-container">
      <ResultsSearchHeader
        labelSrOnly
        legendSrOnly
        legend="Client search bar"
        placeholder="Client name, skill, grade, and location"
        onUpdate={onUpdate}
      />
    </div>
  </div>
);

BidderPortfolioSearch.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default BidderPortfolioSearch;
