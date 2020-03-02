import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDarkModePreference } from '../../actions/preferences';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class DarkModeToggle extends Component {
  onClickUnset = () => {
    this.props.set(false);
  };

  onClickSet = () => {
    this.props.set(true);
  };

  render() {
    const { isDarkMode, set, ...rest } = this.props;
    return (
      isDarkMode ?
        <button className="unstyled-button" onClick={this.onClickUnset} {...rest}>Disable Dark Mode</button>
        :
        <button className="unstyled-button" onClick={this.onClickSet} {...rest}>Enable Dark Mode</button>
    );
  }
}

DarkModeToggle.propTypes = {
  isDarkMode: PropTypes.bool,
  set: PropTypes.func,
};

DarkModeToggle.defaultProps = {
  isDarkMode: false,
  set: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  isDarkMode: state.darkModePreference,
});

export const mapDispatchToProps = dispatch => ({
  set: bool => dispatch(setDarkModePreference(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DarkModeToggle);
