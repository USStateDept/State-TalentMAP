import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import { existsInArray } from '../../utilities';
import InteractiveElement from '../InteractiveElement';

class Favorite extends Component {

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
    const text = this.getSavedState() ? 'Remove' : 'Favorite';
    const title = this.getSavedState() ? 'Remove from Favorites' : 'Add to Favorites';
    const iconClass = this.getSavedState() ? 'heart' : 'heart-o';
    const style = {
      pointerEvents: this.props.isLoading ? 'none' : 'inherit',
    };
    const borderClass = this.props.hasBorder ? 'favorites-button-border' : '';
    return (
      <InteractiveElement
        type="div"
        title={title}
        style={style}
        className={`favorite-container ${borderClass}`}
        onClick={this.toggleSaved}
      >
        <FontAwesome name={iconClass} /> {this.props.hideText ? null : text}
      </InteractiveElement>
    );
  }
}

Favorite.propTypes = {
  onToggle: PropTypes.func.isRequired,
  refKey: PropTypes.node.isRequired,
  hideText: PropTypes.bool,
  compareArray: FAVORITE_POSITIONS_ARRAY.isRequired,
  isLoading: PropTypes.bool,
  hasBorder: PropTypes.bool,
};

Favorite.defaultProps = {
  hideText: false,
  isLoading: false,
  compareArray: [],
  hasBorder: false,
};

export default Favorite;
