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
    const script = document.createElement('script');

    script.src = '/uswds-1.1.0/js/uswds.min.js';
    script.async = true;

    document.body.appendChild(script);

    this.getPosts(this.props.location.search);
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
            { posts.map((post) => {
              return (
                <div style={{ backgroundColor: '#DFDFDF', marginTop: '10px', marginBottom: '10px' }}>
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
              );
            })
        }
          </div>
        </div>
    );
  }
}

export default Results;
