import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { assignmentFetchData } from '../../actions/assignment';
import { USER_PROFILE, ASSIGNMENT_OBJECT } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import ProfileDashboard from '../../Components/ProfileDashboard';

class DashboardContainer extends Component {

  componentWillMount() {
    this.props.fetchAssignment();
  }

  render() {
    const { userProfile, userProfileIsLoading, assignment, assignmentIsLoading } = this.props;
    return (
      <ProfileDashboard
        userProfile={userProfile}
        isLoading={userProfileIsLoading}
        assignmentIsLoading={assignmentIsLoading}
        assignment={assignment}
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
};

DashboardContainer.defaultProps = {
  userProfile: DEFAULT_USER_PROFILE,
  userProfileIsLoading: false,
  assignmentIsLoading: false,
  assignment: {},
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  assignment: state.assignment,
  assignmentIsLoading: state.assignmentIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchAssignment: () => dispatch(assignmentFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
