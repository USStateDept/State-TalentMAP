/*
This component provides clickable text that toggles
the "shouldShowStaticContent" state between true and false,
so that the StaticDevContent component can conditionally wrap
its child component in a border when true, or simply return the unmodified
child component when false.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleStaticContent } from '../../actions/showStaticContent';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

export const StaticDevContent = ({ toggle, showStaticContent }) => (
  // At the time of writing, CodeClimate's version of eslint-a11y-plugin
  // did not take role="button" into account with the following error:
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <span style={{ position: 'absolute', right: '0px', cursor: 'pointer', fontSize: '10px' }} onClick={() => toggle(!showStaticContent)} role="button" tabIndex="0">
    Toggle static content
  </span>
);

StaticDevContent.propTypes = {
  toggle: PropTypes.func,
  showStaticContent: PropTypes.bool,
};

StaticDevContent.defaultProps = {
  toggle: EMPTY_FUNCTION,
  showStaticContent: false,
};

const mapStateToProps = state => ({
  showStaticContent: state.shouldShowStaticContent,
});

const mapDispatchToProps = dispatch => ({
  toggle: value => dispatch(toggleStaticContent(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StaticDevContent);
