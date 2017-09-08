import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCardTop from '../ResultsCondensedCardTop';
import ResultsCondensedCardBottom from '../ResultsCondensedCardBottom';

const ResultsCondensedCard = ({ type }) => (
  <div className="usa-grid-full" style={{ marginBottom: '15px' }}>
    <ResultsCondensedCardTop type={type} />
    <div style={{ padding: '10px' }}>
      <ResultsCondensedCardBottom />
    </div>
  </div>
);

ResultsCondensedCard.propTypes = {
  type: PropTypes.string,
};

ResultsCondensedCard.defaultProps = {
  type: 'new',
};

export default ResultsCondensedCard;
