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
          <strong>POST DESCRIPTION</strong>
          <br />
          <div className="usa-width-one-whole">
            <PositionDetailsDataPoint
              title="ORGANIZATION"
              description={details.organization || SystemMessages.NO_ORG}
            />
            <PositionDetailsDataPoint
              title="POST"
              description={
                details.post && details.post.id ?
                  <Link to={`/post/${details.post.id}`}>{details.post.description}</Link>
                  : SystemMessages.NO_POST
              }
            />
            <PositionDetailsDataPoint
              title="BUREAU"
              description={details.bureau || SystemMessages.NO_BUREAU}
            />
            <PositionDetailsDataPoint
              title="POST DIFFERENTIAL"
              description={
                details.post && details.post.differential_rate ?
                  details.post.differential_rate
                  : SystemMessages.NO_POST_DIFFERENTIAL
              }
            />
            <PositionDetailsDataPoint
              title="OVERSEAS"
              description={details.is_overseas ? 'Yes' : 'No'}
            />
            <PositionDetailsDataPoint
              title="REGION"
              description="REGION"
            />
          </div>
        </div>
        <hr width="85%" />
        <div className="usa-width-one-whole position-details-description">
          <strong>POSITION DESCRIPTION</strong>
          <br />
          <div className="usa-width-one-whole">
            <PositionDetailsDataPoint
              title="GRADE"
              description={details.grade}
            />
            <PositionDetailsDataPoint
              title="LANGUAGE"
              description={<LanguageList languages={details.languages} />}
            />
            <PositionDetailsDataPoint
              title="SKILLS"
              description="Information Management"
            />
            <PositionDetailsDataPoint
              title="DANGER PAY"
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
