import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { localStorageSetKey } from '../../utilities';

class ResetComparisons extends Component {

  render() {
    const { onToggle, ...rest } = this.props;
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
      localStorageSetKey('compare', '[]');
      onToggle();
    };
    const compare = exists() ?
      <a onClick={remove} role="button" tabIndex={0}>Clear All</a>
      : null;
    return (
      <div {...rest}>
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
