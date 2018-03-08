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
    const { useLongText } = this.props;

    const shortTextFavorite = 'Favorite';
    const longTextFavorite = 'Add to Favorites';
    const shortTextRemove = 'Remove';
    const longTextRemove = 'Remove from Favorites';

    let favoriteText = shortTextFavorite;
    let removeText = shortTextRemove;

    if (useLongText) {
      favoriteText = longTextFavorite;
      removeText = longTextRemove;
    }

    // set defaults
    let text = favoriteText;
    let title = 'Add to Favorites';
    let iconClass = 'star-o';

    // update for saved state
    if (this.getSavedState()) {
      text = removeText;
      title = 'Remove from Favorites';
      iconClass = 'star';
    }

    const style = {
      pointerEvents: this.props.isLoading ? 'none' : 'inherit',
    };
    const borderClass = this.props.hasBorder && !this.props.useButtonClass ? 'favorites-button-border' : '';
    const buttonClass = this.props.useButtonClass ? 'usa-button' : '';
    return (
      <InteractiveElement
        type="div"
        title={title}
        style={style}
        className={`favorite-container ${borderClass} ${buttonClass}`}
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
  useLongText: PropTypes.bool,
  useButtonClass: PropTypes.bool,
};

Favorite.defaultProps = {
  hideText: false,
  isLoading: false,
  compareArray: [],
  hasBorder: false,
  useLongText: false,
  useButtonClass: false,
};

export default Favorite;
