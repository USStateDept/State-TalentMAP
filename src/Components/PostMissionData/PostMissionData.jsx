import React from 'react';
import * as AlertMessages from '../../Constants/AlertMessages';
import { POST_MISSION_DATA } from '../../Constants/PropTypes';

const PostMissionData = ({ post }) => {
  const languageList = (post.languages && post.languages.length)
      ? post.languages.map(choice => (
        `${choice.language} `
      )) : AlertMessages.NO_LANGUAGES;
  return (
    <div className="usa-grid-full">
      <div>
        <p>
            Location: {post.description}
          <br />
            Tour of duty: {post.tour_of_duty}
          <br />
            Type: Embassy {/* TODO replace hard-coded value with API value */}
          <br />
            POC: John Doe {/* TODO replace hard-coded value with API value */}
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
};

PostMissionData.propTypes = {
  post: POST_MISSION_DATA,
};

PostMissionData.defaultProps = {
  post: {},
};

export default PostMissionData;
