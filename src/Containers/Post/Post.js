import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { ajax } from '../../utilities';
import PostMissionData from '../../Components/PostMissionData/PostMissionData';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        id: 100,
        country: 'United Kingdom',
        city: 'London',
        type: 'type',
        poc: 'John Doe',
        rr_alignment: 'Alignment',
        danger: 'True',
        post_diff: '1.5',
        sn_diff: '1.75',
        cola: '1.25',
        consumables: '1000',
      },
    };
  }

  componentWillMount() {
    // this.getPost(this.props.match ? this.props.match.params.id : '');
    // eslint-disable-line react/prop-types
  }

  /* getPost(id) {
    const query = id;
    const api = this.props.api;
    ajax(`${api}/posts/?post_number=${query}`)
        .then((res) => {
          const post = res.data[0];
          this.setState({ post });
        });
  }*/

  render() {
    const { post } = this.state;
    return (
      <div id="main-content">
        <div className="usa-grid-full">
          <div style={{ backgroundColor: '#DFDFDF', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
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

export default Post;
