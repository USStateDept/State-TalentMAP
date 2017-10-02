import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import { existsInArray } from '../../utilities';

class FavoritesButton extends Component {
  constructor(props) {
    super(props);
    this.toggleSaved = this.toggleSaved.bind(this);
  }

  getSavedState() {
    // Is the refKey in the array? If so, return true
    const { compareArray, refKey } = this.props;
    return existsInArray(refKey, compareArray);
  }

  toggleSaved() {
    const { onToggle, refKey } = this.props;
    // pass the key and the "remove" param
    onToggle(refKey, this.getSavedState());
  }

  render() {
    const fromText = 'Favorites';
    const savedState = this.getSavedState();
    const buttonClass = savedState ? 'usa-button-secondary' : '';
    const buttonText = savedState ? `Remove from ${fromText}` : `Add to ${fromText}`;
    const style = {
      pointerEvents: this.props.isLoading ? 'none' : 'inherit',
      cursor: 'pointer',
    };
    return (
      <div style={style}>
        <button
          disabled={this.props.isLoading}
          className={buttonClass}
          onClick={this.toggleSaved}
        >
          {buttonText}
        </button>
      </div>
    );
  }
}

FavoritesButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  refKey: PropTypes.number.isRequired,
  compareArray: FAVORITE_POSITIONS_ARRAY.isRequired,
  isLoading: PropTypes.bool,
};

FavoritesButton.defaultProps = {
  hideText: false,
  isLoading: false,
  compareArray: [],
};

export default FavoritesButton;
