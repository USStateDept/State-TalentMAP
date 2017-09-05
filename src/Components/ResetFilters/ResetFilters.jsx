import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResetFilters extends Component {
  constructor(props) {
    super(props);
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
        { /* At the time of writing, CodeClimate's version of eslint-a11y-plugin
          did not take role="button" into account with the following error */ }
        <span // eslint-disable-line jsx-a11y/no-static-element-interactions
          className="reset-filters"
          tabIndex="0"
          role="link"
          onClick={() => this.resetFilters()}
        >
          {text}
        </span>
      </div>
    );
  }
}

ResetFilters.propTypes = {
  resetFilters: PropTypes.func.isRequired,
};

export default ResetFilters;
