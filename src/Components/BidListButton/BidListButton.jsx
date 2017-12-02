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

  getIsSaved() {
    // Is the id in the array? If so, return true
    const { compareArray, id } = this.props;
    return existsInNestedObject(id, compareArray);
  }

  toggleSaved() {
    const { toggleBidPosition, id } = this.props;
    // pass the id and the "remove" param
    toggleBidPosition(id, this.getIsSaved());
  }

  render() {
    // is the bid currently saved?
    // save value and avoid interrogating the array more than once
    const bidIsSaved = this.getIsSaved();
    const text = bidIsSaved ? 'Remove from Bid List' : 'Add to Bid List';
    const iconClass = bidIsSaved ? 'minus-circle' : 'plus-circle';
    const style = {
      pointerEvents: this.props.isLoading ? 'none' : 'inherit',
    };
    const { className } = this.props;
    return (
      <button className={className} style={style} onClick={this.toggleSaved}>
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
  className: PropTypes.string,
};

BidListButton.defaultProps = {
  compareArray: [],
  isLoading: false,
  className: 'bid-list-button',
};

export default BidListButton;
