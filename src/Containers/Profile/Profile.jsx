import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { USER_PROFILE } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import ProfilePage from '../../Components/ProfilePage';
import { LOGIN_REDIRECT } from '../../login/routes';

class Profile extends Component {

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(LOGIN_REDIRECT);
    }
  }

  render() {
    const { userProfile, isLoading } = this.props;
    return (
      <ProfilePage
        isLoading={isLoading}
        user={userProfile}
      />
    );
  }
}

Profile.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  isAuthorized: PropTypes.func.isRequired,
  userProfile: USER_PROFILE,
  isLoading: PropTypes.bool,
};

Profile.defaultProps = {
  isLoading: false,
  userProfile: DEFAULT_USER_PROFILE,
};

Profile.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  userProfile: state.userProfile,
  isLoading: state.userProfileIsLoading,
  id: ownProps,
});

export const mapDispatchToProps = dispatch => ({
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));
