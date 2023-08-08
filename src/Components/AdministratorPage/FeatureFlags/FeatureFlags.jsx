import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { JsonEditor as Editor } from 'jsoneditor-react';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import { EMPTY_FUNCTION, USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import { userHasPermissions } from 'utilities';
import { postFeatureFlagsData } from 'actions/featureFlags';
import { get, isObject, keys } from 'lodash';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';

class FeatureFlags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableFeatureFlags: props.featureFlags,
    };
  }

  handleChange = d => {
    this.setState({ editableFeatureFlags: d });
  };

  submitData = () => {
    if (keys(get(this.state, 'editableFeatureFlags', {})).length !== 0) {
      this.props.postData(this.state.editableFeatureFlags);
    }
  };

  render() {
    const {
      userProfile,
      featureFlagsHasErrored,
      featureFlagsIsLoading,
      featureFlags,
    } = this.props;

    const featureFlagsSuccess = !featureFlagsIsLoading && !featureFlagsHasErrored;

    const isSuperUser = userHasPermissions(['superuser'], userProfile.permission_groups);
    return (
      <div
        className={`usa-grid-full profile-content-inner-container administrator-page feature-flags-editor
        ${(featureFlagsIsLoading) ? 'results-loading' : ''}`}
      >
        {
          featureFlagsIsLoading && !featureFlagsHasErrored &&
            <Spinner type="homepage-position-results" size="big" />
        }
        <div className="usa-grid-full">
          <ProfileSectionTitle title="Feature Flags" icon="flag" />
        </div>

        { featureFlagsSuccess && isSuperUser ?
          <PermissionsWrapper permissions="superuser">
            <Editor
              value={featureFlags}
              onChange={this.handleChange}
            />
            <button name="Submit" className="usa-button" onClick={this.submitData}>Submit</button>
          </PermissionsWrapper>
          :
          <div>
            <div>
              <pre>
                {
                  isObject(featureFlags) && JSON.stringify(featureFlags, undefined, 2)
                }
              </pre>
            </div>
          </div>
        }
      </div>
    );
  }
}

FeatureFlags.propTypes = {
  userProfile: USER_PROFILE,
  featureFlagsHasErrored: PropTypes.bool,
  featureFlagsIsLoading: PropTypes.bool,
  featureFlags: PropTypes.shape({}),
  postData: EMPTY_FUNCTION,
};

FeatureFlags.defaultProps = {
  userProfile: DEFAULT_USER_PROFILE,
  featureFlagsHasErrored: false,
  featureFlagsIsLoading: false,
  featureFlags: {},
  postData: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  featureFlagsHasErrored: state.featureFlagsHasErrored,
  featureFlagsIsLoading: state.featureFlagsIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  postData: data => dispatch(postFeatureFlagsData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeatureFlags);
