import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { get } from 'lodash';
import { USER_PROFILE, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import ProfileDashboard from '../../Components/ProfileDashboard';
import { userProfilePublicFetchData } from '../../actions/userProfilePublic';
import Alert from '../../Components/Alert';

class ProfilePublic extends Component {

  componentWillMount() {
    this.props.fetchData(get(this.props, 'match.params.id'));
  }

  render() {
    const { isLoading, hasErrored, userProfile } = this.props;
    const { assignments, bidList } = userProfile;
    const assignment = get(assignments, '[0]');
    return (
      hasErrored ?
        <Alert type="error" title="User not found" />
      :
        <ProfileDashboard
          userProfile={userProfile}
          assignment={assignment}
          isLoading={isLoading}
          bidList={bidList}
          isPublic
        />
    );
  }
}

ProfilePublic.propTypes = {
  userProfile: USER_PROFILE,
  fetchData: PropTypes.func,
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
};

ProfilePublic.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
  fetchData: EMPTY_FUNCTION,
  hasErrored: false,
};

ProfilePublic.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  userProfile: state.userProfilePublic,
  isLoading: state.userProfilePublicIsLoading,
  hasErrored: state.userProfilePublicHasErrored,
  id: ownProps,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(userProfilePublicFetchData(id)),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePublic));
