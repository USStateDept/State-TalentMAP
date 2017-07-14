import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { postFetchData } from '../../actions/post';
import PostDetails from '../../Components/PostDetails/PostDetails';

class Post extends Component {

  componentWillMount() {
    this.getPost(this.props.match.params.id); // eslint-disable-line
  }

  getPost(id) {
    const query = id;
    const api = this.props.api;
    this.props.fetchData(`${api}/organization/posts/${query}/`);
  }

  render() {
    const { post } = this.props;
    const postComponent = this.props.isLoading ? null : <PostDetails post={post} />; //eslint-disable-line
    return (
      <div>
        {postComponent}
      </div>
    );
  }
}

Post.propTypes = {
  api: PropTypes.string.isRequired,
  match: PropTypes.object, //eslint-disable-line
  location: PropTypes.object, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  fetchData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
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
