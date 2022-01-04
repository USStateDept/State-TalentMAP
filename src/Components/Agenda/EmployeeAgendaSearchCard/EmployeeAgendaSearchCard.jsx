import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import { Handshake } from 'Components/Ribbon';
import LinkButton from 'Components/LinkButton';
import { get } from 'lodash';
import { format, isDate } from 'date-fns-v2';
import BoxShadow from '../../BoxShadow';

const EmployeeAgendaSearchCard = ({ isCDO, result }) => {
  // will need to update during integration
  const { person, currentAssignment } = result;
  const agendaStatus = get(result, 'agendaStatus') || 'Coming soon';
  const author = get(result, 'author') || 'Coming soon';
  const bidder = get(person, 'fullName') || 'None listed';
  const cdo = get(result, 'cdo') || 'Coming soon';
  const currentPost = get(currentAssignment, 'orgDescription') || 'None listed';
  const futurePost = get(result, 'futurePost') || 'Coming soon';
  const panelDate = get(result, 'panelDate') || 'Coming soon';
  const showHandshakeIcon = get(result, 'hs_accepted') || false;
  const ted = get(currentAssignment, 'TED') || '';
  const perdet = get(person, 'perdet', '');
  const userRole = isCDO ? 'cdo' : 'ao';
  const hideCreate = true;
  const employeeID = get(person, 'employeeID', '');

  const formatDate = (d) => isDate(new Date(d)) ? format(new Date(d), 'MM/yy') : 'None listed';

  return (
    <BoxShadow className="employee-agenda-stat-card">
      <div className="employee-agenda-card-inner">
        <div className="employee-agenda-card-top">
          <div className="employee-ribbon-container">
            <div className="ribbon-container-condensed">
              {showHandshakeIcon &&
                  <Tooltip
                    title="Handshake"
                    arrow
                    offset={-60}
                  >
                    <Handshake showText={false} className="ribbon-condensed-card" />
                  </Tooltip>
              }
            </div>
          </div>
        </div>
        <div>
          <h3>
            { isCDO ? <Link to={`/profile/public/${perdet}`}>{bidder}</Link> : bidder }
          </h3>
        </div>
        <div className="employee-agenda-card-data-point-top">
          <div className="employee-card-data-point">
            <FA name="id-badge" />
            <dt>ID:</dt>
            <dd>{employeeID}</dd>
          </div>
          <div className="employee-card-data-point">
            <FA name="building-o" />
            <dt>Org:</dt>
            <dd>
              {currentPost}
              <FA className="org-fa-arrow" name="long-arrow-right" />
              {futurePost}
            </dd>
          </div>
          <div className="employee-card-data-point">
            <FA name="clock-o" />
            <dt>TED:</dt>
            <dd>{ted ? formatDate(ted) : 'None listed'}</dd>
          </div>
          <div className="employee-card-data-point">
            <FA name="user-o" />
            <dt>CDO:</dt>
            <dd>{cdo}</dd>
          </div>
        </div>
        <div className="employee-card-data-point">
          <FA name="pencil-square" />
          <dt>Author:</dt>
          <dd>{author}</dd>
        </div>
        <div className="employee-card-data-point">
          <FA name="calendar-o" />
          <dt>Panel Meeting Date:</dt>
          <dd>{panelDate}</dd>
        </div>
        <div className="employee-card-data-point">
          <FA name="sticky-note-o" />
          <dt>Agenda Status:</dt>
          <dd>{agendaStatus}</dd>
        </div>
      </div>
      <div className="employee-agenda-card-bottom">
        <div className="button-container">
          <div className="view-agenda-item-container">
            <LinkButton className="view-agenda-item-button" toLink={`/profile/${userRole}/agendaitemhistory/${perdet}`}>View History</LinkButton>
          </div>
          <div className="create-ai-box-container">
            {!hideCreate &&
              <LinkButton className="create-ai-box-button" toLink="#">Create Agenda Item</LinkButton>
            }
          </div>
        </div>
      </div>
    </BoxShadow>
  );
};

EmployeeAgendaSearchCard.propTypes = {
  isCDO: PropTypes.bool,
  result: PropTypes.PropTypes.shape({ person: {}, currentAssignment: {} }),
};

EmployeeAgendaSearchCard.defaultProps = {
  isCDO: false,
  result: {},
};

export default EmployeeAgendaSearchCard;
