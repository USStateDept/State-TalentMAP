import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BidderPortfolioSearch from '../../../Components/BidderPortfolio/BidderPortfolioSearch';
import ProfileSectionTitle from '../../ProfileSectionTitle';

const EmployeeAgendaSearch = ({ isCDO }) => {
  const user = isCDO ? 'cdo' : 'ao';

  return (
    <div>
      <div className="bidder-portfolio-page card-view">
        <div className="usa-grid-full results-search-bar-container">
          <ProfileSectionTitle title="Employee Agenda Search" icon="user-circle-o" />
          <BidderPortfolioSearch />
        </div>
        <div className="usa-grid-full bidder-portfolio-container profile-content-inner-container">
          <div className="usa-grid-full">
            <h4>
              <Link to={`/profile/${user}/agendaitemhistory/perdet`}>View Employee History</Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

EmployeeAgendaSearch.propTypes = {
  isCDO: PropTypes.bool,
};

EmployeeAgendaSearch.defaultProps = {
  isCDO: false,
};

export default EmployeeAgendaSearch;
