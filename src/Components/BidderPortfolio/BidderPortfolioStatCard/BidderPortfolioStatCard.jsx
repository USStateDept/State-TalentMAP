import React from 'react';
import { get, orderBy } from 'lodash';
import { BIDDER_OBJECT } from '../../../Constants/PropTypes';
import BoxShadow from '../../BoxShadow';
import SkillCodeList from '../../SkillCodeList';
import { getPostName } from '../../../utilities';
import { NO_POST, NO_GRADE } from '../../../Constants/SystemMessages';
import ClientBadgeList from '../ClientBadgeList';
import StaticDevContent from '../../StaticDevContent';
import SearchAsClientButton from '../SearchAsClientButton';
import LinkButton from '../../LinkButton';

const BidderPortfolioStatCard = ({ userProfile }) => {
  const sortedAssignments = orderBy(userProfile.assignments, 'start_date', 'desc');
  const currentAssignment = get(sortedAssignments, '[0].position.post');
  const currentAssignmentText = getPostName(currentAssignment, NO_POST);
  return (
    <BoxShadow className="usa-grid-full bidder-portfolio-stat-card">
      <div className="bidder-portfolio-stat-card-top">
        <div>
          <h3>
            {`${userProfile.user.first_name} ${userProfile.user.last_name}`}
          </h3>
        </div>
        <div className="stat-card-data-point">
          <dt>Skill:</dt><dd><SkillCodeList skillCodes={userProfile.skills} /></dd>
        </div>
        <div className="stat-card-data-point">
          <dt>Grade:</dt><dd>{userProfile.grade || NO_GRADE}</dd>
        </div>
        <div className="stat-card-data-point">
          <dt>Location:</dt><dd>{currentAssignmentText}</dd>
        </div>
      </div>
      <div className="bidder-portfolio-stat-card-bottom">
        <div>
          <span className="updates">Updates</span>
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
        <div className="button-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <LinkButton toLink={`/profile/public/${userProfile.id}`} className="usa-button-secondary">View Profile</LinkButton>
          <SearchAsClientButton id={userProfile.id} />
        </div>
      </div>
    </BoxShadow>
  );
};

BidderPortfolioStatCard.propTypes = {
  userProfile: BIDDER_OBJECT.isRequired,
};

export default BidderPortfolioStatCard;
