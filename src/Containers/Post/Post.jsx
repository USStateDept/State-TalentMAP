import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { postFetchData } from '../../actions/post';
import PostDetails from '../../Components/PostDetails/PostDetails';
import { POST_MISSION_DATA, EMPTY_FUNCTION } from '../../Constants/PropTypes';
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
    const query = id;
    const api = this.props.api;
    this.props.fetchData(`${api}/post/${query}/`);
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
  onNavigateTo: PropTypes.func,
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
  onNavigateTo: EMPTY_FUNCTION,
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
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
