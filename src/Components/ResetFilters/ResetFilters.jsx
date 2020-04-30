import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from '../InteractiveElement';

class ResetFilters extends Component {
  resetFilters = () => {
    this.props.resetFilters();
  };

  render() {
    return (
      <div className="reset-filters-container">
        <InteractiveElement
          type="span"
          role="link"
          className="reset-filters"
          onClick={this.resetFilters}
        >
          <span><FontAwesome name="times" />Clear Filters</span>
        </InteractiveElement>
      </div>
    );
  }
}

ResetFilters.propTypes = {
  resetFilters: PropTypes.func.isRequired,
};

export default ResetFilters;
