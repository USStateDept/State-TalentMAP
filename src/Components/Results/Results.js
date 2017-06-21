import React, { Component } from 'react';
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
    axios.get(`http://localhost:3005/posts${query}`)
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
            <div key={post.id} style={{ backgroundColor: '#DFDFDF', marginTop: '10px', marginBottom: '10px' }}>
              <a href={`/#/details/${post.id}`}>
                <h3> ID: {post.id} </h3>
              </a>
              <p>
                Skill: {post.skill_text}
                <br />
                Language: {post.language_text}
                <br />
                Grade: {post.grade}
                <br />
                City: {post.city}
              </p>
            </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Results;
