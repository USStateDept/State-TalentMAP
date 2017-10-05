import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { existsInNestedObject } from '../../utilities';
import { BID_RESULTS } from '../../Constants/PropTypes';

class BidListButton extends Component {

  constructor(props) {
    super(props);
    this.toggleSaved = this.toggleSaved.bind(this);
  }

  getSavedState() {
    // Is the id in the array? If so, return true
    const { compareArray, id } = this.props;
    return existsInNestedObject(id, compareArray);
  }

  toggleSaved() {
    const { toggleBidPosition, id } = this.props;
    // pass the id and the "remove" param
    toggleBidPosition(id, this.getSavedState());
  }

  render() {
    const text = this.getSavedState() ? 'Remove from Bid List' : 'Add to Bid List';
    const iconClass = this.getSavedState() ? 'minus-circle' : 'plus-circle';
    const style = {
      pointerEvents: this.props.isLoading ? 'none' : 'inherit',
    };
    return (
      <button className="bid-list-button" style={style} onClick={this.toggleSaved}>
        <span className="button-icon">
          <FontAwesome name={iconClass} />
        </span>
        <span>{text}</span>
      </button>
    );
  }
}

BidListButton.propTypes = {
  id: PropTypes.number.isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
  compareArray: BID_RESULTS,
  isLoading: PropTypes.bool,
};

BidListButton.defaultProps = {
  compareArray: [],
  isLoading: false,
};

export default BidListButton;
