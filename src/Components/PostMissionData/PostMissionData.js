import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostMissionData extends Component {

  componentWillMount() {
  }

  render() {
    const { post } = this.props;
    const languageList = (post.languages && post.languages.length)
      ? post.languages.map(choice => (
        <span key={`${choice}-choice`}> {choice.language} </span>
      )) : <span key="no-languages"> None listed </span>;
    return (
      <div className="usa-grid-full">
        <div>
          <p>
            Country: {post.grade}
            <br />
            City: {post.city}
            <br />
            Type: {post.type}
            <br />
            Inter and intra agency representation: {post.poc}
            <br />
            Language: <span>{languageList}</span>
            <br />
            R&R Alignment: {post.rr_alignment}
            <br />
            Danger Pay: {post.danger}
            <br />
            Post Differential: {post.post_diff}
            <br />
            Service Needs Differential: {post.sn_diff}
            <br />
            COLA: {post.cola}
            <br />
            Consumables: {post.consumables}
          </p>
        </div>
      </div>
    );
  }
}

PostMissionData.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    grade: PropTypes.string,
    city: PropTypes.string,
    type: PropTypes.string,
    poc: PropTypes.string,
    rr_alignment: PropTypes.string,
    danger: PropTypes.string,
    post_diff: PropTypes.string,
    sn_diff: PropTypes.string,
    cola: PropTypes.string,
    consumables: PropTypes.string,
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

PostMissionData.defaultProps = {
  post: {},
};

export default PostMissionData;
