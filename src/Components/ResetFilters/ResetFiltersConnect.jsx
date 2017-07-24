import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ResetFilters from './ResetFilters/ResetFilters';

class ResetFiltersConnect extends Component {

  onChildToggle(e) {
    this.props.onNavigateTo(e);
  }

  render() {
    return (
      <ResetFilters onToggle={e => this.onChildToggle(e)} />
    );
  }
}

ResetFiltersConnect.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(null, mapDispatchToProps)(ResetFiltersConnect);
