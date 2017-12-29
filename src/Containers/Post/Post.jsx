import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { postFetchData } from '../../actions/post';
import PostDetails from '../../Components/PostDetails/PostDetails';
import { POST_MISSION_DATA } from '../../Constants/PropTypes';
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
    const { post } = this.props;
    return (
      <PostDetails post={post} />
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
  post: POST_MISSION_DATA,
  isAuthorized: PropTypes.func.isRequired,
};

Post.defaultProps = {
  post: {},
  isLoading: true,
};

Post.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  post: state.post,
  hasErrored: state.postHasErrored,
  isLoading: state.postIsLoading,
  id: ownProps,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(postFetchData(url)),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
