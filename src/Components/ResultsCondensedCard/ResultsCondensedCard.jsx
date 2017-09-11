import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCardTop from '../ResultsCondensedCardTop';
import ResultsCondensedCardBottom from '../ResultsCondensedCardBottom';

const ResultsCondensedCard = ({ type, position }) => (
  <div className="usa-grid-full condensed-card-inner">
    <ResultsCondensedCardTop position={position} type={type} />
    <div className="condensed-card-bottom-container">
      <ResultsCondensedCardBottom position={position} />
    </div>
  </div>
);

ResultsCondensedCard.propTypes = {
  type: PropTypes.string,
  position: PropTypes.shape({}).isRequired,
};

ResultsCondensedCard.defaultProps = {
  type: 'new',
};

export default ResultsCondensedCard;
