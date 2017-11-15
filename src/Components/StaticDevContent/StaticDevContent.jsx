import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StaticDevContent = ({ children, showStaticContent }) => (
  showStaticContent ?
    <div style={{ boxShadow: '0px 0px 0px 2px red' }}>
      { children }
    </div>
    :
    children
);

StaticDevContent.propTypes = {
  children: PropTypes.node.isRequired,
  showStaticContent: PropTypes.bool,
};

StaticDevContent.defaultProps = {
  showStaticContent: PropTypes.bool,
};

const mapStateToProps = state => ({
  showStaticContent: state.shouldShowStaticContent,
});

export default connect(mapStateToProps)(StaticDevContent);
