import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
} from 'darkreader';

const setMode = (value) => {
  if (!value) {
    disableDarkMode();
  } else {
    enableDarkMode({
      brightness: 100,
      contrast: 90,
      sepia: 10,
    });
  }
};

class DarkMode extends Component {

  componentWillMount() {
    const { isDarkMode } = this.props;
    setMode(isDarkMode);
  }

  componentWillReceiveProps(nextProps) {
    const { isDarkMode } = nextProps;
    setMode(isDarkMode);
  }

  render() {
    return (
      <div />
    );
  }
}

DarkMode.propTypes = {
  isDarkMode: PropTypes.bool,
};

DarkMode.defaultProps = {
  isDarkMode: false,
};

const mapStateToProps = state => ({
  isDarkMode: state.darkModePreference,
});

export default connect(mapStateToProps)(DarkMode);
