import React from 'react';
import ResultsNewFlag from '../ResultsNewFlag';
import Favorite from '../Favorite/Favorite';

const ResultsCondensedCardTop = () => (
  <div className="usa-grid-full">
    <div style={{ width: '48%', margin: '3px 0 0 1%', float: 'left' }}>
      <ResultsNewFlag />
    </div>
    <div style={{ width: '48%', margin: '3px 1% 0 0', float: 'left', textAlign: 'right' }}>
      <Favorite />
    </div>
    <div className="usa-width-one-whole">
      Last Updated:
    </div>
  </div>
);

export default ResultsCondensedCardTop;
