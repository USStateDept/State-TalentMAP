import React from 'react';
import { POST_MISSION_DATA } from '../../Constants/PropTypes';
import LanguageList from '../LanguageList/LanguageList';

const PostMissionData = ({ post }) => (
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
        Language: <LanguageList languages={post.language} />
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

PostMissionData.propTypes = {
  post: POST_MISSION_DATA,
};

PostMissionData.defaultProps = {
  post: {},
};

export default PostMissionData;
