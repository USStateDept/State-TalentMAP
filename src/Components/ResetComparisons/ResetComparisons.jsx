import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResetComparisons extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

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
      <button onClick={() => remove()}>Reset comparison choices</button>
      : null;
    return (
      <span>
        {compare}
      </span>
    );
  }
}

ResetComparisons.propTypes = {
  onToggle: PropTypes.func,
};

ResetComparisons.defaultProps = {
  onToggle: () => {},
};

export default ResetComparisons;
