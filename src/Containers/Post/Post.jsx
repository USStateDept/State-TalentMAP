import { Component } from 'react';
import { connect } from 'react-redux';
import { includes } from 'lodash';
import { USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import PostPage from '../../Components/PostPage';

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getIsPost() {
    return includes(this.props.userProfile.permission_groups, 'post_user');
  }

  render() {
    return (
      <PostPage isPost={this.getIsPost()} />
    );
  }
}

PostContainer.propTypes = {
  userProfile: USER_PROFILE,
};

PostContainer.defaultProps = {
  userProfile: DEFAULT_USER_PROFILE,
};

const mapStateToProps = (state) => ({
  userProfile: state.userProfile,
});

export default connect(mapStateToProps, null)(PostContainer);
