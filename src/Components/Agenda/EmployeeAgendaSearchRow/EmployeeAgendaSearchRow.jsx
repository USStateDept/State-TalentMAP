import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import LinkButton from 'Components/LinkButton';
import { get } from 'lodash';
import { format, isDate } from 'date-fns-v2';

const EmployeeAgendaSearchRow = ({ isCDO, result }) => {
  // will need to update during integration
  const { person, currentAssignment } = result;
  const agendaStatus = get(result, 'agendaStatus') || 'Coming soon';
  const author = get(result, 'author') || 'Coming soon';
  const bidder = get(person, 'fullName') || 'None listed';
  const cdo = get(result, 'cdo') || 'Coming soon';
  const currentPost = get(currentAssignment, 'orgDescription') || 'None listed';
  const futurePost = get(result, 'futurePost') || 'Coming soon';
  const initials = get(person, 'initials') || '';
  const panelDate = get(result, 'panelDate') || 'Coming soon';
  const ted = get(currentAssignment, 'TED') || '';
  const userRole = isCDO ? 'cdo' : 'ao';
  const perdet = get(person, 'perdet', '');
  const hideCreate = true;
  const employeeID = get(person, 'employeeID', '');

  const formatDate = (d) => isDate(new Date(d)) ? format(new Date(d), 'MM/yy') : 'None listed';

  return (
    <div className="usa-grid-full employee-agenda-stat-row">
      <div className="initials-circle-container">
        <div className="initials-circle">
          {initials}
        </div>
      </div>
      <div className="employee-agenda-row-name">
        {
          isCDO ?
            <Link to={`/profile/public/${perdet}`}>{bidder} ({employeeID})</Link> :
            <div className="row-name">{bidder} ({employeeID})</div>
        }
      </div>
      <div className="employee-agenda-row-data-container">
        <div className="employee-agenda-row-data-points">
          <div className="employee-agenda-row-data-point">
            <FA name="building-o" />
            <dt>Org:</dt>
            <dd>
              {currentPost}
              <FA className="org-fa-arrow" name="long-arrow-right" />
              {futurePost}</dd>
          </div>
          <div className="employee-agenda-row-data-point">
            <FA name="clock-o" />
            <dt>TED:</dt>
            <dd>{ted ? formatDate(ted) : 'None listed'}</dd>
          </div>
          <div className="employee-agenda-row-data-point">
            <FA name="user-o" />
            <dt>CDO:</dt>
            <dd>{cdo}</dd>
          </div>
          <div className="employee-agenda-row-data-point">
            <FA name="pencil-square" />
            <dt>Author:</dt>
            <dd>{author}</dd>
          </div>
          <div className="employee-agenda-row-data-point">
            <FA name="calendar-o" />
            <dt>Panel Meeting Date:</dt>
            <dd>{panelDate}</dd>
          </div>
          <div className="employee-agenda-row-data-point">
            <FA name="sticky-note-o" />
            <dt>Agenda Status:</dt>
            <dd>{agendaStatus}</dd>
          </div>
        </div>
        <div className="button-container">
          <div className="view-agenda-item-container">
            <LinkButton className="view-agenda-item-button" toLink={`/profile/${userRole}/agendaitemhistory/${perdet}`}>View History</LinkButton>
          </div>
          <div className="create-ai-box-container">
            {
              !hideCreate &&
                <LinkButton className="create-ai-box-button" toLink="#">Create Agenda Item</LinkButton>
            }
          </div>
        </div>

      </div>
    </div>
  );
};

EmployeeAgendaSearchRow.propTypes = {
  isCDO: PropTypes.bool,
  result: PropTypes.PropTypes.shape({ person: {}, currentAssignment: {} }),
};

EmployeeAgendaSearchRow.defaultProps = {
  isCDO: false,
  result: {},
};

export default EmployeeAgendaSearchRow;
