import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
} from 'darkreader';
import { checkFlag } from '../../flags';
import { getBrowserName } from '../../utilities';

const getUseDarkMode = () => checkFlag('flags.personalization');

const setMode = (value) => {
  if (!value || !getUseDarkMode()) {
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

  browserHandler() {
    switch (getBrowserName()) {
      // Dark mode breaks in IE11.
      // Attempt to disable dark mode if for some reason it is set to true.
      case 'Internet Explorer': {
        return <div>{this.props.isDarkMode && setMode(false)}</div>;
      }
      default: {
        return <div />;
      }
    }
  }

  render() {
    const content = this.browserHandler();
    return (
      content
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
