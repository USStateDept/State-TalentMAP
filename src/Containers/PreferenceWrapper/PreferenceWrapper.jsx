import { Component, cloneElement } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSortPreference } from '../../actions/preferences';

export class PreferenceWrapper extends Component {
  cb = e => {
    const { keyRef, onSelect, setPreference } = this.props;
    onSelect(e);
    setPreference(keyRef, e.target.value);
  };

  render() {
    const { children, childCallback } = this.props;
    return cloneElement(children, { [childCallback]: this.cb });
  }
}

PreferenceWrapper.propTypes = {
  keyRef: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func.isRequired,
  childCallback: PropTypes.string,
  setPreference: PropTypes.func.isRequired,
};

PreferenceWrapper.defaultProps = {
  sortPreference: '',
  childCallback: 'onSelectOption',
};

export const mapStateToProps = (state, ownProps) => ({
  sortPreference: get(state, `sortPreferences[${ownProps.keyRef}].defaultValue`),
});

export const mapDispatchToProps = dispatch => ({
  setPreference: (key, value) => dispatch(setSortPreference(key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceWrapper);
