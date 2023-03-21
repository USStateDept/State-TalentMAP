import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import { Handshake } from 'Components/Ribbon';
import LinkButton from 'Components/LinkButton';
import { get, isNil } from 'lodash';
import { formatDate } from 'utilities';
import { checkFlag } from 'flags';
import { FALLBACK } from '../EmployeeAgendaSearchCard/EmployeeAgendaSearchCard';

const useAgendaItemHistory = () => checkFlag('flags.agenda_item_history');
const useAgendaItemMaintenance = () => checkFlag('flags.agenda_item_maintenance');
const usePanelMeetingsAgendas = () => checkFlag('flags.panel_meeting_agendas');

const EmployeeAgendaSearchRow = ({ isCDO, result, showCreate, viewType }) => {
  const showAgendaItemHistory = useAgendaItemHistory();
  const showAgendaItemMaintenance = useAgendaItemMaintenance();
  const showPanelMeetingsAgendas = usePanelMeetingsAgendas();

  // will need to update during integration
  const { person, currentAssignment, hsAssignment, agenda } = result;
  const agendaStatus = get(agenda, 'status') || FALLBACK;
  // const author = get(result, 'author') || 'Coming soon';
  const bidder = get(person, 'fullName') || FALLBACK;
  const cdo = get(person, 'cdo.name') || FALLBACK;
  const currentCity = get(currentAssignment, 'locationCity') ? `${get(currentAssignment, 'locationCity')},` : '';
  const currentCountry = get(currentAssignment, 'locationCountry') || '';
  const currentOrg = get(currentAssignment, 'orgDescription') ? `(${get(currentAssignment, 'orgDescription')})` : '';
  const hsCity = get(hsAssignment, 'locationCity') ? `${get(hsAssignment, 'locationCity')},` : '';
  const hsCountry = get(hsAssignment, 'locationCountry') || '';
  const hsOrg = get(hsAssignment, 'orgDescription') ? `(${get(hsAssignment, 'orgDescription')})` : '';
  const initials = get(person, 'initials') || '';
  const panelDate = get(agenda, 'panelDate') ? formatDate(agenda.panelDate) : FALLBACK;
  const showHandshakeIcon = get(result, 'hsAssignment.orgDescription') || false;
  const ted = get(currentAssignment, 'TED') ? formatDate(currentAssignment.TED) : FALLBACK;
  const perdet = get(person, 'perdet', '');
  const userRole = isCDO ? 'cdo' : 'ao';
  const employeeID = get(person, 'employeeID', '') || FALLBACK;
  const pmSeqNum = get(agenda, 'pmSeqfNum') || FALLBACK;
  const panelMeetingExist = (panelDate !== FALLBACK) && (pmSeqNum !== FALLBACK);
  const agendaID = get(agenda, 'agendaID') || FALLBACK;
  const agendaIDExist = (agendaID !== FALLBACK);

  // handles error where some employees have no Profile
  const employeeHasCDO = !isNil(get(person, 'cdo'));
  const currentPost = (currentCity || currentCountry || currentOrg) ? `${currentCity} ${currentCountry} ${currentOrg}` : FALLBACK;
  const hsPost = (hsCity || hsCountry || hsOrg) ? `${hsCity} ${hsCountry} ${hsOrg}` : FALLBACK;

  let profileLink;
  switch (viewType) {
    case 'ao':
      profileLink = employeeHasCDO ? <Link to={`/profile/public/${perdet}/ao`}>{bidder} ({employeeID})</Link>
        : <div className="row-name">{bidder} ({employeeID})</div>;
      break;
    case 'cdo':
      profileLink = isCDO && employeeHasCDO ? <Link to={`/profile/public/${perdet}`}>{bidder} ({employeeID})</Link>
        : <div className="row-name">{bidder} ({employeeID})</div>;
      break;
    default:
      profileLink = <div className="row-name">{bidder} ({employeeID})</div>;
      break;
  }

  return (
    <div className="usa-grid-full employee-agenda-stat-row">
      <div className="initials-circle-container">
        <div className="initials-circle">
          {initials}
        </div>
      </div>
      <div className="employee-agenda-card-top">
        <div className="employee-ribbon-container">
          <div className="ribbon-container-condensed">
            {showHandshakeIcon &&
                <Handshake />
            }
          </div>
        </div>
      </div>
      <div className="employee-agenda-row-name">
        {profileLink}
      </div>
      <div className="employee-agenda-row-data-container">
        <div className="employee-agenda-row-data-points">
          <div className="employee-agenda-row-data-point">
            <FA name="building-o" />
            <dt className="location-label-row">Location (Org):</dt>
            <dd>
              {currentPost}
              <FA className="org-fa-arrow" name="long-arrow-right" />
              {hsPost}</dd>
          </div>
          <div className="employee-agenda-row-data-point">
            <FA name="clock-o" />
            <dt>TED:</dt>
            <dd>{ted}</dd>
          </div>
          <div className="employee-agenda-row-data-point">
            <FA name="user-o" />
            <dt>CDO:</dt>
            <dd>{cdo}</dd>
          </div>
          {/*
            // TODO - do we want to include and/or filter by Author?
            <div className="employee-agenda-row-data-point">
            <FA name="pencil-square" />
            <dt>Author:</dt>
            <dd>{author}</dd>
          </div>
          */}
          <div className="employee-agenda-row-data-point">
            <FA name="calendar" />
            <dt>Panel Date:</dt>
            {
              (showPanelMeetingsAgendas && panelMeetingExist) ?
                <dd>
                  <Link to={`/profile/${userRole}/panelmeetingagendas/${pmSeqNum}`}>
                    {panelDate}
                  </Link>
                </dd>
                :
                <dd>{panelDate}</dd>
            }
          </div>
          <div className="employee-agenda-row-data-point">
            <FA name="sticky-note-o" />
            <dt>Agenda:</dt>
            {
              (showAgendaItemMaintenance && agendaIDExist) ?
                <Link to={`/profile/${userRole}/createagendaitem/${perdet}/${agendaID}`} className="agenda-edit-button">
                  <dd>{agendaStatus}</dd>
                </Link>
                :
                <dd>{agendaStatus}</dd>
            }
          </div>
        </div>
        <div className="button-container">
          {
            showAgendaItemHistory &&
            <div className="view-agenda-item-container">
              <LinkButton className="view-agenda-item-button" toLink={`/profile/${userRole}/agendaitemhistory/${perdet}`}>View History</LinkButton>
            </div>
          }
          {
            !!showCreate &&
            <div className="button-box-container">
              <LinkButton className="button-box" toLink={`/profile/${userRole}/createagendaitem/${perdet}`}>Create Agenda Item</LinkButton>
            </div>
          }
        </div>

      </div>
    </div>
  );
};

EmployeeAgendaSearchRow.propTypes = {
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

EmployeeAgendaSearchRow.defaultProps = {
  isCDO: false,
  result: {},
  showCreate: true,
  viewType: '',
};

export default EmployeeAgendaSearchRow;
