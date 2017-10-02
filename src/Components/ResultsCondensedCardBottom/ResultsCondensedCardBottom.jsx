import React from 'react';
import CondensedCardData from '../CondensedCardData';
import ViewDetailsButton from '../ViewDetailsButton/ViewDetailsButton';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

const ResultsCondensedCardBottom = ({ position }) => (
  <div className="usa-grid-full condensed-card-bottom">
    <CondensedCardData position={position} />
    <ViewDetailsButton id={position.position_number} />
  </div>
);

ResultsCondensedCardBottom.propTypes = {
  position: POSITION_DETAILS.isRequired,
};

ResultsCondensedCardBottom.defaultProps = {
  type: 'new',
};

export default ResultsCondensedCardBottom;
