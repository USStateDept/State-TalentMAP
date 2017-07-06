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
            Location: {post.description}
            <br />
            Tour of duty: {post.tour_of_duty}
            <br />
            Type: Embassy*
            <br />
            POC: John Doe*
            <br />
            Code: {post.code}
            <br />
            Language: <span>{languageList}</span>
            <br />
            R&R Alignment: {post.rest_relaxation_point}
            <br />
            Danger Pay: {post.danger_pay}
            <br />
            Post Differential: {post.differential_rate}
            <br />
            Service Needs Differential: {post.has_service_needs_differential === true ? 'Yes' : 'No'}
            <br />
            COLA: {post.cost_of_living_adjustment}
            <br />
            Consumables: {post.has_consumable_allowance === true ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    );
  }
}

PostMissionData.propTypes = {
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

PostMissionData.defaultProps = {
  post: {},
};

export default PostMissionData;
