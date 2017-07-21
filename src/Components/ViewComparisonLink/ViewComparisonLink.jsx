import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class ViewComparisonLink extends Component {

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
    let url = JSON.parse(localStorage.getItem('compare'));
    url = url ? `compare/${url.toString()}` : 'compare';
    const compare = exists() ? <Link to={url}>Compare positions</Link> : null;
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
  onToggle: EMPTY_FUNCTION,
};

export default ViewComparisonLink;
