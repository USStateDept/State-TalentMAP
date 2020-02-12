import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { get } from 'lodash';
import ProfileDashboard from 'Components/ProfileDashboard';
import { fetchBidderClassifications } from 'Actions/bidderClassifications';
import { userProfilePublicFetchData } from 'Actions/userProfilePublic';
import { USER_PROFILE, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';

import Alert from '../../Components/Alert';

class ProfilePublic extends Component {

  componentWillMount() {
    const id = get(this.props, 'match.params.id');
    this.props.fetchData(id);
    this.props.fetchClassifications(id);
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
    const { assignments, bidList } = userProfile;
    const assignment = get(assignments, '[0]');
    const combinedLoading = isLoading && classificationsIsLoading;
    const combinedErrored = hasErrored && classificationsHasErrored;
    return (
      combinedErrored ?
        <Alert type="error" title="User not found" />
      :
        <ProfileDashboard
          userProfile={userProfile}
          assignment={assignment}
          isLoading={combinedLoading}
          bidList={bidList}
          classifications={classifications}
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
  classifications: [],
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
  classificationsIsLoading: state.bidderClassificationsIsLoading,
  classificationsHasErrored: state.bidderClassificationsHasErrored,
  classifications: state.classifications,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(userProfilePublicFetchData(id)),
  onNavigateTo: dest => dispatch(push(dest)),
  fetchClassifications: id => dispatch(fetchBidderClassifications(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePublic));
