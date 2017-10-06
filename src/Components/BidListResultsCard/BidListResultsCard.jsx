import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_PARENT_OBJECT } from '../../Constants/PropTypes';

const BidListResultsCard = ({ bid, toggleBidPosition }) => (
  <div className="usa-grid-full saved-search-card" key={bid.id}>
    <div className="usa-grid-full">
      <div className="usa-width-one-whole saved-search-card-name">
        Position:&nbsp;
          <Link to={`/details/${bid.position.position_number}`}>
            {bid.position.position_number} - {bid.position.title}
          </Link>
      </div>
    </div>
    <div className="usa-width-one-whole">
      <button
        style={{ marginTop: '.5em' }}
        className="usa-button-secondary"
        onClick={() => toggleBidPosition(bid.position.id, true)}
      >
        Delete
      </button>
    </div>
  </div>
);

BidListResultsCard.propTypes = {
  bid: SAVED_SEARCH_PARENT_OBJECT.isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
};

export default BidListResultsCard;
