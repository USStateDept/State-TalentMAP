import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleStaticContent } from '../../actions/showStaticContent';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

export const StaticDevContent = ({ toggle, showStaticContent }) => (
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
