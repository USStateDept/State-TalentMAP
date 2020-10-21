import { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { localStorageFetchValue, localStorageToggleValue } from '../../utilities';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import COMPARE_LIMIT from '../../Constants/Compare';
import InteractiveElement from '../InteractiveElement';
import Icon from './Icon';

class CompareCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      localStorageKey: null,
      count: 0,
    };
  }

  UNSAFE_componentWillMount() {
    const localStorageKey = this.props.type;
    this.setState({ localStorageKey });

    // add listener on localStorage 'compare' key
    window.addEventListener('compare-ls', this.eventListener);
  }

  componentDidMount() {
    this.getSaved();
  }

  componentWillUnmount() {
    window.removeEventListener('compare-ls', this.eventListener);
  }

  onToggle() {
    this.props.onToggle();
  }

  getSaved() {
    const saved = localStorageFetchValue(this.state.localStorageKey, this.props.refKey);
    this.setState({ saved: saved.exists, count: saved.count });
  }

  getSavedState() {
    return this.state.saved;
  }

  exceedsLimit() {
    return this.state.count >= this.props.limit;
  }

  isDisabled() {
    return this.exceedsLimit() && !this.state.saved;
  }

  toggleSaved = () => {
    if (!this.isDisabled()) {
      localStorageToggleValue(this.state.localStorageKey, this.props.refKey);
      this.setState({ saved: !this.state.saved });
      this.onToggle();
    }
  };

  eventListener = () => {
    this.getSaved();
  };

  // eslint-disable-next-line class-methods-use-this
  joinClassNames(className) {
    return className
      .join(' ')
      .trim();
  }

  render() {
    const { className, customElement, as: type, interactiveElementProps } = this.props;
    const isChecked = this.getSavedState();
    const options = {
      type,
      className: [className, 'compare-check-box-container', isChecked ? 'compare-checked' : 'compare-not-checked'],
      onClick: this.toggleSaved,
      ...interactiveElementProps,
    };

    let text = 'Compare';
    let icon = <FontAwesome name="square-o" />;

    if (isChecked) {
      options.className.push('usa-button-active');
      icon = <Icon />;
    }

    if (this.isDisabled()) {
      options.disabled = true;
      text = 'Limit Reached';
    }

    options.className = this.joinClassNames(options.className);

    return (
      customElement ?
        <InteractiveElement {...options}>
          {customElement}
        </InteractiveElement>
        :
        <InteractiveElement {...options}>
          {
            !this.isDisabled() &&
            icon
          } {text}
        </InteractiveElement>
    );
  }
}

CompareCheck.propTypes = {
  className: PropTypes.string,
  as: PropTypes.string.isRequired,
  refKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  type: PropTypes.string,
  limit: PropTypes.number,
  onToggle: PropTypes.func,
  customElement: PropTypes.node,
  interactiveElementProps: PropTypes.shape({}),
};

CompareCheck.defaultProps = {
  className: '',
  as: 'div',
  type: 'compare',
  limit: COMPARE_LIMIT,
  onToggle: EMPTY_FUNCTION,
  customElement: null,
  interactiveElementProps: {},
};

export default CompareCheck;
