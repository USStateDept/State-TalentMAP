import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

const ResultsCondensedCardTop = ({ position }) => (
  <div className="usa-grid-full condensed-card-top">
    <div className="usa-grid-full condensed-card-top-header-container">
      <div
        className={
          'usa-width-one-whole condensed-card-top-header condensed-card-top-header-left'
        }
      >
        {position.title}
      </div>
      <div
        className="usa-width-one-whole condensed-card-top-header"
      >
        Grade: {position.grade}
      </div>
    </div>
  </div>
);

ResultsCondensedCardTop.propTypes = {
  position: POSITION_DETAILS.isRequired,
};

export default ResultsCondensedCardTop;
