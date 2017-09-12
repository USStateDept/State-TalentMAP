import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCardTop from '../ResultsCondensedCardTop';
import ResultsCondensedCardBottom from '../ResultsCondensedCardBottom';

const ResultsCondensedCard = ({ type }) => (
  <div className="usa-grid-full condensed-card-inner">
    <ResultsCondensedCardTop type={type} />
    <div className="condensed-card-bottom-container">
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
