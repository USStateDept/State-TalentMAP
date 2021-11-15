import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EmployeeAgendaSearch = ({ isCDO }) => {
  const user = isCDO ? 'cdo' : 'ao';

  return (
    <div>
      <h1>
        Employee Agenda Search
      </h1>
      <h4>
        <Link to={`/profile/${user}/agendaitemhistory/perdet`}>View History</Link>
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
