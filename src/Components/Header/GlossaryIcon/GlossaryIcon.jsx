import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleGlossary } from '../../../actions/showGlossary';
import Icon from './Icon';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

class GlossaryIcon extends Component {
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }
  toggleVisibility() {
    const { toggleGlossaryVisibility, shouldShowGlossary } = this.props;
    toggleGlossaryVisibility(!shouldShowGlossary);
  }
  render() {
    return (
      <Icon onClick={this.toggleVisibility} />
    );
  }
}

GlossaryIcon.propTypes = {
  toggleGlossaryVisibility: PropTypes.func.isRequired,
  shouldShowGlossary: PropTypes.bool.isRequired,
};

GlossaryIcon.defaultProps = {
  toggleGlossaryVisibility: EMPTY_FUNCTION,
  shouldShowGlossary: false,
};

const mapStateToProps = state => ({
  shouldShowGlossary: state.shouldShowGlossary,
});

export const mapDispatchToProps = dispatch => ({
  toggleGlossaryVisibility: shouldShow => dispatch(toggleGlossary(shouldShow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlossaryIcon);
