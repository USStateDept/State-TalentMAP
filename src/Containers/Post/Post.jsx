import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { postFetchData } from '../../actions/post';
import PostDetails from '../../Components/PostDetails/PostDetails';

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
  post: PropTypes.shape({
    id: PropTypes.number,
    tour_of_duty: PropTypes.string,
    code: PropTypes.string,
    description: PropTypes.string,
    cost_of_living_adjustment: PropTypes.number,
    differential_rate: PropTypes.number,
    danger_pay: PropTypes.number,
    rest_relaxation_point: PropTypes.string,
    has_consumable_allowance: PropTypes.boolean,
    has_service_needs_differential: PropTypes.boolean,
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        language: PropTypes.string,
        written_proficiency: PropTypes.string,
        spoken_proficiency: PropTypes.string,
        representation: PropTypes.string,
      }),
    ),
  }),
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
