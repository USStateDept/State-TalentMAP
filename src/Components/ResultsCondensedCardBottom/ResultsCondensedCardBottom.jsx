import React from 'react';
import PropTypes from 'prop-types';
import CondensedCardData from '../CondensedCardData';
import BidListButton from '../BidListButton';

const ResultsCondensedCardBottom = ({ position }) => (
  <div className="usa-grid-full condensed-card-bottom">
    <CondensedCardData position={position} />
    <BidListButton />
  </div>
);

ResultsCondensedCardBottom.propTypes = {
  position: PropTypes.shape({}).isRequired,
};

ResultsCondensedCardBottom.defaultProps = {
  type: 'new',
  position: {},
};

export default ResultsCondensedCardBottom;
