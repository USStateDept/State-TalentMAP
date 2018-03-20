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
    const { loading } = this.state;
    const {
      as: type,
      className,
      hideText,
      useLongText,
      hasBorder,
      useButtonClass,
      useSpinnerWhite,
    } = this.props;

    const style = {
      pointerEvents: loading ? 'none' : 'inherit',
    };

    const shortTextFavorite = 'Favorite';
    const longTextFavorite = 'Add to Favorites';
    const shortTextRemove = 'Remove';
    const longTextRemove = 'Remove from Favorites';

    let options = {};
    let classNames = ['favorite-container'];
    let favoriteText = shortTextFavorite;
    let removeText = shortTextRemove;

    if (useLongText) {
      favoriteText = longTextFavorite;
      removeText = longTextRemove;
    }

    // Set defaults
    let text = favoriteText;
    let title = 'Add to Favorites';
    let icon = 'star-o';

    // Update for saved state
    const savedState = this.getSavedState();
    if (savedState) {
      text = removeText;
      title = 'Remove from Favorites';
      icon = 'star';
    }

    // Text configs
    if (hideText) {
      text = null;
    }

    // Class configs
    if (hasBorder && !useButtonClass) {
      classNames.push('favorites-button-border');
    }

    if (useButtonClass) {
      classNames.push('usa-button');
    }

    classNames.push(className);
    classNames = classNames
      .join(' ')
      .trim();

    let spinnerClass = 'ds-c-spinner';
    if (useButtonClass || useSpinnerWhite) {
      spinnerClass = `${spinnerClass} spinner-white`;
    }

    options = {
      type,
      title,
      style,
      className: classNames,
      onClick: this.toggleSaved,
    };

    return (
      <InteractiveElement {...options}>
        {loading ?
          (<span className={spinnerClass} />) :
          (<FontAwesome name={icon} />)} {text}
      </InteractiveElement>
    );
  }
}

Favorite.propTypes = {
  className: PropTypes.string,
  as: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  refKey: PropTypes.node.isRequired,
  hideText: PropTypes.bool,
  compareArray: FAVORITE_POSITIONS_ARRAY.isRequired,
  isLoading: PropTypes.bool,
  hasBorder: PropTypes.bool,
  useLongText: PropTypes.bool,
  useButtonClass: PropTypes.bool,
  useSpinnerWhite: PropTypes.bool,
};

Favorite.defaultProps = {
  className: '',
  as: 'div',
  hideText: false,
  isLoading: false,
  compareArray: [],
  hasBorder: false,
  useLongText: false,
  useButtonClass: false,
  useSpinnerWhite: false,
};

export default Favorite;
