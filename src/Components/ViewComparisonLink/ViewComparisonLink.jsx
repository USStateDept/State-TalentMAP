import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { localStorageFetchValue } from '../../utilities';

class ViewComparisonLink extends Component {

  render() {
    const exists = () => {
      const retrievedKey = localStorageFetchValue('compare', null);
      return !!retrievedKey.len;
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
