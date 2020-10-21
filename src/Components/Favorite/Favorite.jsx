import { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from '../InteractiveElement';
import MediaQueryWrapper from '../MediaQuery';

import { FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import { existsInArray } from '../../utilities';

const Types = {
  SHORT: 0,
  LONG: 1,
  TITLE: 2,
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
    'Remove from Favorites',
  ],

  unchecked: [
    'Favorite',
    'Add to Favorites',
    'Add to Favorites',
  ],
};

const getText$ = (state, type) => Texts[state][type];

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.isLoading,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.loading && !nextProps.isLoading) {
      // Only update the loading state if current state.loading
      // and prop change detected is turning it off
      this.setState({
        loading: nextProps.isLoading,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let isUpdate = true;
    const { compareArray, refKey } = nextProps;
    const oldState = this.getSavedState();
    const newState = existsInArray(refKey, compareArray);

    isUpdate = (oldState !== newState) ||
    (this.state.loading !== nextState.isLoading) ||
    nextProps.hasErrored;

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
    const type = (useLongText || !enforceShort) ? Types.LONG : Types.SHORT;

    return hideText ? null : getText$(state, type);
  }

  get icon() {
    return this.getSavedState() ? 'trash' : 'star-o';
  }

  get title() {
    const state = this.getSavedState() ? States.CHECKED : States.UNCHECKED;
    return getText$(state, Types.TITLE);
  }

  get classNames() {
    const { hasBorder, useButtonClass, useButtonClassSecondary, hideText, className } = this.props;

    const classNames = ['favorite-container'];

    // Class configs
    if (hasBorder && !useButtonClass) {
      classNames.push('favorites-button-border');
    }

    if (useButtonClass) {
      classNames.push('usa-button');
    }

    if (useButtonClassSecondary) {
      classNames.push('usa-button-secondary');
    }

    if (hideText) {
      classNames.push('button-text-hidden');
    }

    classNames.push(className);

    return classNames;
  }

  get spinnerClass() {
    const { useButtonClass, useSpinnerWhite, useButtonClassSecondary } = this.props;
    let spinnerClass = 'ds-c-spinner';
    if (useButtonClass || useSpinnerWhite) {
      spinnerClass = `${spinnerClass} ${useButtonClassSecondary ? 'spinner-blue' : 'spinner-white'}`;
    }
    return spinnerClass;
  }

  toggleSaved = () => {
    const { onToggle, refKey, refresh, isTandem } = this.props;
    this.setState({
      loading: true,
      alertMessage: `You have ${this.getSavedState() ? 'removed' : 'added'}
        this position ${this.getSavedState() ? 'from' : 'to'} your favorites list.`,
    });

    // pass the key and the "remove" param
    onToggle(refKey, this.getSavedState(), refresh, isTandem);
  };

  render() {
    const { loading } = this.state;
    const { as: type } = this.props;

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

    options.className = this.classNames.join(' ').trim();

    return (
      <span>
        {
          this.state.alertMessage &&
          <span className="usa-sr-only" aria-live="polite" aria-atomic="true">{this.state.alertMessage}</span>
        }
        <InteractiveElement {...options}>
          {loading ?
            (<span className={this.spinnerClass} />) :
            (<FontAwesome name={icon} />)}
          <MediaQueryWrapper breakpoint="screenMdMax" widthType="max">
            {matches => (
              <span>{this.getText(matches)}</span>
            )}
          </MediaQueryWrapper>
        </InteractiveElement>
      </span>
    );
  }
}

Favorite.propTypes = {
  className: PropTypes.string,
  as: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  refKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string.isRequired]).isRequired,
  hideText: PropTypes.bool,
  compareArray: FAVORITE_POSITIONS_ARRAY.isRequired,
  isLoading: PropTypes.bool,
  hasBorder: PropTypes.bool,
  useLongText: PropTypes.bool,
  useButtonClass: PropTypes.bool,
  useButtonClassSecondary: PropTypes.bool,
  useSpinnerWhite: PropTypes.bool,
  refresh: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool,
  isTandem: PropTypes.bool,
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
  useButtonClassSecondary: false,
  useSpinnerWhite: false,
  refresh: false,
  hasErrored: false,
  isTandem: false,
};

export default Favorite;
