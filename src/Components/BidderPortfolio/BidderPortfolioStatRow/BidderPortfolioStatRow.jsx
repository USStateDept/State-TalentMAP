import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { checkFlag } from 'flags';
import { BIDDER_OBJECT } from '../../../Constants/PropTypes';
import SkillCodeList from '../../SkillCodeList';
import { NO_GRADE, NO_POST } from '../../../Constants/SystemMessages';
import ClientBadgeList from '../ClientBadgeList';
import StaticDevContent from '../../StaticDevContent';
import CheckboxList from '../CheckboxList';
import SearchAsClientButton from '../SearchAsClientButton';

const useCDOBidding = () => checkFlag('flags.cdo_bidding');

const BidderPortfolioStatRow = ({ userProfile, showEdit }) => {
  const currentAssignmentText = get(userProfile, 'pos_location_code');
  return (
    <div className="usa-grid-full bidder-portfolio-stat-row">
      <div className="stat-card-data-point stat-card-data-point--name">
        {get(userProfile, 'name', 'N/A')}
        <Link to={`/profile/public/${userProfile.perdet_seq_number}`}>View Profile</Link>
      </div>
      <div>
        <div>
          <div className="stat-card-data-point">
            <dt>Skill:</dt><dd><SkillCodeList skillCodes={userProfile.skills} /></dd>
          </div>
          <div className="stat-card-data-point">
            <dt>Grade:</dt><dd>{userProfile.grade || NO_GRADE}</dd>
          </div>
          <div className="stat-card-data-point">
            <dt>Location:</dt><dd>{currentAssignmentText || NO_POST}</dd>
          </div>
        </div>
        {
          !showEdit &&
          <div className="bidder-portfolio-stat-row-updates">
            <StaticDevContent>
              <h4>Bidder Classifications</h4>
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
        }
        {
          !showEdit && useCDOBidding() &&
          <div className="button-container">
            <SearchAsClientButton user={userProfile} />
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
};

BidderPortfolioStatRow.defaultProps = {
  showEdit: false,
};

export default BidderPortfolioStatRow;
