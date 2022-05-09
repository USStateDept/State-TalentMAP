import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { checkFlag } from 'flags';
import { NO_GRADE, NO_LANGUAGE, NO_POST, NO_TOUR_END_DATE } from 'Constants/SystemMessages';
import { formatDate } from 'utilities';
import { BIDDER_OBJECT, CLASSIFICATIONS } from '../../../Constants/PropTypes';
import SkillCodeList from '../../SkillCodeList';
import ClientBadgeList from '../ClientBadgeList';
import CheckboxList from '../CheckboxList';
import SearchAsClientButton from '../SearchAsClientButton';
import AddToInternalListButton from '../AddToInternalListButton';

const useAvailableBidders = () => checkFlag('flags.available_bidders');

const BidderPortfolioStatRow = ({ userProfile, showEdit, classifications }) => {
  const currentAssignmentText = get(userProfile, 'pos_location');
  const clientClassifications = get(userProfile, 'classifications');
  const perdet = get(userProfile, 'perdet_seq_number');
  const id = get(userProfile, 'employee_id');
  const ted = formatDate(get(userProfile, 'current_assignment.end_date'));
  const languages = get(userProfile, 'current_assignment.position.language');
  return (
    <div className="usa-grid-full bidder-portfolio-stat-row">
      <div className="stat-card-data-point stat-card-data-point--name">
        {get(userProfile, 'name', 'N/A')}
        <Link to={`/profile/public/${perdet}`}>View Profile</Link>
      </div>
      <div>
        <div>
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
            <dt>Location:</dt><dd>{currentAssignmentText || NO_POST}</dd>
          </div>
        </div>
        {
          !showEdit &&
          <div className="bidder-portfolio-stat-row-updates">
            <h4>Classifications: </h4>
            <ClientBadgeList
              clientClassifications={clientClassifications}
              classifications={classifications}
            />
          </div>
        }
        {
          !showEdit && 
          <div className="button-container">
            <SearchAsClientButton user={userProfile} />
            { useAvailableBidders() && <AddToInternalListButton refKey={perdet} /> }
          </div>
        }
        {
          showEdit &&
          <CheckboxList id={userProfile.id} />
        }
      </div>
    </div>
  );
};

BidderPortfolioStatRow.propTypes = {
  userProfile: BIDDER_OBJECT.isRequired,
  showEdit: PropTypes.bool,
  classifications: CLASSIFICATIONS,
};

BidderPortfolioStatRow.defaultProps = {
  showEdit: false,
  classifications: [],
};

export default BidderPortfolioStatRow;
