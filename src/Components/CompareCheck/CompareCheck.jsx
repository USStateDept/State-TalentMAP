import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { localStorageFetchValue, localStorageToggleValue } from '../../utilities';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class CompareCheck extends Component {
  constructor(props) {
    super(props);
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
    let text = this.getSavedState() ? 'Remove' : 'Compare Position';
    if (this.isDisabled()) { text = 'Limit reached'; }
    const iconClass = this.getSavedState() ? 'check-square-o' : 'square-o';
    return (
      // At the time of writing, CodeClimate's version of eslint-a11y-plugin
      // did not take role="button" into account with the following error:
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div tabIndex="0" role="button" style={{ cursor: 'pointer' }} onClick={() => this.toggleSaved()} >
        <FontAwesome name={iconClass} /> {text}
      </div>
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
  limit: 2,
  onToggle: EMPTY_FUNCTION,
};

export default CompareCheck;
