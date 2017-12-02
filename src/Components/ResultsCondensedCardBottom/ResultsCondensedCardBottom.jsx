import React from 'react';
import PropTypes from 'prop-types';
import CondensedCardData from '../CondensedCardData';
import BidListButton from '../BidListButton';
import { POSITION_DETAILS, BID_RESULTS } from '../../Constants/PropTypes';

const ResultsCondensedCardBottom = ({ position, toggleBid, bidList }) => (
  <div className="usa-grid-full condensed-card-bottom">
    <CondensedCardData position={position} />
    <BidListButton
      className="white-button"
      id={position.id}
      compareArray={bidList}
      toggleBidPosition={toggleBid}
    />
  </div>
);

ResultsCondensedCardBottom.propTypes = {
  position: POSITION_DETAILS.isRequired,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

ResultsCondensedCardBottom.defaultProps = {
  type: 'new',
};

export default ResultsCondensedCardBottom;
