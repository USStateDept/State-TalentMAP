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

    this.state = {
      loading: props.isLoading,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let isUpdate = true;

    const { compareArray, refKey } = nextProps;
    const oldState = this.getSavedState();
    const newState = existsInArray(refKey, compareArray);

    if (this.state.loading && !nextProps.isLoading) {
      // Only update the loading state if current state.loading
      // and prop change detected is turning it off
      this.setState({
        loading: nextProps.isLoading,
      });
    }

    isUpdate = (oldState !== newState) ||
               (this.state.loading !== nextState.isLoading);

    return isUpdate;
  }

  getSavedState() {
    // Is the refKey in the array? If so, return true
    const { compareArray, refKey } = this.props;
    return existsInArray(refKey, compareArray);
  }

  toggleSaved() {
    const { onToggle, refKey } = this.props;

    this.setState({
      loading: true,
    });

    // pass the key and the "remove" param
    onToggle(refKey, this.getSavedState());
  }

  render() {
    const { hideText, useLongText, hasBorder, useButtonClass } = this.props;
    const { loading } = this.state;

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
    const savedState = this.getSavedState();
    if (savedState) {
      text = removeText;
      title = 'Remove from Favorites';
      iconClass = 'star';
    }
    if (hideText) {
      text = null;
    }

    const style = {
      pointerEvents: 'inherit',
    };

    if (loading) { style.pointerEvents = 'none'; }

    let borderClass = '';
    const hasBorderNoButtonClass = hasBorder && !useButtonClass;
    if (hasBorderNoButtonClass) { borderClass = 'favorites-button-border'; }

    let buttonClass = '';
    if (useButtonClass) { buttonClass = 'usa-button'; }

    let spinnerClass = 'ds-c-spinner';
    if (useButtonClass) { spinnerClass = `${spinnerClass} spinner-white`; }

    const interactiveElementClass = `favorite-container ${borderClass} ${buttonClass}`;

    return (
      <InteractiveElement
        type="div"
        title={title}
        style={style}
        className={interactiveElementClass}
        onClick={this.toggleSaved}
      >
        {loading && <span className={spinnerClass} />}
        {!loading && <FontAwesome name={iconClass} />}
        {text}
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
