import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from '../InteractiveElement';
import MediaQueryWrapper from '../MediaQuery';

import { FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import { existsInArray } from '../../utilities';

const Types = {
  SHORT: 0,
  LONG: 1,
};

const States = {
  UNCHECKED: 'unchecked',
  CHECKED: 'checked',
};

/**
 * @interface
 * interface Texts {
 *   [key: States]: [
 *    [key in Types]: string;
 *   ];
 * }
 */
const Texts = {
  checked: [
    'Remove',
    'Remove from Favorites',
  ],

  unchecked: [
    'Favorite',
    'Add to Favorites',
  ],
};

const getText$ = (state, type) => Texts[state][type];

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

  getText(enforceShort = false) {
    const { hideText, useLongText } = this.props;
    const checked = this.getSavedState();
    const state = checked ? States.CHECKED : States.UNCHECKED;
    const type = (useLongText && !enforceShort) ? Types.LONG : Types.SHORT;

    return hideText ? null : getText$(state, type);
  }

  get icon() {
    return this.getSavedState() ? 'star' : 'star-o';
  }

  get title() {
    const state = this.getSavedState() ? States.CHECKED : States.UNCHECKED;
    return getText$(state, Types.LONG);
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
      hasBorder,
      useButtonClass,
      useSpinnerWhite,
    } = this.props;

    const icon = this.icon;
    const title = this.title;
    const onClick = this.toggleSaved;
    const style = {
      pointerEvents: loading ? 'none' : 'inherit',
    };

    const options = {
      type,
      title,
      style,
      onClick,
    };

    let classNames = ['favorite-container'];

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

    options.className = classNames;
    let spinnerClass = 'ds-c-spinner';
    if (useButtonClass || useSpinnerWhite) {
      spinnerClass = `${spinnerClass} spinner-white`;
    }

    return (
      <InteractiveElement {...options}>
        {loading ?
          (<span className={spinnerClass} />) :
          (<FontAwesome name={icon} />)}
        <MediaQueryWrapper breakpoint="screenMdMax" widthType="max">
          {matches => (
            <span>{this.getText(matches)}</span>
          )}
        </MediaQueryWrapper>
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
