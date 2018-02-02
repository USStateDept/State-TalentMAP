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
import InteractiveElement from '../InteractiveElement';

export const StaticDevContent = ({ toggle, showStaticContent }) => (
  <InteractiveElement
    type="span"
    style={{ position: 'absolute', right: '0px', cursor: 'pointer', fontSize: '10px' }}
    onClick={() => toggle(!showStaticContent)}
  >
    Toggle static content
  </InteractiveElement>
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
