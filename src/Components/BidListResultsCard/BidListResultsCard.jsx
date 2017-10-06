import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_PARENT_OBJECT } from '../../Constants/PropTypes';

class BidListResultsCard extends Component {
  constructor(props) {
    super(props);
    this.toggleBidPosition = this.toggleBidPosition.bind(this);
  }
  toggleBidPosition() {
    const { bid, toggleBidPosition } = this.props;
    toggleBidPosition(bid.position.id, true);
  }
  render() {
    const { bid } = this.props;
    return (
      <div className="usa-grid-full saved-search-card" key={bid.id}>
        <div className="usa-grid-full">
          <div className="usa-width-one-whole saved-search-card-name">
        Position:&nbsp;
          <Link to={`/details/${bid.position.position_number}`}>
            {bid.position.position_number} - {bid.position.title}
          </Link>
          </div>
        </div>
        <div className="usa-width-one-whole bid-list-delete-button-container">
          <button
            className="usa-button-secondary"
            onClick={this.toggleBidPosition}
            title="Delete this position from your bid list"
          >
        Delete
      </button>
        </div>
      </div>
    );
  }
}

BidListResultsCard.propTypes = {
  bid: SAVED_SEARCH_PARENT_OBJECT.isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
};

export default BidListResultsCard;
