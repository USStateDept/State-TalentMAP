/*
Use this component to wrap bits of static development
content (like a hardcoded phone number) so that they
can be easily detected during demos or user testing.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StaticDevContent = ({ children, showStaticContent }) => (
  showStaticContent ?
    <div style={{ boxShadow: '0px 0px 0px 2px red' }}>
      { children }
    </div>
    :
    <span>{ children }</span>
);

StaticDevContent.propTypes = {
  children: PropTypes.node.isRequired,
  showStaticContent: PropTypes.bool,
};

StaticDevContent.defaultProps = {
  showStaticContent: false,
};

const mapStateToProps = state => ({
  showStaticContent: state.shouldShowStaticContent,
});

export default connect(mapStateToProps)(StaticDevContent);
