import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ajax } from '../../utilities';
import PostMissionData from '../../Components/PostMissionData/PostMissionData';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  componentWillMount() {
    this.getPost(this.context.router.route.match.params.id);
  }

  getPost(id) {
    const query = id;
    const api = this.props.api;
    ajax(`${api}/organization/posts/${query}/`)
        .then((res) => {
          const post = res.data;
          this.setState({ post });
        });
  }

  render() {
    const { post } = this.state;
    return (
      <div>
        <div className="usa-grid-full">
          <div style={{ backgroundColor: '#F2F2F2', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
            <h3> Post Number: {post.id} </h3>
            <PostMissionData post={post} />
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  api: PropTypes.string.isRequired,
};

Post.contextTypes = {
  router: PropTypes.object,
};

export default Post;
