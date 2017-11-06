import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { assignmentFetchData } from '../../actions/assignment';
import { notificationsFetchData } from '../../actions/notifications';
import { USER_PROFILE } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import ProfileDashboard from '../../Components/ProfileDashboard';

class DashboardContainer extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAssignment();
    this.props.fetchNotifications();
  }

  render() {
    // eslint-disable-next-line
    const { userProfile, userProfileIsLoading, assignment, assignmentIsLoading, notifications, notificationsIsLoading } = this.props;
    return (
      <ProfileDashboard
        userProfile={userProfile}
        isLoading={userProfileIsLoading}
        assignmentIsLoading={assignmentIsLoading}
        assignment={assignment}
        notifications={notifications}
        notificationsIsLoading={notificationsIsLoading}
      />
    );
  }
}

DashboardContainer.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  userProfileIsLoading: PropTypes.bool.isRequired,
  fetchAssignment: PropTypes.func.isRequired,
  assignment: PropTypes.shape({}).isRequired,
  assignmentIsLoading: PropTypes.bool.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.shape({}).isRequired,
  notificationsIsLoading: PropTypes.bool.isRequired,
};

DashboardContainer.defaultProps = {
  userProfile: DEFAULT_USER_PROFILE,
  userProfileIsLoading: true,
  assignmentIsLoading: true,
  assignment: {},
  notificationsIsLoading: true,
  notifications: [],
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  assignment: state.assignment,
  assignmentIsLoading: state.assignmentIsLoading,
  notifications: state.notifications,
  notificationsIsLoading: state.notificationsIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchAssignment: () => dispatch(assignmentFetchData()),
  fetchNotifications: () => dispatch(notificationsFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
