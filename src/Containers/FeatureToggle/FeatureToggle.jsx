import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FeatureToggle = ({ isEnabled, children }) => (isEnabled ? children : null);

FeatureToggle.propTypes = {
  isEnabled: PropTypes.bool,
};

function isFeatureEnabled({ features }, featureName) {
  return features.indexOf(featureName) !== -1;
}

export default connect((store, { name }) => ({
  isEnabled: isFeatureEnabled(store, name),
}))(FeatureToggle);
