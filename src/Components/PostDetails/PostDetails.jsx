import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostMissionData from '../PostMissionData/PostMissionData';
import { POST_DETAILS } from '../../Constants/PropTypes';

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {
    const { post } = this.props;
    const postMissionData = (
      <div className="usa-grid-full">
        <div style={{ backgroundColor: '#F2F2F2', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
          <h3> Post Number: {post.id} </h3>
          <PostMissionData post={post} />
        </div>
      </div>
    );
    return (
      <div>
        {postMissionData}
      </div>
    );
  }
}

PostDetails.propTypes = {
  post: POST_DETAILS,
};

PostDetails.defaultProps = {
  post: {},
};

PostDetails.contextTypes = {
  router: PropTypes.object,
};

export default PostDetails;
