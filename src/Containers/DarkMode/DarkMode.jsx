import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  disable as disableDarkMode,
  enable as enableDarkMode,
} from 'darkreader';
import { getBrowserName } from '../../utilities';


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
  UNSAFE_componentWillMount() {
    const { isDarkMode } = this.props;
    setMode(isDarkMode);
  }

  // eslint-disable-next-line class-methods-use-this
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isDarkMode } = nextProps;
    setMode(isDarkMode);
  }

  browserHandler() {
    switch (getBrowserName()) {
    // Dark mode breaks in IE11.
    // Attempt to disable dark mode if for some reason it is set to true.
    // Also set in src/Components/AccountDropdown/AccountDropdown.jsx
      case 'Chrome':
      case 'Firefox':
      case 'Safari': {
        return <div />;
      }
      default: {
        return <div>{this.props.isDarkMode && setMode(false)}</div>;
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
