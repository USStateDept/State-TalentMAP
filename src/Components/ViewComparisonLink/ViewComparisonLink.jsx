import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ViewComparisonLink extends Component {
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
    const compare = exists() ? <Link to="compare">Compare positions</Link> : null;
    return (
      <span>
        {compare}
      </span>
    );
  }
}

ViewComparisonLink.propTypes = {
  onToggle: PropTypes.func,
};

ViewComparisonLink.defaultProps = {
  onToggle: () => {},
};

export default ViewComparisonLink;
