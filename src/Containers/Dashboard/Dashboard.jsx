import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { assignmentFetchData } from '../../actions/assignment';
import { notificationsFetchData } from '../../actions/notifications';
import { bidListFetchData } from '../../actions/bidList';
import { USER_PROFILE, NOTIFICATION_LIST, ASSIGNMENT_OBJECT, BID_LIST } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import ProfileDashboard from '../../Components/ProfileDashboard';

class DashboardContainer extends Component {

  componentWillMount() {
    this.props.fetchAssignment();
    this.props.fetchNotifications();
    this.props.fetchBidList();
  }

  render() {
    const { userProfile, userProfileIsLoading, assignment, assignmentIsLoading,
      notifications, notificationsIsLoading, bidList, bidListIsLoading } = this.props;
    return (
      <ProfileDashboard
        userProfile={userProfile}
        isLoading={userProfileIsLoading}
        assignmentIsLoading={assignmentIsLoading}
        assignment={assignment}
        notifications={notifications.results}
        notificationsIsLoading={notificationsIsLoading}
        bidList={bidList.results}
        bidListIsLoading={bidListIsLoading}
      />
    );
  }
}

DashboardContainer.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  userProfileIsLoading: PropTypes.bool.isRequired,
  fetchAssignment: PropTypes.func.isRequired,
  assignment: ASSIGNMENT_OBJECT.isRequired,
  assignmentIsLoading: PropTypes.bool.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  notifications: NOTIFICATION_LIST.isRequired,
  notificationsIsLoading: PropTypes.bool.isRequired,
  fetchBidList: PropTypes.func.isRequired,
  bidList: BID_LIST.isRequired,
  bidListIsLoading: PropTypes.bool.isRequired,
};

DashboardContainer.defaultProps = {
  userProfile: DEFAULT_USER_PROFILE,
  userProfileIsLoading: false,
  assignmentIsLoading: false,
  assignment: {},
  notificationsIsLoading: false,
  notifications: { results: [] },
  bidList: { results: [] },
  bidListIsLoading: false,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  assignment: state.assignment,
  assignmentIsLoading: state.assignmentIsLoading,
  notifications: state.notifications,
  notificationsIsLoading: state.notificationsIsLoading,
  bidList: state.bidListFetchDataSuccess,
  bidListIsLoading: state.bidListIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchAssignment: () => dispatch(assignmentFetchData()),
  fetchNotifications: () => dispatch(notificationsFetchData()),
  fetchBidList: () => dispatch(bidListFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
