import React from 'react';
import { Link } from 'react-router-dom';
import { get, orderBy } from 'lodash';
import FA from 'react-fontawesome';
import { BIDDER_OBJECT } from '../../../Constants/PropTypes';
import BoxShadow from '../../BoxShadow';
import SkillCodeList from '../../SkillCodeList';
import { getPostName } from '../../../utilities';
import { NO_POST, NO_GRADE } from '../../../Constants/SystemMessages';
import ClientBadgeList from '../ClientBadgeList';
import StaticDevContent from '../../StaticDevContent';

const BidderPortfolioStatCard = ({ userProfile }) => {
  const sortedAssignments = orderBy(userProfile.assignments, 'start_date', 'desc');
  const currentAssignment = get(sortedAssignments, '[0].position.post');
  const currentAssignmentText = getPostName(currentAssignment, NO_POST);
  return (
    <BoxShadow className="usa-grid-full bidder-portfolio-stat-card">
      <div className="bidder-portfolio-stat-card-top">
        <div>
          <h3>
            <Link to={`/profile/public/${userProfile.id}`}>
              {`${userProfile.user.first_name} ${userProfile.user.last_name}`}
              <FA name="angle-right" />
            </Link>
          </h3>
        </div>
        <div className="stat-card-data-point">
          <dt>Skill:</dt><dd><SkillCodeList skillCodes={userProfile.skills} /></dd>
        </div>
        <div className="stat-card-data-point">
          <dt>Grade:</dt><dd>{userProfile.grade || NO_GRADE}</dd>
        </div>
        <div className="stat-card-data-point">
          <dt>Post:</dt><dd>{currentAssignmentText}</dd>
        </div>
      </div>
      <div className="bidder-portfolio-stat-card-bottom">
        <div>
          <span>Updates</span>
          <StaticDevContent>
            <ClientBadgeList
              statuses={{
                handshake: 1,
                sixeight: 0,
                fairshare: 1,
                retirement: 2,
              }}
            />
          </StaticDevContent>
        </div>
      </div>
    </BoxShadow>
  );
};

BidderPortfolioStatCard.propTypes = {
  userProfile: BIDDER_OBJECT.isRequired,
};

export default BidderPortfolioStatCard;
