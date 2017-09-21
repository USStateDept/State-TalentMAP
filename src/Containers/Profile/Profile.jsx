import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { postFetchData } from '../../actions/post';
import { USER_PROFILE } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import ProfilePage from '../../Components/ProfilePage';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';

class Post extends Component {

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      this.getPost(this.props.match.params.id);
    }
  }

  getPost(id) {
    this.props.fetchData(id);
  }

  render() {
    const { userProfile } = this.props;
    return (
      <div>
        <ProfilePage user={userProfile} />
      </div>
    );
  }
}

Post.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
  isAuthorized: PropTypes.func.isRequired,
  userProfile: USER_PROFILE,
};

Post.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
};

Post.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  userProfile: state.userProfile,
  hasErrored: state.postHasErrored,
  isLoading: state.postIsLoading,
  id: ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(postFetchData(url)),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
