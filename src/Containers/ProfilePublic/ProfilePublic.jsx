import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { get } from 'lodash';
import ProfileDashboard from 'Components/ProfileDashboard';
import { fetchClassifications } from 'actions/classifications';
import { userProfilePublicFetchData } from 'actions/userProfilePublic';
import { USER_PROFILE, EMPTY_FUNCTION, CLASSIFICATIONS } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import Alert from '../../Components/Alert';

class ProfilePublic extends Component {
  UNSAFE_componentWillMount() {
    const id = get(this.props, 'match.params.id');
    this.props.fetchData(id);
    this.props.fetchClassifications();
  }

  render() {
    const {
      isLoading,
      hasErrored,
      userProfile,
      classifications,
      classificationsIsLoading,
      classificationsHasErrored,
    } = this.props;
    const { bidList } = userProfile;
    const clientClassifications = userProfile.classifications;
    const combinedLoading = isLoading || classificationsIsLoading;
    const combinedErrored = hasErrored || classificationsHasErrored;
    return (
      combinedErrored ?
        <Alert type="error" title="User not found" />
        :
        <ProfileDashboard
          userProfile={userProfile}
          isLoading={combinedLoading}
          bidList={bidList}
          classifications={classifications}
          clientClassifications={clientClassifications}
          isPublic
        />
    );
  }
}

ProfilePublic.propTypes = {
  userProfile: USER_PROFILE,
  fetchData: PropTypes.func,
  fetchClassifications: PropTypes.func,
  isLoading: PropTypes.bool,
  classificationsIsLoading: PropTypes.bool,
  classificationsHasErrored: PropTypes.bool,
  hasErrored: PropTypes.bool,
  classifications: CLASSIFICATIONS,
};

ProfilePublic.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
  fetchData: EMPTY_FUNCTION,
  fetchClassifications: EMPTY_FUNCTION,
  hasErrored: false,
  classificationsIsLoading: true,
  classificationsHasErrored: false,
  classifications: [],
};

ProfilePublic.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  userProfile: state.userProfilePublic,
  isLoading: state.userProfilePublicIsLoading,
  hasErrored: state.userProfilePublicHasErrored,
  id: ownProps,
  classificationsIsLoading: state.classificationsIsLoading,
  classificationsHasErrored: state.classificationsHasErrored,
  classifications: state.classifications,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(userProfilePublicFetchData(id)),
  onNavigateTo: dest => dispatch(push(dest)),
  fetchClassifications: () => dispatch(fetchClassifications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePublic));
