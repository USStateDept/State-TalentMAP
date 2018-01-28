import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InteractiveElement from '../InteractiveElement';

class ResetFilters extends Component {
  constructor(props) {
    super(props);
    this.resetFilters = this.resetFilters.bind(this);
    this.state = {
      confirm: false,
    };
  }

  resetFilters() {
    if (!this.state.confirm) {
      this.setState({ confirm: true });
    } else {
      this.props.resetFilters();
    }
  }

  render() {
    const { confirm } = this.state;
    const text = confirm ? 'Are you sure?' : 'Reset Filters';
    return (
      <div className="reset-filters-container">
        <InteractiveElement
          type="span"
          className="reset-filters"
          role="link"
          onClick={this.resetFilters}
        >
          {text}
        </InteractiveElement>
      </div>
    );
  }
}

ResetFilters.propTypes = {
  resetFilters: PropTypes.func.isRequired,
};

export default ResetFilters;
