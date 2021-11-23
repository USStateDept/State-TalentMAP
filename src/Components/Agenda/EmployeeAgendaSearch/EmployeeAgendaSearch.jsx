import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileSectionTitle from '../../ProfileSectionTitle';

const EmployeeAgendaSearch = ({ isCDO }) => {
  const userRole = isCDO ? 'cdo' : 'ao';

  return (
    <div className="usa-grid-full profile-content-inner-container">
      <ProfileSectionTitle title="Employee Agenda Search" icon="user-circle-o" />
      <h4>
        <Link to={`/profile/${userRole}/agendaitemhistory/perdet`}>View Employee History</Link>
      </h4>
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
