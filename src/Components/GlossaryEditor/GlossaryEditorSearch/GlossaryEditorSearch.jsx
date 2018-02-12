import React from 'react';
import PropTypes from 'prop-types';
import ResultsSearchHeader from '../../ResultsSearchHeader';

const GlossaryEditorSearch = ({ onUpdate }) => (
  <div className="bidder-portfolio-search-container">
    <div className="results-search-bar-container">
      <ResultsSearchHeader
        labelSrOnly
        placeholder="Search for Glossary terms"
        onUpdate={onUpdate}
      />
    </div>
  </div>
);

GlossaryEditorSearch.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default GlossaryEditorSearch;
