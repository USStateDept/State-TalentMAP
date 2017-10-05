import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class ResetComparisons extends Component {

  render() {
    const exists = () => {
      let result = false;
      const retrievedKey = localStorage
                            .getItem('compare');
      const parsedKey = JSON.parse(retrievedKey);
      if (parsedKey && parsedKey.length) {
        result = true;
      }
      return result;
    };
    const remove = () => {
      localStorage.setItem('compare', '[]');
      this.props.onToggle();
    };
    const compare = exists() ?
      <a onClick={remove} role="button" tabIndex={0}>Reset comparison choices</a>
      : null;
    return (
      <div>
        {compare}
      </div>
    );
  }
}

ResetComparisons.propTypes = {
  onToggle: PropTypes.func,
};

ResetComparisons.defaultProps = {
  onToggle: EMPTY_FUNCTION,
};

export default ResetComparisons;
