import React from 'react';
import { Link } from 'react-router-dom';
import { NO_ORG, NO_POST, NO_BUREAU, NO_POST_DIFFERENTIAL,
  NO_DANGER_PAY, NO_END_DATE, NO_USER_LISTED } from '../../Constants/SystemMessages';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import LanguageList from '../../Components/LanguageList/LanguageList';
import PositionDetailsDataPoint from '../../Components/PositionDetailsDataPoint/PositionDetailsDataPoint';
import StaticDevContent from '../StaticDevContent';
import { formatDate, propOrDefault } from '../../utilities';

const PositionDetailsItem = ({ details }) => {
  const tourEndDate = propOrDefault(details, 'current_assignment.estimated_end_date');
  const formattedTourEndDate = tourEndDate ? formatDate(tourEndDate) : NO_END_DATE;

  const formattedPost = propOrDefault(details, 'post.id') ?
    <Link to={`/obc/post/${details.post.id}`}>{details.post.location}</Link> : NO_POST;

  const formattedBureau = details.bureau || NO_BUREAU;

  const formattedDifferential = propOrDefault(details, 'post.differential_rate', NO_POST_DIFFERENTIAL);

  const formattedOverseas = details.is_overseas ? 'Yes' : 'No';

  const formattedDangerPay = propOrDefault(details, 'post.danger_pay', NO_DANGER_PAY);

  const formattedIncumbent = propOrDefault(details, 'current_assignment.user', NO_USER_LISTED);

  const formattedOrganization = details.organization || NO_ORG;
  return (
    <div className="usa-grid-full">
      <div className="usa-width-one-whole">
        <div className="position-details-description-container">
          <div className="usa-width-one-whole position-details-description">
            <span className="position-details-description-title">Post Description</span>
            <br />
            <div className="usa-width-one-whole">
              <PositionDetailsDataPoint
                title="Organization"
                description={formattedOrganization}
              />
              <PositionDetailsDataPoint
                title="Post"
                description={formattedPost}
              />
              <PositionDetailsDataPoint
                title="Bureau"
                description={formattedBureau}
              />
              <PositionDetailsDataPoint
                title="Post Differential"
                description={formattedDifferential}
              />
              <PositionDetailsDataPoint
                title="Overseas"
                description={formattedOverseas}
              />
              <PositionDetailsDataPoint
                title="Region"
                description={<StaticDevContent><span>Region</span></StaticDevContent>}
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
                description={formattedDangerPay}
              />
              <PositionDetailsDataPoint
                title="Estimated End Date"
                description={formattedTourEndDate}
              />
              <PositionDetailsDataPoint
                title="Incumbent"
                description={formattedIncumbent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PositionDetailsItem.propTypes = {
  details: POSITION_DETAILS,
};

PositionDetailsItem.defaultProps = {
  details: null,
};

export default PositionDetailsItem;
