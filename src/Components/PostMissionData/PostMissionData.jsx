import React from 'react';
import { POST_MISSION_DATA } from '../../Constants/PropTypes';
import { NO_REST_RELAXATION } from '../../Constants/SystemMessages';
import LanguageList from '../LanguageList/LanguageList';
import OBCUrl from '../OBCUrl';

const PostMissionData = ({ post }) => (
  <div className="usa-grid-full">
    <div>
      <p>
        {
          post.obc_id &&
            <span>
              <OBCUrl id={post.obc_id} />
              <br />
            </span>
        }
        Location: {post.location}
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
        R&R Alignment: {post.rest_relaxation_point ?
          post.rest_relaxation_point : NO_REST_RELAXATION}
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
