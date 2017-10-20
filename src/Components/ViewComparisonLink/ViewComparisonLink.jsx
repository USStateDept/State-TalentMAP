import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { localStorageFetchValue } from '../../utilities';

class ViewComparisonLink extends Component {

  render() {
    // does the compare key exists and is count > 0?
    const exists = () => {
      const retrievedKey = localStorageFetchValue('compare', null);
      return !!retrievedKey.count;
    };
    // if not, return null
    if (!exists()) {
      return null;
    }
    // else, parse the key's value to use in the Link
    const compareArray = JSON.parse(localStorage.getItem('compare'));
    return (
      <Link className={'usa-button'} to={`compare/${compareArray.toString()}`}>Compare positions</Link>
    );
  }
}

export default ViewComparisonLink;
