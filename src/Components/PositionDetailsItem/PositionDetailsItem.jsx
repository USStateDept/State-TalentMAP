import React from 'react';
import { Link } from 'react-router-dom';
import * as SystemMessages from '../../Constants/SystemMessages';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import LanguageList from '../../Components/LanguageList/LanguageList';
import PositionDetailsDataPoint from '../../Components/PositionDetailsDataPoint/PositionDetailsDataPoint';

const PositionDetailsItem = ({ details }) => (
  <div className="usa-grid-full">
    <div className="usa-width-one-whole">
      <div className="position-details-description-container">
        <div className="usa-width-one-whole position-details-description">
          <span className="position-details-description-title">Post Description</span>
          <br />
          <div className="usa-width-one-whole">
            <PositionDetailsDataPoint
              title="Organization"
              description={details.organization || SystemMessages.NO_ORG}
            />
            <PositionDetailsDataPoint
              title="Post"
              description={
                details.post && details.post.id ?
                  <Link to={`/post/${details.post.id}`}>{details.post.location}</Link>
                  : SystemMessages.NO_POST
              }
            />
            <PositionDetailsDataPoint
              title="Bureau"
              description={details.bureau || SystemMessages.NO_BUREAU}
            />
            <PositionDetailsDataPoint
              title="Post Differential"
              description={
                details.post && details.post.differential_rate ?
                  details.post.differential_rate
                  : SystemMessages.NO_POST_DIFFERENTIAL
              }
            />
            <PositionDetailsDataPoint
              title="Overseas"
              description={details.is_overseas ? 'Yes' : 'No'}
            />
            <PositionDetailsDataPoint
              title="Region"
              description="Region"
            />
          </div>
        </div>
        <hr width="85%" />
        <div className="usa-width-one-whole position-details-description">
          <span className="position-details-description-title">Position Description</span>
          <br />
          <div className="usa-width-one-whole">
            <PositionDetailsDataPoint
              title="Grade"
              description={details.grade}
            />
            <PositionDetailsDataPoint
              title="Language"
              description={<LanguageList languages={details.languages} />}
            />
            <PositionDetailsDataPoint
              title="Skill Code"
              description={details.skill}
            />
            <PositionDetailsDataPoint
              title="Danger Pay"
              description={details.post ? details.post.danger_pay : SystemMessages.NO_DANGER_PAY}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

PositionDetailsItem.propTypes = {
  details: POSITION_DETAILS,
};

PositionDetailsItem.defaultProps = {
  details: null,
};

export default PositionDetailsItem;
