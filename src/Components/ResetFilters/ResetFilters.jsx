import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import ConfirmLink from '../ConfirmLink';

class ResetFilters extends Component {
  constructor(props) {
    super(props);
    this.resetFilters = this.resetFilters.bind(this);
  }

  resetFilters() {
    this.props.resetFilters();
  }

  render() {
    return (
      <div className="reset-filters-container">
        <ConfirmLink
          type="span"
          className="reset-filters"
          role="link"
          defaultText={<span><FontAwesome name="times" />Clear Filters</span>}
          onClick={this.resetFilters}
        />
      </div>
    );
  }
}

ResetFilters.propTypes = {
  resetFilters: PropTypes.func.isRequired,
};

export default ResetFilters;
