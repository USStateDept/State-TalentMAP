import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { localStorageFetchValue } from '../../utilities';

class ViewComparisonLink extends Component {

  render() {
    // does the compare key exists and is len > 0?
    const exists = () => {
      const retrievedKey = localStorageFetchValue('compare', null);
      return !!retrievedKey.len;
    };
    // if not, return null
    if (!exists()) {
      return null;
    }
    // else, parse the key's value to use in the Link
    const compareArray = JSON.parse(localStorage.getItem('compare'));
    return (
      <span>
        <Link to={`compare/${compareArray.toString()}`}>Compare positions</Link>
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
