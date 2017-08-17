import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { localStorageFetchValue, localStorageToggleValue } from '../../utilities';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class FavoritesButton extends Component {
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

  toggleSaved() {
    localStorageToggleValue(this.state.localStorageKey, this.props.refKey);
    this.setState({ saved: !this.state.saved });
    this.onToggle();
  }

  render() {
    let fromText = null;
    if (this.props.type === 'fav') {
      fromText = 'Favorites';
    } else if (this.props.type === 'compare') {
      fromText = 'Comparison';
    }
    let buttonClass = this.state.saved ? 'usa-button-secondary' : '';
    buttonClass = this.exceedsLimit() && !this.state.saved ? 'usa-button-disabled' : buttonClass;
    const buttonText = this.getSavedState() ? `Remove from ${fromText}` : `Add to ${fromText}`;
    const disabled = this.exceedsLimit() && !this.state.saved;
    return (
      <div>
        <button
          disabled={disabled}
          className={buttonClass}
          onClick={() => this.toggleSaved()}
        >
          {buttonText}
        </button>
      </div>
    );
  }
}

FavoritesButton.propTypes = {
  refKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  limit: PropTypes.number,
  onToggle: PropTypes.func,
};

FavoritesButton.defaultProps = {
  limit: 99,
  onToggle: EMPTY_FUNCTION,
};

export default FavoritesButton;
