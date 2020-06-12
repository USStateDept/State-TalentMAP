import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { JsonEditor as Editor } from 'jsoneditor-react';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import { EMPTY_FUNCTION, USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import { userHasPermissions } from 'utilities';
import { postFeatureFlagsData } from 'actions/featureFlags';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';

export const formatNum = n => numeral(n).format('0,0');

class FeatureFlags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feature_flags: {},
    };
  }

  handleChange = d => {
    this.setState({ feature_flags: d });
  };

  submitData = () => {
    this.props.postData(this.state.feature_flags);
  };

  render() {
    const {
      userProfile,
      featureFlagsHasErrored,
      featureFlagsIsLoading,
      // eslint-disable-next-line no-unused-vars
      featureFlags,
      featureFlagsPostHasErrored,
      featureFlagsPostIsLoading,
      featureFlagsPostSuccess,
    } = this.props;

    // eslint-disable-next-line no-unused-vars
    const featureFlagsSuccess = !featureFlagsIsLoading && !featureFlagsHasErrored;
    // eslint-disable-next-line no-unused-vars
    const postFeatureFlagsSuccess = !featureFlagsPostIsLoading &&
        featureFlagsPostSuccess && featureFlagsPostHasErrored;

    // eslint-disable-next-line no-unused-vars
    const isSuperUser = userHasPermissions(['superuser'], userProfile.permission_groups);
    return (
      <div
        className={`usa-grid-full profile-content-inner-container administrator-page
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
            {
              Object.keys(featureFlags).map(k =>
                (<div key={k}>{k}:{featureFlags[k].toString()}</div>))
            }
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
  featureFlags: PropTypes.string,
  featureFlagsPostHasErrored: PropTypes.bool,
  featureFlagsPostIsLoading: PropTypes.bool,
  featureFlagsPostSuccess: PropTypes.bool,
  postData: EMPTY_FUNCTION,
};

FeatureFlags.defaultProps = {
  userProfile: DEFAULT_USER_PROFILE,
  featureFlagsHasErrored: false,
  featureFlagsIsLoading: false,
  featureFlags: '',
  featureFlagsPostHasErrored: false,
  featureFlagsPostIsLoading: false,
  featureFlagsPostSuccess: false,
  postData: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  featureFlagsHasErrored: state.featureFlagsHasErrored,
  featureFlagsIsLoading: state.featureFlagsIsLoading,
  featureFlagsPostHasErrored: state.featureFlagsPostHasErrored,
  featureFlagsPostIsLoading: state.featureFlagsPostIsLoading,
  featureFlagsPostSuccess: state.featureFlagsPostSuccess,
});

export const mapDispatchToProps = dispatch => ({
  postData: data => dispatch(postFeatureFlagsData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeatureFlags);
