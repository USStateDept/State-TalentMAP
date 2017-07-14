import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostMissionData from '../PostMissionData/PostMissionData';

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

PostDetails.defaultProps = {
  post: {},
};

PostDetails.contextTypes = {
  router: PropTypes.object,
};

export default PostDetails;
