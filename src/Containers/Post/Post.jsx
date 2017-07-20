import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { postFetchData } from '../../actions/post';
import PostDetails from '../../Components/PostDetails/PostDetails';
import { POST_MISSION_DATA } from '../../Constants/PropTypes';

class Post extends Component {

  componentWillMount() {
    this.getPost(this.props.match.params.id);
  }

  getPost(id) {
    const query = id;
    const api = this.props.api;
    this.props.fetchData(`${api}/organization/posts/${query}/`);
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        <PostDetails post={post} />
      </div>
    );
  }
}

Post.propTypes = {
  api: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
  post: POST_MISSION_DATA,
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

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(postFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
