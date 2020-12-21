/*
Use this component to wrap bits of static development
content (like a hardcoded phone number) so that they
can be easily detected during demos or user testing.
*/

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flag } from 'flag';

const StaticDevContent = ({ children, showStaticContent, useWrapper }) => (
  <Flag
    name="flags.static_content"
    render={() => (
      /* eslint-disable-next-line no-nested-ternary */
      showStaticContent ?
        <div style={{ boxShadow: '0px 0px 0px 2px red' }}>
          { children }
        </div>
        :
        useWrapper ? <span>{ children }</span> : children
    )}
  />
);

StaticDevContent.propTypes = {
  children: PropTypes.node.isRequired,
  showStaticContent: PropTypes.bool,
  useWrapper: PropTypes.bool,
};

StaticDevContent.defaultProps = {
  showStaticContent: false,
  useWrapper: true,
};

const mapStateToProps = state => ({
  showStaticContent: state.shouldShowStaticContent,
});

export default connect(mapStateToProps)(StaticDevContent);
