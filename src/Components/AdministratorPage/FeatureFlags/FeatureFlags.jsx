import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { JsonEditor as Editor } from 'jsoneditor-react';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import { EMPTY_FUNCTION, USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import { userHasPermissions } from 'utilities';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';

export const formatNum = n => numeral(n).format('0,0');

class FeatureFlags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  handleChange = data => {
    // eslint-disable-next-line no-console
    console.log('current: data:', data);
    this.props.updateFeatureFlags(data);
  };
  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      featureFlags,
      userProfile,
      // eslint-disable-next-line no-unused-vars
      stats,
      statsIsLoading,
      statsHasErrored,
    } = this.props;

    // eslint-disable-next-line no-unused-vars
    const statsSuccess = !statsIsLoading && !statsHasErrored;
    const configFile = {
      bidding: true,
      static_content: true,
      notifications: true,
      data_sync_admin: true,
      bid_count: true,
      personalization: true,
      persona_auth: true,
      client_counts: false,
      cdo_season_filter: true,
      cdo_bidding: true,
      confetti: true,
      bidding_tips: true,
      bid_stats: false,
      client_profiles: true,
    };
    const isSuperUser = userHasPermissions(['superuser'], userProfile.permission_groups);
    return (
      <div
        className={`usa-grid-full profile-content-inner-container administrator-page
        ${(statsIsLoading) ? 'results-loading' : ''}`}
      >
        {
          statsIsLoading &&
            <Spinner type="homepage-position-results" size="big" />
        }
        <div className="usa-grid-full">
          <ProfileSectionTitle title="Feature Flags" icon="flag" />
        </div>
        { !statsIsLoading && isSuperUser ?
          <PermissionsWrapper permissions="superuser">
            <Editor
              value={configFile}
              onChange={this.handleChange}
            />
          </PermissionsWrapper>
          :
          <div>
            {
              Object.keys(configFile).map(k => <div key={k}>{k}: {configFile[k].toString()}</div>)
            }
          </div>
        }
      </div>
    );
  }
}

FeatureFlags.propTypes = {
  featureFlags: PropTypes.string,
  updateFeatureFlags: PropTypes.func,
  userProfile: USER_PROFILE,


  stats: PropTypes.arrayOf(PropTypes.shape({})),
  statsIsLoading: PropTypes.bool,
  statsHasErrored: PropTypes.bool,
};

FeatureFlags.defaultProps = {
  featureFlags: '',
  updateFeatureFlags: EMPTY_FUNCTION,
  userProfile: DEFAULT_USER_PROFILE,


  stats: [],
  statsIsLoading: false,
  statsHasErrored: false,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,

  stats: state.stats,
  statsIsLoading: state.statsIsLoading,
  statsHasErrored: state.statsHasErrored,
});

export default connect(mapStateToProps)(FeatureFlags);
