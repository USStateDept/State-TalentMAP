import { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { get } from 'lodash';
import { existsInNestedObject } from '../../utilities';
import { BID_RESULTS } from '../../Constants/PropTypes';

class BidListButton extends Component {
  getBidData = () => {
    const { compareArray, id } = this.props;
    const exists = existsInNestedObject(id, compareArray);
    return {
      isSaved: exists,
      canDelete: get(exists, 'can_delete', true),
    };
  };

  get style() {
    return {
      pointerEvents: this.props.isLoading ? 'none' : 'inherit',
    };
  }

  toggleSaved = () => {
    const { disabled, toggleBidPosition, id, isLoading } = this.props;
    const { isSaved } = this.getBidData();
    // pass the id and the "remove" param
    if (!isLoading && !disabled) {
      toggleBidPosition(id, isSaved);
    }
  };

  render() {
    // is the bid currently saved?
    // save value and avoid interrogating the array more than once
    const { isSaved, canDelete } = this.getBidData();
    const { isClient } = this.context;
    const isClientText = isClient ? ' Client' : '';
    const text = isSaved ? `Remove from${isClientText} Bid List` : `Add to${isClientText} Bid List`;
    const iconClass = isSaved ? 'trash' : 'plus-circle';
    const { className, disabled, isLoading } = this.props;

    const disabled$ = disabled || !canDelete;
    const disabledClass = disabled$ ? 'usa-button-disabled' : '';
    return (
      <button className={`${disabledClass} ${className}`} style={this.style} onClick={this.toggleSaved} disabled={disabled$}>
        <span className="button-icon">
          {isLoading ?
            (<span className="ds-c-spinner spinner-white" />) :
            (<FontAwesome name={iconClass} />)}
        </span>
        <span>{text}</span>
      </button>
    );
  }
}

BidListButton.contextTypes = {
  isClient: PropTypes.bool,
};

BidListButton.propTypes = {
  id: PropTypes.number.isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
  compareArray: BID_RESULTS,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

BidListButton.defaultProps = {
  compareArray: [],
  isLoading: false,
  className: 'bid-list-button',
  disabled: false,
};

export default BidListButton;
