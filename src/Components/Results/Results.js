import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.getPosts(this.props.location.search); // eslint-disable-line react/prop-types
  }

  getPosts(q) {
    const query = q;
    const api = this.props.api;
    axios.get(`${api}/position/${query}`)
      .then((res) => {
        const posts = res.data;
        this.setState({ posts });
      });
  }

  render() {
    const { posts } = this.state;
    return (
      <div id="main-content">
        <div className="usa-grid-full">
          { posts.map(post => (
            <div key={post.id} id={post.id} style={{ backgroundColor: '#DFDFDF', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
              <a href={`/#/details/${post.position_number}`}>
                <h3> Position Number: {post.position_number} </h3>
              </a>
              <p>
                  Grade: {post.grade}
                <br />
                  Skill: {post.skill}
                <br />
                  Bureau: {post.bureau}
                <br />
                  Organization: {post.organization}
              </p>
            </div>
            ))}
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  api: PropTypes.string.isRequired,
};

export default Results;
