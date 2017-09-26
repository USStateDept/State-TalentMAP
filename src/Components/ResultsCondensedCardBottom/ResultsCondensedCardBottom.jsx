import React from 'react';
import CondensedCardData from '../CondensedCardData';
import BidListButton from '../BidListButton';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

const ResultsCondensedCardBottom = ({ position }) => (
  <div className="usa-grid-full condensed-card-bottom">
    <CondensedCardData position={position} />
    <div className="usa-grid-full">
      <BidListButton />
    </div>
  </div>
);

ResultsCondensedCardBottom.propTypes = {
  position: POSITION_DETAILS.isRequired,
};

ResultsCondensedCardBottom.defaultProps = {
  type: 'new',
};

export default ResultsCondensedCardBottom;
