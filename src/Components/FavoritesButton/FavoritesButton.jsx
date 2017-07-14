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

  getSavedState() {
    return this.state.saved;
  }

  initSetSaved(val) {
    const saved = val;
    this.setState({ saved });
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
  }

  render() {
    let fromText = null;
    if (this.props.type === 'fav') {
      fromText = 'Favorites';
    } else if (this.props.type === 'compare') {
      fromText = 'Comparison';
    }
    const buttonClass = this.state.saved ? 'usa-button-secondary' : '';
    const buttonText = this.getSavedState() ? `Remove from ${fromText}` : `Add to ${fromText}`;
    return (
      <div>
        <button className={buttonClass} onClick={() => this.toggleSaved()}>
          {buttonText}
        </button>
      </div>
    );
  }
}

FavoritesButton.propTypes = {
  refKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

FavoritesButton.defaultProps = {
  iterator: 0,
};

export default FavoritesButton;
