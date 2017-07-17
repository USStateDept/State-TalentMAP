import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FavoritesButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      localStorageKey: null,
    };
  }

  componentWillMount() {
    const localStorageKey = this.props.type;
    this.setState({ localStorageKey });
  }

  componentDidMount() {
    const retrievedKey = localStorage
                          .getItem(this.state.localStorageKey);
    let parsedKey = JSON.parse(retrievedKey);
    const arrayExists = Array.isArray(parsedKey);
    if (!arrayExists) {
      localStorage.setItem(this.state.localStorageKey,
        JSON.stringify([]));
      parsedKey = localStorage
                   .getItem(this.state.localStorageKey);
    }
    const refIsSaved = parsedKey.indexOf(this.props.refKey);
    if (refIsSaved !== -1) {
      const saved = true;
      this.initSetSaved(saved);
    }
  }

  onToggle() {
    this.props.onToggle();
  }

  getSavedState() {
    return this.state.saved;
  }

  initSetSaved(val) {
    const saved = val;
    this.setState({ saved });
  }

  exceedsLimit() {
    let result = false;
    if (this.props.limit) {
      const key = localStorage
                        .getItem(this.state.localStorageKey);
      const parsedKey = JSON.parse(key);
      if (parsedKey && parsedKey.length >= this.props.limit) {
        result = true;
      }
    }
    return result;
  }

  toggleSaved() {
    const existingArray = JSON.parse(localStorage
                           .getItem(this.state.localStorageKey));
    const indexOfId = existingArray.indexOf(this.props.refKey);
    if (this.state.saved) {
      existingArray.splice(indexOfId, 1);
      localStorage.setItem(this.state.localStorageKey,
        JSON.stringify(existingArray));
    } else {
      existingArray.push(this.props.refKey);
      localStorage.setItem(this.state.localStorageKey,
        JSON.stringify(existingArray));
    }
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
  onToggle: () => {},
};

export default FavoritesButton;
