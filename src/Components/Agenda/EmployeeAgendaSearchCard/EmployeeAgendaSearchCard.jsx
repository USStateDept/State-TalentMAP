import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import { Handshake } from 'Components/Ribbon';
import LinkButton from 'Components/LinkButton';
import { get, isNil } from 'lodash';
import BoxShadow from 'Components/BoxShadow';
import { formatDate } from 'utilities';

export const FALLBACK = 'None listed';

const EmployeeAgendaSearchCard = ({ isCDO, result, showCreate, viewType }) => {
  // will need to update during integration
  const { person, currentAssignment, hsAssignment, agenda } = result;
  const agendaStatus = get(agenda, 'status') || FALLBACK;
  // const author = get(result, 'author') || 'Coming soon';
  const bidder = get(person, 'fullName') || FALLBACK;
  const cdo = get(person, 'cdo.name') || FALLBACK;
  const currentPost = get(currentAssignment, 'orgDescription') || FALLBACK;
  const futurePost = get(hsAssignment, 'orgDescription') || FALLBACK;
  const panelDate = get(agenda, 'panelDate') ? formatDate(agenda.panelDate) : FALLBACK;
  const showHandshakeIcon = get(result, 'hsAssignment.orgDescription') || false;
  const ted = get(currentAssignment, 'TED') ? formatDate(currentAssignment.TED) : FALLBACK;
  const perdet = get(person, 'perdet', '');
  const userRole = isCDO ? 'cdo' : 'ao';
  const employeeID = get(person, 'employeeID', '') || FALLBACK;

  // handles error where some employees have no Profile
  const employeeHasCDO = !isNil(get(person, 'cdo'));


  let profileLink;
  switch (viewType) {
    case 'ao':
      profileLink = employeeHasCDO ? <Link to={`/profile/public/${perdet}/ao`}>{bidder}</Link> : bidder;
      break;
    case 'cdo':
      profileLink = isCDO && employeeHasCDO ? <Link to={`/profile/public/${perdet}`}>{bidder}</Link> : bidder;
      break;
    default:
      profileLink = bidder;
      break;
  }

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
            {profileLink}
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
            <dd>{ted}</dd>
          </div>
          <div className="employee-card-data-point">
            <FA name="user-o" />
            <dt>CDO:</dt>
            <dd>{cdo}</dd>
          </div>
        </div>
        {/*
          // TODO - do we want to include and/or filter by Author?
          <div className="employee-card-data-point">
          <FA name="pencil-square" />
          <dt>Author:</dt>
          <dd>{author}</dd>
        </div>
        */}
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
          {
            !!showCreate &&
            <div className="button-box-container">
              <LinkButton className="button-box" toLink={`/profile/${userRole}/createagendaitem/${perdet}`}>Create Agenda Item</LinkButton>
            </div>
          }
        </div>
      </div>
    </BoxShadow>
  );
};

EmployeeAgendaSearchCard.propTypes = {
  isCDO: PropTypes.bool,
  result: PropTypes.PropTypes.shape({
    person: PropTypes.shape({}),
    currentAssignment: PropTypes.shape({
      TED: PropTypes.string,
    }),
    hsAssignment: PropTypes.shape({}),
    agenda: PropTypes.shape({
      panelDate: PropTypes.string,
    }),
  }),
  showCreate: PropTypes.bool,
  viewType: PropTypes.string,
};

EmployeeAgendaSearchCard.defaultProps = {
  isCDO: false,
  result: {},
  showCreate: true,
  viewType: '',
};

export default EmployeeAgendaSearchCard;
