import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ajax } from '../../utilities';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: props.results || [], // eslint-disable-line react/prop-types
    };
  }

  componentWillMount() {
    if (!this.props.results) { // eslint-disable-line react/prop-types
      this.getPosts(this.props.location.search); // eslint-disable-line react/prop-types
    }
  }

  getPosts(q) {
    const query = q;
    const api = this.props.api;
    console.log(`${api}/position/${query}`);
    ajax(`${api}/position/${query}`)
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
            const languageList = post.languages.length ? post.languages.map(choice => (
              <span key={`${post.position_number}-${choice}-choice`}> {choice.language} </span>
            )) : <span key={`${post.position_number}-no-languages`}> None listed </span>;
            return (
              <div key={post.id} id={post.id} style={{ backgroundColor: '#DFDFDF', marginTop: '10px', marginBottom: '10px' }}>
                <a href={`/#/details/${post.position_number}`}>
                  <h3> Position Number: {post.position_number} </h3>
                </a>
                <p>
                  Skill: {post.skill}
                  <br />
                  Bureau: {post.bureau}
                  <br />
                  Organization: {post.organization}
                  <br />
                  Overseas: {post.is_overseas ? 'Yes' : 'No'}
                  <br />
                  Language: <span>{languageList}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  api: PropTypes.string.isRequired,
};

export default Results;
