import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { localStorageFetchValue, localStorageToggleValue } from '../../utilities';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import COMPARE_LIMIT from '../../Constants/Compare';
import InteractiveElement from '../InteractiveElement';

class CompareCheck extends Component {
  constructor(props) {
    super(props);
    this.toggleSaved = this.toggleSaved.bind(this);
    this.state = {
      saved: false,
      localStorageKey: null,
      count: 0,
    };
  }

  componentWillMount() {
    const localStorageKey = this.props.type;
    this.setState({ localStorageKey });
  }

  componentDidMount() {
    this.getSaved();
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

  toggleSaved() {
    if (!this.isDisabled()) {
      localStorageToggleValue(this.state.localStorageKey, this.props.refKey);
      this.setState({ saved: !this.state.saved });
      this.onToggle();
    }
  }

  render() {
    let text = 'Compare Position';
    if (this.isDisabled()) { text = 'Limit reached'; }
    const iconClass = this.getSavedState() ? 'check-square-o' : 'square-o';
    return (
      <InteractiveElement
        type="div"
        className="compare-check-box-container"
        onClick={this.toggleSaved}
      >
        <FontAwesome name={iconClass} /> {text}
      </InteractiveElement>
    );
  }
}

CompareCheck.propTypes = {
  refKey: PropTypes.string.isRequired,
  type: PropTypes.string,
  limit: PropTypes.number,
  onToggle: PropTypes.func,
};

CompareCheck.defaultProps = {
  type: 'compare',
  limit: COMPARE_LIMIT,
  onToggle: EMPTY_FUNCTION,
};

export default CompareCheck;
