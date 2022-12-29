import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { BIDDER_OBJECT, CLASSIFICATIONS } from 'Constants/PropTypes';
import { NO_GRADE, NO_LANGUAGE, NO_POST, NO_TOUR_END_DATE } from 'Constants/SystemMessages';
import { formatDate } from 'utilities';
import BoxShadow from '../../BoxShadow';
import SkillCodeList from '../../SkillCodeList';
import ClientBadgeList from '../ClientBadgeList';
import SearchAsClientButton from '../SearchAsClientButton';
import AddToInternalListButton from '../AddToInternalListButton';

const BidderPortfolioStatCard = ({ userProfile, classifications }) => {
  const currentAssignmentText = get(userProfile, 'pos_location');
  const clientClassifications = get(userProfile, 'classifications');
  const perdet = get(userProfile, 'perdet_seq_number');
  const id = get(userProfile, 'employee_id');
  const ted = formatDate(get(userProfile, 'current_assignment.end_date'));
  const languages = get(userProfile, 'current_assignment.position.language');
  const bidder = get(userProfile, 'shortened_name') || 'None listed';

  const orgShort = get(userProfile, 'current_assignment.position.organization');
  const orgLong = get(userProfile, 'current_assignment.position.organization_long');
  const orgDesc = `(${orgShort}) ${orgLong}`;
  console.log(userProfile);
  return (
    <BoxShadow className="usa-grid-full bidder-portfolio-stat-card">
      <div className="bidder-portfolio-stat-card-top">
        <div>
          <h3>
            <Link to={`/profile/public/${perdet}`}>{bidder}</Link>
          </h3>
        </div>
        <div className="stat-card-data-point">
          <dt>Employee ID:</dt><dd>{id}</dd>
        </div>
        <div className="stat-card-data-point">
          <dt>Skill:</dt><dd><SkillCodeList skillCodes={userProfile.skills} /></dd>
        </div>
        <div className="stat-card-data-point">
          <dt>Grade:</dt><dd>{userProfile.grade || NO_GRADE}</dd>
        </div>
        <div className="stat-card-data-point">
          <dt>Languages:</dt><dd>{languages || NO_LANGUAGE}</dd>
        </div>
        <div className="stat-card-data-point">
          <dt>TED:</dt><dd>{ted || NO_TOUR_END_DATE}</dd>
        </div>
        <div className="stat-card-data-point">
          <dt>Location (Org):</dt><dd>{currentAssignmentText || NO_POST} {orgDesc}</dd>
        </div>
      </div>
      <div className="bidder-portfolio-stat-card-bottom">
        <div>
          <span className="updates">Classifications: </span>
          <ClientBadgeList
            clientClassifications={clientClassifications}
            classifications={classifications}
          />
        </div>
        <div className="button-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <SearchAsClientButton user={userProfile} />
          <AddToInternalListButton refKey={perdet} />
        </div>
      </div>
    </BoxShadow>
  );
};

BidderPortfolioStatCard.propTypes = {
  userProfile: BIDDER_OBJECT.isRequired,
  classifications: CLASSIFICATIONS,
};

BidderPortfolioStatCard.defaultProps = {
  classifications: [],
};

export default BidderPortfolioStatCard;
