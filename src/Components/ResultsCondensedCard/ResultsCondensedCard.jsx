import React from 'react';
import ResultsCondensedCardTop from '../ResultsCondensedCardTop';
import ResultsCondensedCardBottom from '../ResultsCondensedCardBottom';

const ResultsCondensedCard = () => (
  <div className="usa-grid-full" style={{ border: 'solid 1px black' }}>
    <ResultsCondensedCardTop />
    <ResultsCondensedCardBottom />
  </div>
);

export default ResultsCondensedCard;
